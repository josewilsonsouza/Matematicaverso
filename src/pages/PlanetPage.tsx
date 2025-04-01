
import React from 'react';
import { useParams } from 'react-router-dom';
import PlanetDetail from '@/components/PlanetDetail';
import Stars from '@/components/Stars';

const PlanetPage: React.FC = () => {
  const { planetId } = useParams<{ planetId: string }>();
  
  return (
    <div className="min-h-screen overflow-hidden relative">
      <Stars />
      <PlanetDetail />
    </div>
  );
};

export default PlanetPage;
