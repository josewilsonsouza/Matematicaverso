
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { planets } from '@/data/planets';
import { cn } from '@/lib/utils';
import NavigationHeader from '@/components/NavigationHeader';

const PlanetDetail: React.FC = () => {
  const { planetId } = useParams<{ planetId: string }>();
  const planet = planets.find(p => p.id === planetId);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [planetId]);
  
  if (!planet) {
    return <div className="min-h-screen flex items-center justify-center">Planet not found</div>;
  }
  
  return (
    <div 
      className="min-h-screen w-full pb-20" 
      style={{
        background: `radial-gradient(circle at 50% 30%, ${planet.color}30 0%, transparent 70%), 
                    radial-gradient(circle at 80% 60%, ${planet.color}20 0%, transparent 50%)`
      }}
    >
      <NavigationHeader showBackButton />
      
      <div className="pt-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto animate-fade-in">
        <div className="mb-12 text-center">
          <div className="flex justify-center mb-8">
            <div 
              className="w-32 h-32 rounded-full animate-float"
              style={{ 
                backgroundColor: planet.color,
                boxShadow: `0 0 30px 5px ${planet.color}50`
              }}
            />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {planet.name}
          </h1>
          
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            {planet.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {planet.topics.map((topic, index) => (
            <div 
              key={index}
              className="planet-card p-6"
            >
              <h3 className="text-xl font-bold mb-3">{topic.title}</h3>
              <p className="text-white/70">{topic.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-2xl font-bold mb-6">Key Concepts</h2>
          <div className="glassmorphism rounded-xl p-6">
            <ul className="space-y-4">
              {planet.concepts.map((concept, index) => (
                <li key={index} className="flex items-start">
                  <span 
                    className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                    style={{ backgroundColor: planet.color }}
                  />
                  <span>{concept}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <h2 className="text-2xl font-bold mb-6">Related Connections</h2>
          <div className="flex flex-wrap gap-4">
            {planet.connections.map((connection, index) => {
              const connectedPlanet = planets.find(p => p.id === connection);
              if (!connectedPlanet) return null;
              
              return (
                <Link 
                  key={index}
                  to={`/planet/${connectedPlanet.id}`}
                  className={cn(
                    "px-4 py-2 rounded-full glassmorphism hover:opacity-90 transition-all",
                    "border-2"
                  )}
                  style={{ borderColor: connectedPlanet.color }}
                >
                  {connectedPlanet.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanetDetail;
