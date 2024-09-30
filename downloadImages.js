import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function downloadImage(url, savePath) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    await fs.promises.writeFile(savePath, response.data);
    return true;
  } catch (error) {
    console.error(`Error downloading image from ${url}:`, error.message);
    return false;
  }
}

async function processMarkdownFile(filePath) {
  try {
    let content = await fs.promises.readFile(filePath, 'utf-8');
    
    // 创建 assets 文件夹
    const assetsDir = path.join(path.dirname(filePath), 'assets');
    if (!fs.existsSync(assetsDir)) {
      await fs.promises.mkdir(assetsDir, { recursive: true });
    }

    // 查找所有图片链接
    const imgPattern = /!\[.*?\]\((https?:\/\/.*?)\)/g;
    const matches = content.match(imgPattern) || [];

    for (const match of matches) {
      const imgUrl = match.match(/\((https?:\/\/.*?)\)/)[1];
      const parsedUrl = new URL(imgUrl);
      let imgFilename = path.basename(parsedUrl.pathname);

      // 确保文件名是唯一的
      let imgSavePath = path.join(assetsDir, imgFilename);
      let counter = 1;
      while (fs.existsSync(imgSavePath)) {
        const { name, ext } = path.parse(imgFilename);
        imgFilename = `${name}_${counter}${ext}`;
        imgSavePath = path.join(assetsDir, imgFilename);
        counter++;
      }

      // 下载图片
      if (await downloadImage(imgUrl, imgSavePath)) {
        console.log(`Downloaded: ${imgUrl} -> ${imgSavePath}`);
        // 更新 Markdown 中的图片链接
        const relativePath = path.join('assets', imgFilename);
        content = content.replace(imgUrl, relativePath);
      } else {
        console.log(`Failed to download: ${imgUrl}`);
      }
    }

    // 将更新后的内容写回文件
    await fs.promises.writeFile(filePath, content, 'utf-8');
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error.message);
  }
}

async function processMarkdownFiles(rootDir) {
  const files = await fs.promises.readdir(rootDir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(rootDir, file.name);
    if (file.isDirectory()) {
      await processMarkdownFiles(fullPath);
    } else if (file.name.endsWith('.md')) {
      await processMarkdownFile(fullPath);
    }
  }
}

const rootDirectory = path.join(__dirname, "docs/blogs/web/webpack"); // 替换为您的文档根目录
processMarkdownFiles(rootDirectory).then(() => {
  console.log('Processing completed.');
}).catch(error => {
  console.error('An error occurred:', error);
});