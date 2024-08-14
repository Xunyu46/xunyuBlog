// 帮我写一个函数来获取指定目录下所有文件的文件名，并使用数组返回,按照文件名排序，并且输出到当前文件
const fs = require('fs');
const path = require('path');
function getFilenames(dir) {
  const files = fs.readdirSync(dir);
  return files.map(file => file).sort();
}

console.log(getFilenames('./blogs/web/vue'));