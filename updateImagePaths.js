import fs from 'fs/promises';
import path from 'path';

async function updateImagePaths(directoryPath) {
  try {
    const files = await fs.readdir(directoryPath);

    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const stat = await fs.stat(filePath);

      if (stat.isDirectory()) {
        // 如果是目录，递归处理
        await updateImagePaths(filePath);
      } else if (path.extname(file).toLowerCase() === '.md') {
        // 如果是 Markdown 文件，更新图片路径
        let content = await fs.readFile(filePath, 'utf-8');
        const updatedContent = content.replace(/!\[.*?\]\(img(\\|\/)/g, '![](assets$1');

        if (content !== updatedContent) {
          await fs.writeFile(filePath, updatedContent, 'utf-8');
          console.log(`Updated: ${filePath}`);
        }
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// 使用示例
const directoryPath = './docs/blogs/interview/algorithm'; // 请替换为您的文档根目录路径
updateImagePaths(directoryPath);