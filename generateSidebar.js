import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateSidebar(dirPath) {
  const files = fs.readdirSync(dirPath);
  const mdFiles = files.filter(file => path.extname(file).toLowerCase() === '.md');
  
  const sidebarItems = mdFiles.map(file => {
    const filePath = path.join(dirPath, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const titleMatch = content.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : path.basename(file, '.md');
    
    return {
      text: title,
      link: `/blogs/interview/algorithm/${file}`,
      fileName: file
    };
  });

  // 按文件名中的数字排序
  sidebarItems.sort((a, b) => {
    const numA = parseInt(a.fileName.match(/^\d+/)?.[0] || '0');
    const numB = parseInt(b.fileName.match(/^\d+/)?.[0] || '0');
    return numA - numB;
  });

  return [
    {
      text: '前端算法与数据结构面试',
      items: sidebarItems.map(({ text, link }) => ({ text, link })),
    },
  ];
}

const algorithmDir = path.join(__dirname, 'docs', 'blogs', 'interview', 'algorithm');
const sidebarConfig = generateSidebar(algorithmDir);

console.log(JSON.stringify(sidebarConfig, null, 2));

// 将生成的配置追加到现有的sidebar文件
const configPath = path.join(__dirname, 'docs', '.vitepress', 'configs', 'sidebar.ts');
const newContent = `
// 算法与数据结构面试侧边栏
export const algorithmSidebar = ${JSON.stringify(sidebarConfig, null, 2)};
`;

fs.appendFileSync(configPath, newContent, 'utf-8');
console.log('侧边栏配置已追加到文件');