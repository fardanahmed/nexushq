import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const inputPath = path.join(
  process.cwd(),
  '../public/assets/openart-image_auEOgWHu_1767055539088_raw.png'
);
const outputPath = path.join(
  process.cwd(),
  '../public/assets/hero-background.webp'
);

async function compressImage() {
  try {
    console.log('Starting image compression...');
    console.log(`Input: ${inputPath}`);

    const info = await sharp(inputPath)
      .resize(1920, 1080, {
        fit: 'cover',
        position: 'center',
      })
      .webp({
        quality: 85,
        effort: 6,
      })
      .toFile(outputPath);

    console.log(`✅ Compressed successfully!`);
    console.log(`Output: ${outputPath}`);
    console.log(
      `Original size: ${fs.statSync(inputPath).size / 1024 / 1024} MB`
    );
    console.log(`Compressed size: ${info.size / 1024 / 1024} MB`);
    console.log(`Dimensions: ${info.width}x${info.height}`);
  } catch (error) {
    console.error('❌ Error compressing image:', error);
  }
}

compressImage();
