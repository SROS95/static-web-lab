const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const dir = path.join(__dirname, "assets", "img", "cookies");
const SIZE = 1200;
const QUALITY = 80;

(async () => {
  const files = fs.readdirSync(dir).filter(f => /\.webp$/i.test(f));
  for (const file of files) {
    const p = path.join(dir, file);
    const tmp = path.join(dir, file.replace(/\.webp$/i, ".tmp.webp"));

    await sharp(p)
      .resize(SIZE, SIZE, { fit: "cover" })
      .webp({ quality: QUALITY })
      .toFile(tmp);

    fs.renameSync(tmp, p);
    console.log("🪶 Optimizado:", file);
  }
})();
