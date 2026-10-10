import React, { useEffect, useRef } from 'react';

export default function AIMotionBackground({ density = 60, speed = 0.6, isLightMode = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Glowing AI nodes
    const particles = Array.from({ length: density }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      radius: Math.random() * 2 + 1,
      color: isLightMode 
        ? (Math.random() > 0.5 ? 'rgba(99, 102, 241, ' : 'rgba(139, 92, 246, ')
        : (Math.random() > 0.5 ? 'rgba(168, 85, 247, ' : 'rgba(99, 102, 241, '),
      alpha: isLightMode ? Math.random() * 0.4 + 0.3 : Math.random() * 0.5 + 0.2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p1.color}${p1.alpha})`;
        ctx.shadowColor = isLightMode ? 'rgba(99, 102, 241, 0.4)' : 'rgba(168, 85, 247, 0.6)';
        ctx.shadowBlur = 10;
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (1 - dist / 120) * (isLightMode ? 0.15 : 0.2);
            ctx.strokeStyle = isLightMode ? `rgba(99, 102, 241, ${lineAlpha})` : `rgba(168, 85, 247, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density, speed, isLightMode]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-colors duration-500">
      
      {/* Base Layer */}
      <div className={`absolute inset-0 z-0 transition-colors duration-500 ${isLightMode ? 'bg-[#f8fafc]' : 'bg-[#060814]'}`}></div>

      {/* Vibrant Ambient Glowing Orbs */}
      <div className={`absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full blur-[140px] animate-pulse-slow transition-colors duration-500 ${
        isLightMode ? 'bg-gradient-to-br from-indigo-400/25 via-violet-300/20 to-transparent' : 'bg-gradient-to-br from-violet-600/30 via-indigo-600/20 to-transparent'
      }`}></div>
      <div className={`absolute top-1/4 -right-40 w-[650px] h-[650px] rounded-full blur-[140px] animate-float transition-colors duration-500 ${
        isLightMode ? 'bg-gradient-to-bl from-cyan-400/20 via-indigo-300/15 to-transparent' : 'bg-gradient-to-bl from-cyan-500/20 via-violet-600/15 to-transparent'
      }`}></div>
      <div className={`absolute -bottom-40 left-1/3 w-[750px] h-[750px] rounded-full blur-[150px] transition-colors duration-500 ${
        isLightMode ? 'bg-gradient-to-tr from-purple-300/20 via-indigo-200/15 to-transparent' : 'bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-transparent'
      }`}></div>

      {/* Cyber Grid Lines */}
      <div className={`absolute inset-0 bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_70%,transparent_100%)] transition-opacity duration-500 ${
        isLightMode 
          ? 'bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] opacity-60' 
          : 'bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] opacity-70'
      }`}></div>

      {/* Canvas Neural Network Nodes */}
      <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full z-0 transition-opacity duration-500 ${isLightMode ? 'opacity-80' : 'opacity-70'}`} />

      {/* Ambient Vignette */}
      <div className={`absolute inset-0 pointer-events-none z-0 transition-colors duration-500 ${
        isLightMode 
          ? 'bg-gradient-to-b from-[#f8fafc]/60 via-transparent to-[#f8fafc]' 
          : 'bg-gradient-to-b from-[#060814]/80 via-transparent to-[#060814]'
      }`}></div>

    </div>
  );
}
