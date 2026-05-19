import sharp from "sharp";
import { readdirSync, unlinkSync } from "fs";
import { join, extname, basename } from "path";

const assetsDir = new URL("../src/assets", import.meta.url).pathname;

const images = readdirSync(assetsDir).filter((f) =>
  [".jpg", ".jpeg", ".png"].includes(extname(f).toLowerCase())
);

for (const file of images) {
  const inputPath = join(assetsDir, file);
  const outputName = basename(file, extname(file)) + ".webp";
  const outputPath = join(assetsDir, outputName);

  const info = await sharp(inputPath)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(outputPath);

  const inputMB = (await import("fs")).statSync(inputPath).size / 1024 / 1024;
  const outputKB = info.size / 1024;

  console.log(`${file} → ${outputName}: ${inputMB.toFixed(1)}MB → ${outputKB.toFixed(0)}KB`);
}

console.log("\nListo. Puedes borrar los .jpg originales si quieres.");
