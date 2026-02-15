// convert-to-webp.js  (CommonJS, funciona sin líos)
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const inputDir = path.join(__dirname, "assets", "img", "original");
const outputDir = path.join(__dirname, "assets", "img", "cookies");

// Ajustes recomendados
const SIZE = 1200;     // 1200x1200 para cookies (suficiente y ligero)
const QUALITY = 80;    // 75–85 suele ser el punto dulce

if (!fs.existsSync(inputDir)) {
  console.error("No existe la carpeta de entrada:", inputDir);
  process.exit(1);
}
fs.mkdirSync(outputDir, { recursive: true });

(async () => {
  const files = fs.readdirSync(inputDir).filter(f => /\.(jpe?g|png)$/i.test(f));
  if (!files.length) {
    console.log("No hay JPG/PNG en:", inputDir);
    return;
  }

  for (const file of files) {
    const inPath = path.join(inputDir, file);
    const base = file.replace(/\.(jpe?g|png)$/i, "");
    const outPath = path.join(outputDir, `${base}.webp`);

    await sharp(inPath)
  .rotate() // respeta orientación EXIF
  .resize({ width: 1600, withoutEnlargement: true })
  .webp({ quality: 82 })
  .toFile(outPath);

    console.log("✅", file, "->", `${base}.webp`);
  }
})();
