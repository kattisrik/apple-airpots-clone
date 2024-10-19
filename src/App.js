import React, { useEffect, useRef } from 'react';
import './app.css';
const App = () => {
  const canvasRef = useRef(null);
  const totalImages = 64;
  const images = useRef([]);
  const loadedImages = useRef(0);
  const currentFrameIndex = useRef(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.backgroundColor = 'transparent';

    for (let i = 0; i < totalImages; i++) {
      const img = new Image();
      img.onload = () => {
        loadedImages.current++;
        if (loadedImages.current === totalImages) {
          addEventListeners();
          render();
        }
      };
      img.src = `https://www.apple.com/105/media/us/airpods-pro/2022/d2deeb8e-83eb-48ea-9721-f567cf0fffa8/anim/hero/medium/${String(i).padStart(4, '0')}.png`;
      images.current.push(img);
    }
    
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = scrollTop / maxScrollTop;
      const frameIndex = Math.min(totalImages - 1, Math.floor(scrollFraction * totalImages));
      currentFrameIndex.current = frameIndex;
      render();
      handleHeadingAnimationBasedOnScroll();
    };

    const handleHeadingAnimationBasedOnScroll = () => {
      const heading = document.querySelector('h1');
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const opacity = Math.max(0, 1 - (scrollTop / (2 * viewportHeight)));
      heading.style.opacity = opacity;
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const img = images.current[currentFrameIndex.current];
      if (!img) return;

      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      let drawWidth, drawHeight, offsetX = 0, offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawWidth = canvas.width;
        drawHeight = drawWidth / imgRatio;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawHeight = canvas.height;
        drawWidth = drawHeight * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
      }

      ctx.save();
      if (totalImages - currentFrameIndex.current < 10) {
        ctx.globalAlpha = (totalImages - currentFrameIndex.current) / 10;
      }
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      ctx.restore();
    };

    const addEventListeners = () => {
      window.addEventListener('scroll', handleScroll);
    };

    window.onload = () => {
      addEventListeners();
    };

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="main-body-container">
      <h1 className='main-title'>Airpods Pro</h1>
      <canvas ref={canvasRef}></canvas>
      <div className="landing_container"></div>
    </div>
  );
};

export default App;
