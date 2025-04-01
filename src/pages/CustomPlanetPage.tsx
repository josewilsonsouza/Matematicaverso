
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Stars from '@/components/Stars';
import NavigationHeader from '@/components/NavigationHeader';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Globe } from 'lucide-react';

const CustomPlanetPage: React.FC = () => {
  const { tagName, systemName, planetId } = useParams<{ 
    tagName: string; 
    systemName: string; 
    planetId: string 
  }>();
  const navigate = useNavigate();
  
  // For a real app, you would fetch the planet data from a database or state management
  // This is just a placeholder to demonstrate the UI
  const [planetData, setPlanetData] = useState({
    name: 'Carregando...',
    description: 'Carregando descrição...',
    content: 'O conteúdo será mostrado aqui...'
  });
  
  useEffect(() => {
    // Simulate loading planet data
    // In a real app, you would fetch from your storage
    setTimeout(() => {
      setPlanetData({
        name: `Planeta ${planetId?.substring(0, 5)}`,
        description: `Um planeta do sistema ${systemName}`,
        content: `Este é um planeta personalizado da tag ${tagName}, dentro do sistema ${systemName}.
        Você pode adicionar qualquer conteúdo específico para este planeta aqui.`
      });
    }, 500);
    
    document.title = `${planetData.name} | ${tagName} - ${systemName}`;
  }, [tagName, systemName, planetId]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-space-deep text-white relative">
      <Stars />
      <NavigationHeader />
      
      <div className="pt-20 pb-10 px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            size="sm"
            className="mb-4 text-white/80 hover:text-white"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-1 h-4 w-4" /> Voltar
          </Button>
          
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-full p-1">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <div>
              <div className="text-sm text-white/60">
                {tagName} / {systemName}
              </div>
              <h1 className="text-2xl font-bold text-white">{planetData.name}</h1>
            </div>
          </div>
          
          <Card className="bg-space-deep border border-purple-500/30 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">{planetData.name}</CardTitle>
              <CardDescription className="text-white/70">{planetData.description}</CardDescription>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <div className="whitespace-pre-line">
                {planetData.content}
              </div>
              
              <div className="mt-6 p-4 bg-white/5 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Anotações</h3>
                <p className="text-sm text-white/70">
                  Aqui você pode adicionar suas anotações sobre este tema.
                </p>
                {/* In a real app, you would add a text editor or note-taking component here */}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomPlanetPage;
