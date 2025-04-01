
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { planets, intersections } from '@/data/planets';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const PlanetSystem: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handlePlanetClick = (planetId: string) => {
    setSelectedPlanet(planetId);
    
    // Add zoom effect before navigation
    setTimeout(() => {
      navigate(`/planet/${planetId}`);
      setSelectedPlanet(null);
    }, 800);
  };
  
  const handleIntersectionClick = (id: string) => {
    navigate(`/intersection/${id}`);
  };

  // Predefinir posições personalizadas para os planetas, em vez de usar órbitas circulares
  const planetPositions = {
    complex: { x: -400, y: -180 },
    prime: { x: 0, y: 200 },
    topology: { x: 400, y: -150 },
    analysis: { x: 150, y: -300 },
    algebra: { x: -250, y: 150 },
    geometry: { x: 300, y: 100 },
  };
  
  return (
    <TooltipProvider>
      <div className="relative w-full h-full overflow-hidden">
        <div 
          ref={containerRef}
          className="system-container bg-space-deep"
          style={{ 
            transform: 'scale(0.75)',
            cursor: 'default'
          }}
        >
          {/* Axiom sun */}
          <div className="axiom-sun animate-pulse">
            <span className="absolute inset-0 flex items-center justify-center text-space-dark font-bold text-sm">
              Axiomas ✨
            </span>
          </div>
          
          {/* Orbit paths */}
          {planets.map((planet) => (
            <div 
              key={`orbit-${planet.id}`}
              className="absolute rounded-full border border-white/10"
              style={{
                width: `${Math.abs(planetPositions[planet.id as keyof typeof planetPositions].x) * 2 + 100}px`,
                height: `${Math.abs(planetPositions[planet.id as keyof typeof planetPositions].y) * 2 + 100}px`,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                transition: 'opacity 0.3s ease',
                opacity: hoveredPlanet === planet.id ? 0.8 : 0.3
              }}
            />
          ))}
          
          {/* Planets with custom positions */}
          {planets.map((planet) => (
            <Tooltip key={`planet-${planet.id}`}>
              <TooltipTrigger asChild>
                <div
                  className={`planet-static ${selectedPlanet === planet.id ? 'animate-fade-out' : ''}`}
                  style={{
                    width: `${planet.size}px`,
                    height: `${planet.size}px`,
                    backgroundColor: planet.color,
                    boxShadow: hoveredPlanet === planet.id 
                      ? `0 0 30px 10px ${planet.color}80`
                      : `0 0 20px 2px ${planet.color}50`,
                    left: `calc(50% + ${planetPositions[planet.id as keyof typeof planetPositions].x}px)`,
                    top: `calc(50% + ${planetPositions[planet.id as keyof typeof planetPositions].y}px)`,
                    backgroundImage: planet.id === 'topology' ? 
                      "url('public/lovable-uploads/13e17216-54f3-4974-8b1a-84a272dc5a69.png')" : 
                      'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
                    zIndex: hoveredPlanet === planet.id ? 20 : 10,
                  }}
                  onClick={() => handlePlanetClick(planet.id)}
                  onMouseEnter={() => setHoveredPlanet(planet.id)}
                  onMouseLeave={() => setHoveredPlanet(null)}
                >
                  {planet.id === 'complex' && 
                    <div className="planet-texture" style={{ 
                      background: 'linear-gradient(135deg, #ff7eb3, #ff758c)',
                      borderRadius: '50%',
                      position: 'absolute',
                      inset: 0,
                      opacity: 0.7
                    }} />
                  }
                  {planet.id === 'prime' && 
                    <span className="absolute inset-0 flex items-center justify-center text-space-dark font-bold">
                      🔢
                    </span>
                  }
                </div>
              </TooltipTrigger>
              <TooltipContent 
                side="top" 
                className="max-w-[220px] text-center font-medium p-3"
                style={{
                  backgroundColor: `${planet.color}99`,
                  borderColor: planet.color,
                }}
              >
                <div className="text-white font-bold mb-1">{planet.name}</div>
                <div className="text-sm text-white/90">{planet.funnyDescription}</div>
              </TooltipContent>
            </Tooltip>
          ))}
          
          {/* Intersection points */}
          {intersections.map((intersection) => (
            <Tooltip key={`intersection-${intersection.id}`}>
              <TooltipTrigger asChild>
                <div
                  className="intersection-point"
                  style={{
                    left: `calc(50% + ${intersection.position.x}px)`,
                    top: `calc(50% + ${intersection.position.y}px)`,
                  }}
                  onClick={() => handleIntersectionClick(intersection.id)}
                >
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[220px] text-center p-3 bg-yellow-500/70 border-yellow-400">
                <div className="text-space-dark font-bold mb-1">💫 {intersection.title}</div>
                <div className="text-sm text-space-dark/90">{intersection.shortDescription}</div>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default PlanetSystem;
