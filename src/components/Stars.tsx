
import React, { useEffect, useState } from 'react';

interface Star {
  id: number;
  top: string;
  left: string;
  size: string;
  opacity: string;
  animationDelay: string;
}

const Stars: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);
  
  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      const count = Math.floor(window.innerWidth * window.innerHeight / 8000);
      
      for (let i = 0; i < count; i++) {
        newStars.push({
          id: i,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          size: `${0.7 + Math.random() * 2}px`,
          opacity: `${0.2 + Math.random() * 0.8}`,
          animationDelay: `${Math.random() * 5}s`
        });
      }
      
      setStars(newStars);
    };
    
    generateStars();
    
    const handleResize = () => {
      generateStars();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            animation: `pulse 3s ease-in-out infinite`,
            animationDelay: star.animationDelay
          }}
        />
      ))}
    </div>
  );
};

export default Stars;
