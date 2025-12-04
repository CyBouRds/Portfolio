const fs = require('fs');
const sharp = require('sharp');

// Generate responsive image sizes for profile photo
async function generateResponsiveImages() {
  const sizes = [240, 360, 480, 600];
  
  for (const size of sizes) {
    try {
      await sharp('./profile-photo.png')
        .resize(size, size, { fit: 'cover' })
        .toFile(`profile-photo-${size}w.png`);
      console.log(`✓ profile-photo-${size}w.png`);
    } catch (err) {
      console.error(`Error creating profile-photo-${size}w.png:`, err.message);
    }
  }
}

// Generate responsive case study images
async function generateCaseStudyImages() {
  const sizes = [320, 480, 640];
  
  const files = [
    { src: './case-study-forensics.png', base: 'case-study-forensics' },
    { src: './osint-framework.png', base: 'osint-framework' },
    { src: './3d-logo-thumbnail.png', base: '3d-logo-thumbnail' }
  ];
  
  for (const file of files) {
    if (!fs.existsSync(file.src)) {
      console.log(`⚠️ ${file.src} not found, skipping`);
      continue;
    }
    
    for (const size of sizes) {
      try {
        await sharp(file.src)
          .resize(size, Math.floor(size * 0.625), { fit: 'cover' })
          .toFile(`${file.base}-${size}w.png`);
        console.log(`✓ ${file.base}-${size}w.png`);
      } catch (err) {
        console.error(`Error creating ${file.base}-${size}w.png:`, err.message);
      }
    }
  }
}

(async () => {
  console.log('📸 Generating responsive images...');
  await generateResponsiveImages();
  await generateCaseStudyImages();
  console.log('✅ Done!');
})();
