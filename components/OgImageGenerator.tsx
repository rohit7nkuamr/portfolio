import React from 'react';
import { useEffect, useRef } from 'react';
import profileData from '../content/profile.json';

// This component is meant to be used as a template to generate the OG image
// You would take a screenshot of this rendered component and save it as og-image.png
export default function OgImageGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set dimensions for OG image (1200x630 is recommended)
    canvas.width = 1200;
    canvas.height = 630;
    
    // Background - dark gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 630);
    gradient.addColorStop(0, '#0a0a0a');
    gradient.addColorStop(0.5, '#1a1a1a');
    gradient.addColorStop(1, '#0a0a0a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 630);
    
    // Add grid lines for gaming effect
    ctx.strokeStyle = '#2a2a2a';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i < 630; i += 30) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(1200, i);
      ctx.stroke();
    }
    
    // Vertical grid lines
    for (let i = 0; i < 1200; i += 30) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 630);
      ctx.stroke();
    }
    
    // Add accent color glow effect
    ctx.shadowColor = '#0ff';
    ctx.shadowBlur = 30;
    
    // Draw name
    ctx.font = 'bold 72px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(profileData.name, 600, 250);
    
    // Draw title
    ctx.font = '36px Arial';
    ctx.fillStyle = '#0ff';
    ctx.fillText('Game Developer & Full-Stack Engineer', 600, 320);
    
    // Draw tagline
    ctx.font = '24px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Interactive Portfolio', 600, 380);
    
    // Draw decorative gaming elements
    drawGameDecoration(ctx);
    
    // Helper to download the image
    // In real usage, you would take a screenshot of this component
    const downloadBtn = document.createElement('button');
    downloadBtn.textContent = 'Download OG Image';
    downloadBtn.style.position = 'absolute';
    downloadBtn.style.top = '650px';
    downloadBtn.style.left = '50%';
    downloadBtn.style.transform = 'translateX(-50%)';
    downloadBtn.onclick = () => {
      const link = document.createElement('a');
      link.download = 'og-image.png';
      link.href = canvas.toDataURL();
      link.click();
    };
    document.body.appendChild(downloadBtn);
  }, []);
  
  function drawGameDecoration(ctx: CanvasRenderingContext2D) {
    // Draw controller icon outline
    ctx.strokeStyle = '#0ff';
    ctx.lineWidth = 3;
    
    // Left border decoration
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(150, 50);
    ctx.lineTo(150, 150);
    ctx.stroke();
    
    // Right border decoration
    ctx.beginPath();
    ctx.moveTo(1150, 50);
    ctx.lineTo(1050, 50);
    ctx.lineTo(1050, 150);
    ctx.stroke();
    
    // Bottom left decoration
    ctx.beginPath();
    ctx.moveTo(50, 580);
    ctx.lineTo(150, 580);
    ctx.lineTo(150, 480);
    ctx.stroke();
    
    // Bottom right decoration
    ctx.beginPath();
    ctx.moveTo(1150, 580);
    ctx.lineTo(1050, 580);
    ctx.lineTo(1050, 480);
    ctx.stroke();
  }
  
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <canvas 
        ref={canvasRef} 
        style={{ 
          width: '1200px', 
          height: '630px',
          maxWidth: '100%',
          border: '1px solid #333'
        }}
      />
    </div>
  );
}
