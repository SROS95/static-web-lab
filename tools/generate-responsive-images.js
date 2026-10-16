const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, '..', 'assets', 'img', 'cookies');
const widths = [160, 320, 640];
const quality = 82;

const isBaseCookie = (name) =>
  /\.webp$/i.test(name) &&
  !/-\d+\.webp$/i.test(name) &&
  name.toLowerCase() !== 'hero.webp';

(async () => {
  const files = fs.readdirSync(inputDir).filter(isBaseCookie);

  for (const file of files) {
    const source = path.join(inputDir, file);
    const stem = file.replace(/\.webp$/i, '');

    for (const width of widths) {
      const output = path.join(inputDir, `${stem}-${width}.webp`);
      await sharp(source)
        .resize({ width, height: width, fit: 'cover', withoutEnlargement: true })
        .webp({ quality })
        .toFile(output);
      console.log(`Generated ${path.basename(output)}`);
    }
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
