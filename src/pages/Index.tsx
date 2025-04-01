
import React, { useEffect, useState } from 'react';
import PlanetSystem from '@/components/PlanetSystem';
import Stars from '@/components/Stars';
import NavigationHeader from '@/components/NavigationHeader';
import { useNavigate } from 'react-router-dom';
import TagSystem from '@/components/TagSystem';

interface RecentPlanet {
  id: string;
  name: string;
  tagName: string;
  systemName: string;
  visitedAt: number;
}

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [recentPlanets, setRecentPlanets] = useState<RecentPlanet[]>([]);
  
  useEffect(() => {
    document.title = "Matematic∂verso Explorer";
    
    // Load recently visited planets from localStorage
    const savedRecentPlanets = localStorage.getItem('recentPlanets');
    if (savedRecentPlanets) {
      try {
        const parsedPlanets = JSON.parse(savedRecentPlanets);
        setRecentPlanets(parsedPlanets);
      } catch (error) {
        console.error('Error parsing recent planets:', error);
      }
    }
  }, []);

  const handleTagClick = (tagName: string) => {
    if (tagName === 'Matematic∂verso') {
      // Navigate to the Explore page when Matematic∂verso is clicked
      navigate('/explore');
      return;
    }
    
    // For other tags, toggle their active state as before
    setActiveTag(tagName === activeTag ? null : tagName);
  };

  const handlePlanetClick = (tagName: string, systemName: string, planetId: string, planetName: string) => {
    // Navigate to the planet page
    navigate(`/custom-planet/${tagName}/${systemName}/${planetId}`);
    
    // Update recently visited planets
    const newPlanet: RecentPlanet = {
      id: planetId,
      name: planetName,
      tagName,
      systemName,
      visitedAt: Date.now()
    };
    
    const updatedRecentPlanets = [
      newPlanet,
      ...recentPlanets.filter(planet => 
        !(planet.id === planetId && planet.tagName === tagName && planet.systemName === systemName)
      ).slice(0, 4) // Keep only the 5 most recent planets (including the new one)
    ];
    
    setRecentPlanets(updatedRecentPlanets);
    localStorage.setItem('recentPlanets', JSON.stringify(updatedRecentPlanets));
  };

  return (
    <div className="min-h-screen overflow-hidden relative bg-space-deep">
      <Stars />
      <NavigationHeader />
      
      <div className="pt-16 pb-10 px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="space-text-gradient">Matematic∂verso Explorer</span> 🚀
          </h1>
          
          {/* Tag System with Hover Cards */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <TagSystem 
              activeTag={activeTag} 
              onTagClick={handleTagClick}
              onPlanetClick={handlePlanetClick}
            />
          </div>
          
          {/* Recently visited planets */}
          {recentPlanets.length > 0 && (
            <div className="mt-8 mb-6">
              <h2 className="text-xl text-white font-semibold mb-3">Planetas Visitados Recentemente</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 max-w-3xl mx-auto">
                {recentPlanets.map((planet) => (
                  <div 
                    key={`${planet.tagName}-${planet.systemName}-${planet.id}`}
                    className="bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
                    onClick={() => navigate(`/custom-planet/${planet.tagName}/${planet.systemName}/${planet.id}`)}
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full border-2 border-space-deep"></div>
                      </div>
                      <span className="text-white text-sm font-medium">{planet.name}</span>
                      <span className="text-white/60 text-xs">{planet.systemName}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Show planet system for any active tag */}
          {activeTag && (
            <div className="relative w-full h-[50vh] mb-4">
              <PlanetSystem />
            </div>
          )}
          
          {/* Instructions text shown only when a tag is active */}
          {activeTag && (
            <div className="text-white/70 text-sm animate-fade-in mb-10">
              Clique nos planetas para explorar os mundos matemáticos
            </div>
          )}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-space-dark to-transparent z-10" />
    </div>
  );
};

export default Index;
