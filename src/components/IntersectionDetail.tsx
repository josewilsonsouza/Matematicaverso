
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { intersections, planets } from '@/data/planets';
import { cn } from '@/lib/utils';
import NavigationHeader from '@/components/NavigationHeader';

const IntersectionDetail: React.FC = () => {
  const { intersectionId } = useParams<{ intersectionId: string }>();
  const intersection = intersections.find(i => i.id === intersectionId);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [intersectionId]);
  
  if (!intersection) {
    return <div className="min-h-screen flex items-center justify-center">Interseção não encontrada</div>;
  }
  
  // Get the connected planets
  const connectedPlanets = planets.filter(p => intersection.planetIds.includes(p.id));
  
  return (
    <div 
      className="min-h-screen w-full pb-20" 
      style={{
        background: connectedPlanets.length > 0 ? 
          `radial-gradient(circle at 50% 30%, ${connectedPlanets[0].color}30 0%, transparent 70%),
           ${connectedPlanets.length > 1 ? `radial-gradient(circle at 80% 60%, ${connectedPlanets[1].color}20 0%, transparent 50%)` : ''}` 
          : ''
      }}
    >
      <NavigationHeader showBackButton />
      
      <div className="pt-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto animate-fade-in">
        <div className="mb-12 text-center">
          <div className="flex justify-center mb-8">
            <div 
              className="w-32 h-32 rounded-full animate-float flex items-center justify-center"
              style={{ 
                background: `linear-gradient(135deg, ${connectedPlanets.map(p => p.color).join(', ')})`,
                boxShadow: `0 0 30px 5px #FFAA0050`
              }}
            >
              <div className="text-3xl font-bold text-white">∩</div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {intersection.title}
          </h1>
          
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            {intersection.description}
          </p>
        </div>
        
        <div className="glassmorphism rounded-xl p-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-bold mb-4">Conexão Matemática</h2>
          <p className="text-white/80 mb-6">
            {intersection.connection}
          </p>
          
          <div className="flex flex-col items-center my-8">
            <div className="text-xl font-mono p-4 bg-black/30 rounded-lg overflow-x-auto w-full">
              {intersection.formula}
            </div>
          </div>
        </div>
        
        <div className="mt-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-2xl font-bold mb-6">Planetas Conectados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {connectedPlanets.map((planet) => (
              <Link
                key={planet.id}
                to={`/planet/${planet.id}`}
                className="planet-card p-6 flex items-center hover:translate-y-[-4px] transition-transform"
              >
                <div 
                  className="w-12 h-12 rounded-full mr-4 flex-shrink-0" 
                  style={{ 
                    backgroundColor: planet.color,
                    boxShadow: `0 0 15px 2px ${planet.color}50`
                  }}
                />
                <div>
                  <h3 className="text-lg font-bold">{planet.name}</h3>
                  <p className="text-white/70 text-sm line-clamp-1">{planet.description.substring(0, 80)}...</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntersectionDetail;
