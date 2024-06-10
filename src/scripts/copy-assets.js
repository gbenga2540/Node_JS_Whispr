// eslint-disable-next-line no-undef
const fs = require('fs');
// eslint-disable-next-line no-undef
const path = require('path');

try {
  const sourceDirectory = './src/view/';
  const destinationDirectory = './dist/view/';

  const copyRecursiveSync = (source, target) => {
    const files = fs.readdirSync(source);

    if (!fs.existsSync(target)) {
      fs.mkdirSync(target, { recursive: true });
    }

    files.forEach(file => {
      const sourceFile = path.join(source, file);
      const targetFile = path.join(target, file);

      if (fs.lstatSync(sourceFile).isDirectory()) {
        copyRecursiveSync(sourceFile, targetFile);
      } else {
        fs.copyFileSync(sourceFile, targetFile);
      }
    });
  };

  copyRecursiveSync(sourceDirectory, destinationDirectory);

  console.log('\x1b[32m==================================\x1b[0m');
  console.log('\x1b[32mnon-TS files copied successfully!!\x1b[0m');
  console.log('\x1b[32m==================================\x1b[0m');
} catch (error) {
  console.log('\x1b[31m==========================\x1b[0m');
  console.log('\x1b[31mnon-TS files copy failed!!\x1b[0m');
  console.log(error);
  console.log('\x1b[31m==========================\x1b[0m');
}
