
import React from 'react';
import { Link } from 'react-router-dom';
import Stars from '@/components/Stars';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center overflow-hidden relative">
      <Stars />
      
      <div className="text-center px-4 animate-fade-in">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-purple-600 opacity-70 animate-pulse"></div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-4 space-text-gradient">404</h1>
        <p className="text-xl text-white/80 mb-8">This mathematical realm doesn't exist... yet</p>
        
        <Link 
          to="/"
          className="px-8 py-3 rounded-full glassmorphism hover:bg-white/20 transition-colors text-white font-medium inline-block"
        >
          Return to Universe
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
