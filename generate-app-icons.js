const sharp = require('sharp');
const path = require('path');

async function generateAppIcons() {
  const profilePath = path.join(__dirname, 'profile-photo.png');

  try {
    // Generate regular icons (192x192 and 512x512)
    await sharp(profilePath)
      .resize(192, 192, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toFile(path.join(__dirname, 'icon-192.png'));
    console.log('✓ Generated icon-192.png');

    await sharp(profilePath)
      .resize(512, 512, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toFile(path.join(__dirname, 'icon-512.png'));
    console.log('✓ Generated icon-512.png');

    // Generate 96x96 for shortcuts
    await sharp(profilePath)
      .resize(96, 96, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toFile(path.join(__dirname, 'icon-96.png'));
    console.log('✓ Generated icon-96.png');

    // Generate maskable icons (with safe area padding for adaptive icons on Android)
    const maskablePath192 = path.join(__dirname, 'icon-192-maskable.png');
    const maskablePath512 = path.join(__dirname, 'icon-512-maskable.png');

    // Create 192x192 maskable with padding
    const profileBuffer192 = await sharp(profilePath)
      .resize(154, 154, { fit: 'cover', position: 'center' })
      .toBuffer();

    await sharp({
      create: {
        width: 192,
        height: 192,
        channels: 4,
        background: { r: 79, g: 124, b: 255, alpha: 1 }
      }
    })
      .composite([{ input: profileBuffer192, top: 19, left: 19 }])
      .png()
      .toFile(maskablePath192);
    console.log('✓ Generated icon-192-maskable.png');

    // Create 512x512 maskable with padding
    const profileBuffer512 = await sharp(profilePath)
      .resize(410, 410, { fit: 'cover', position: 'center' })
      .toBuffer();

    await sharp({
      create: {
        width: 512,
        height: 512,
        channels: 4,
        background: { r: 79, g: 124, b: 255, alpha: 1 }
      }
    })
      .composite([{ input: profileBuffer512, top: 51, left: 51 }])
      .png()
      .toFile(maskablePath512);
    console.log('✓ Generated icon-512-maskable.png');

    console.log('\n✅ All app icons generated successfully!');
  } catch (err) {
    console.error('Error generating icons:', err);
    process.exit(1);
  }
}

generateAppIcons();
