const sharp = require('sharp');
const { createCanvas } = require('canvas');

// Create canvas with tech theme
const canvas = createCanvas(400, 240);
const ctx = canvas.getContext('2d');

// Dark background with gradient effect
const gradient = ctx.createLinearGradient(0, 0, 400, 240);
gradient.addColorStop(0, '#0a0e1a');
gradient.addColorStop(1, '#1a1f3a');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 400, 240);

// Play button (triangle in center)
ctx.fillStyle = 'rgba(122, 252, 255, 0.9)';
ctx.beginPath();
ctx.moveTo(180, 80);
ctx.lineTo(180, 160);
ctx.lineTo(240, 120);
ctx.closePath();
ctx.fill();

// Title
ctx.fillStyle = '#7afcff';
ctx.font = 'bold 20px Arial';
ctx.fillText('3D Logo Animation', 30, 200);

// Subtitle
ctx.fillStyle = '#c7c7c7';
ctx.font = '12px Arial';
ctx.fillText('Click to play video', 30, 220);

// Convert to buffer and save
const buffer = canvas.toBuffer('image/png');
require('fs').writeFileSync('3d-logo-thumbnail.png', buffer);
console.log('✓ 3d-logo-thumbnail.png created');
