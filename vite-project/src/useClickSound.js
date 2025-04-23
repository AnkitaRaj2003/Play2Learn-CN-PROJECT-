import { useEffect } from 'react';
import clickSound from './click.mp3';

const useClickSound = () => {
  useEffect(() => {
    const audio = new Audio(clickSound);
    audio.preload = 'auto';
    
    const handleClick = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
        audio.currentTime = 0;
        audio.play();
        
        // Handle link navigation
        if (e.target.tagName === 'A' && e.target.href && !e.target.href.startsWith('javascript:')) {
          e.preventDefault();
          setTimeout(() => window.location.href = e.target.href, 200);
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
};

export default useClickSound;