const sharp = require('sharp');
const { createCanvas } = require('canvas');

// Create canvas with dark background
const canvas = createCanvas(400, 240);
const ctx = canvas.getContext('2d');

// Dark background (matching portfolio theme)
ctx.fillStyle = '#0d0f17';
ctx.fillRect(0, 0, 400, 240);

// Title
ctx.fillStyle = '#7afcff';
ctx.font = 'bold 24px Arial';
ctx.fillText('Insider Data Theft', 20, 50);

// Subtitle
ctx.fillStyle = '#c7c7c7';
ctx.font = '14px Arial';
ctx.fillText('Full Investigation & Forensics', 20, 75);

// Bullet points
ctx.font = '12px Arial';
const details = [
  '• Evidence Packet',
  '• Mitigation Checklist',
  '• Hardening Roadmap'
];
let y = 110;
details.forEach(detail => {
  ctx.fillText(detail, 30, y);
  y += 28;
});

// Accent line
ctx.strokeStyle = '#4f7cff';
ctx.lineWidth = 3;
ctx.beginPath();
ctx.moveTo(20, 200);
ctx.lineTo(380, 200);
ctx.stroke();

// Convert to buffer and save
const buffer = canvas.toBuffer('image/jpeg');
require('fs').writeFileSync('case-study-forensics.jpg', buffer);
console.log('✓ case-study-forensics.jpg created');
