const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

async function generateScreenshots() {
  try {
    // Mobile screenshot (540x720)
    const mobileCanvas = createCanvas(540, 720);
    const mobileCtx = mobileCanvas.getContext('2d');

    mobileCtx.fillStyle = '#ffffff';
    mobileCtx.fillRect(0, 0, 540, 720);

    // Gradient background
    const gradMobile = mobileCtx.createLinearGradient(0, 0, 540, 720);
    gradMobile.addColorStop(0, '#4F7CFF');
    gradMobile.addColorStop(1, '#2D5AE8');
    mobileCtx.fillStyle = gradMobile;
    mobileCtx.fillRect(0, 0, 540, 200);

    // Title
    mobileCtx.fillStyle = '#ffffff';
    mobileCtx.font = 'bold 36px Poppins, sans-serif';
    mobileCtx.textAlign = 'center';
    mobileCtx.fillText('Ghait', 270, 70);
    mobileCtx.fillText('Satardekar', 270, 120);

    // Subtitle
    mobileCtx.font = '16px Poppins, sans-serif';
    mobileCtx.fillStyle = 'rgba(255,255,255,0.9)';
    mobileCtx.fillText('Cybersecurity Portfolio', 270, 155);

    // Content area
    mobileCtx.fillStyle = '#ffffff';
    mobileCtx.font = '14px Poppins, sans-serif';
    mobileCtx.fillStyle = '#333333';
    mobileCtx.textAlign = 'left';
    mobileCtx.fillText('• Penetration Testing', 40, 280);
    mobileCtx.fillText('• OSINT Framework', 40, 320);
    mobileCtx.fillText('• Forensic Analysis', 40, 360);
    mobileCtx.fillText('• Security Research', 40, 400);

    const mobileBuffer = mobileCanvas.toBuffer('image/png');
    fs.writeFileSync(path.join(__dirname, 'screenshot-1.png'), mobileBuffer);
    console.log('✓ Generated screenshot-1.png (mobile)');

    // Desktop screenshot (1280x720)
    const desktopCanvas = createCanvas(1280, 720);
    const desktopCtx = desktopCanvas.getContext('2d');

    desktopCtx.fillStyle = '#ffffff';
    desktopCtx.fillRect(0, 0, 1280, 720);

    // Gradient background
    const gradDesktop = desktopCtx.createLinearGradient(0, 0, 1280, 720);
    gradDesktop.addColorStop(0, '#4F7CFF');
    gradDesktop.addColorStop(1, '#2D5AE8');
    desktopCtx.fillStyle = gradDesktop;
    desktopCtx.fillRect(0, 0, 640, 720);

    // Title
    desktopCtx.fillStyle = '#ffffff';
    desktopCtx.font = 'bold 48px Poppins, sans-serif';
    desktopCtx.textAlign = 'center';
    desktopCtx.fillText('Ghait Satardekar', 320, 200);

    // Subtitle
    desktopCtx.font = '24px Poppins, sans-serif';
    desktopCtx.fillStyle = 'rgba(255,255,255,0.9)';
    desktopCtx.fillText('Cybersecurity Expert', 320, 260);

    // Content area (right side)
    desktopCtx.fillStyle = '#333333';
    desktopCtx.font = '18px Poppins, sans-serif';
    desktopCtx.textAlign = 'left';
    desktopCtx.fillText('Featured Projects:', 720, 100);
    desktopCtx.font = '16px Poppins, sans-serif';
    desktopCtx.fillText('• Penetration Testing Tools', 720, 160);
    desktopCtx.fillText('• OSINT Framework', 720, 210);
    desktopCtx.fillText('• Forensic Analysis', 720, 260);
    desktopCtx.fillText('• Security Research', 720, 310);

    const desktopBuffer = desktopCanvas.toBuffer('image/png');
    fs.writeFileSync(path.join(__dirname, 'screenshot-2.png'), desktopBuffer);
    console.log('✓ Generated screenshot-2.png (desktop)');

    console.log('\n✅ All screenshots generated successfully!');
  } catch (err) {
    console.error('Error generating screenshots:', err);
    process.exit(1);
  }
}

generateScreenshots();
