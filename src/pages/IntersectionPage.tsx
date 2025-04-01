
import React from 'react';
import { useParams } from 'react-router-dom';
import IntersectionDetail from '@/components/IntersectionDetail';
import Stars from '@/components/Stars';

const IntersectionPage: React.FC = () => {
  const { intersectionId } = useParams<{ intersectionId: string }>();
  
  return (
    <div className="min-h-screen overflow-hidden relative">
      <Stars />
      <IntersectionDetail />
    </div>
  );
};

export default IntersectionPage;
