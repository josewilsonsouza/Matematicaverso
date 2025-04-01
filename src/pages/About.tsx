
import React from 'react';
import Stars from '@/components/Stars';
import NavigationHeader from '@/components/NavigationHeader';

const About: React.FC = () => {
  return (
    <div className="min-h-screen overflow-hidden relative">
      <Stars />
      <NavigationHeader />
      
      <div className="pt-28 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center space-text-gradient">
            About MathUniverse
          </h1>
          
          <div className="glassmorphism rounded-xl p-6 mb-10 animate-fade-in">
            <p className="text-white/80 leading-relaxed mb-4">
              MathUniverse Explorer is an interactive platform designed to visualize mathematics as a vast, interconnected universe of concepts and ideas. Our mission is to make abstract mathematical domains more accessible and engaging through intuitive visual exploration.
            </p>
            <p className="text-white/80 leading-relaxed">
              By representing mathematical fields as planets orbiting around central axioms, we highlight both the unique characteristics of each domain and the fascinating connections between them. The intersection points where orbits cross represent profound mathematical results that bridge different areas of mathematics.
            </p>
          </div>
          
          <h2 className="text-2xl font-bold mb-4 animate-slide-up">How to Explore</h2>
          <div className="glassmorphism rounded-xl p-6 mb-10 animate-slide-up">
            <ol className="list-decimal list-inside space-y-4 text-white/80">
              <li>Navigate through the solar system view to see all mathematical domains represented as planets</li>
              <li>Click on any planet to explore its specific mathematical concepts, theorems, and applications</li>
              <li>Discover intersection points between orbits to learn about connections between different mathematical fields</li>
              <li>Follow the related links within each planet to continue your journey through connected mathematical realms</li>
            </ol>
          </div>
          
          <h2 className="text-2xl font-bold mb-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>Our Vision</h2>
          <div className="glassmorphism rounded-xl p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-white/80 leading-relaxed mb-4">
              We believe that mathematics is not a collection of isolated topics but a beautifully interconnected universe of ideas. By visualizing these connections, we hope to inspire curiosity and deeper understanding.
            </p>
            <p className="text-white/80 leading-relaxed">
              MathUniverse Explorer aims to be a valuable resource for students, educators, and anyone curious about the vast landscape of mathematical knowledge. Our goal is to highlight the elegance and unity of mathematics across its diverse domains.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
