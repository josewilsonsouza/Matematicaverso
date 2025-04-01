
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Stars from '@/components/Stars';
import NavigationHeader from '@/components/NavigationHeader';
import { planets, intersections } from '@/data/planets';

// Define mathematical categories
const categories = [
  {
    id: 'algebra',
    name: 'Álgebra',
    subcategories: [
      'Teoria dos Grupos',
      'Álgebra Linear',
      'Álgebra Comutativa',
      'Teoria de Galois',
      'Teoria de Representações'
    ]
  },
  {
    id: 'analysis',
    name: 'Análise',
    subcategories: [
      'Cálculo Diferencial e Integral',
      'Análise Real',
      'Análise Complexa',
      'Equações Diferenciais',
      'Análise Funcional'
    ]
  },
  {
    id: 'geometry',
    name: 'Geometria e Topologia',
    subcategories: [
      'Geometria Euclidiana e Não-Euclidiana',
      'Geometria Algébrica',
      'Topologia Geral',
      'Topologia Algébrica',
      'Geometria Diferencial'
    ]
  },
  {
    id: 'applied',
    name: 'Matemática Aplicada',
    subcategories: [
      'Cálculo Numérico',
      'Otimização',
      'Teoria do Caos',
      'Matemática Financeira',
      'BioMatemática'
    ]
  },
  {
    id: 'probability',
    name: 'Probabilidade e Estatística',
    subcategories: [
      'Teoria da Probabilidade',
      'Processos Estocásticos',
      'Estatística Descritiva e Inferencial',
      'Aprendizado de Máquina'
    ]
  },
  {
    id: 'logic',
    name: 'Lógica e Fundamentos',
    subcategories: [
      'Teoria dos Conjuntos',
      'Lógica Matemática',
      'Teoria dos Modelos',
      'Computabilidade e Complexidade'
    ]
  },
  {
    id: 'number-theory',
    name: 'Teoria dos Números',
    subcategories: [
      'Números Primos e Criptografia',
      'Teoria Analítica dos Números',
      'Geometria Aritmética'
    ]
  },
  {
    id: 'combinatorics',
    name: 'Combinatória',
    subcategories: [
      'Teoria dos Grafos',
      'Combinatória Algébrica',
      'Otimização Combinatória'
    ]
  },
  {
    id: 'math-physics',
    name: 'Física Matemática',
    subcategories: [
      'Mecânica Quântica Matemática',
      'Teoria de Campos',
      'Relatividade Geral Matemática'
    ]
  }
];

const Explore: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'planets' | 'intersections' | 'categories'>('categories');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const filteredPlanets = planets.filter(planet => 
    planet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    planet.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredIntersections = intersections.filter(intersection => 
    intersection.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    intersection.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.subcategories.some(sub => 
      sub.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  
  return (
    <div className="min-h-screen overflow-hidden relative">
      <Stars />
      <NavigationHeader />
      
      <div className="pt-28 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center space-text-gradient">
            Explore o Matematic∂verso
          </h1>
          
          <div className="mb-8">
            <div className="flex items-center p-2 px-4 glassmorphism rounded-full max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Buscar mundos matemáticos..."
                className="w-full bg-transparent border-none outline-none text-white py-2 px-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div className="flex justify-center mb-8">
            <div className="glassmorphism rounded-full p-1 flex">
              <button
                className={`px-6 py-2 rounded-full transition-colors ${activeTab === 'categories' ? 'bg-white/20' : ''}`}
                onClick={() => setActiveTab('categories')}
              >
                Categorias
              </button>
              <button
                className={`px-6 py-2 rounded-full transition-colors ${activeTab === 'planets' ? 'bg-white/20' : ''}`}
                onClick={() => setActiveTab('planets')}
              >
                Planetas
              </button>
              <button
                className={`px-6 py-2 rounded-full transition-colors ${activeTab === 'intersections' ? 'bg-white/20' : ''}`}
                onClick={() => setActiveTab('intersections')}
              >
                Interseções
              </button>
            </div>
          </div>
          
          {activeTab === 'categories' && (
            <div className="animate-fade-in space-y-10">
              {filteredCategories.map((category) => (
                <div key={category.id} className="glassmorphism p-6 rounded-xl">
                  <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {category.subcategories.map((subcategory, index) => (
                      <div 
                        key={index}
                        className="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer flex items-center"
                        onClick={() => setActiveCategory(category.id)}
                      >
                        <div className="w-3 h-3 mr-2 rounded-full bg-gradient-to-br from-blue-400 to-purple-600"></div>
                        <span>{subcategory}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'planets' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {filteredPlanets.map((planet) => (
                <Link 
                  key={planet.id}
                  to={`/planet/${planet.id}`}
                  className="planet-card group"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div 
                        className="w-12 h-12 rounded-full mr-4 group-hover:scale-110 transition-transform"
                        style={{ 
                          backgroundColor: planet.color,
                          boxShadow: `0 0 15px 2px ${planet.color}50`
                        }}
                      />
                      <h3 className="text-xl font-bold">{planet.name}</h3>
                    </div>
                    <p className="text-white/70 line-clamp-3">{planet.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
          
          {activeTab === 'intersections' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
              {filteredIntersections.map((intersection) => {
                const connectedPlanets = intersection.planetIds.map(id => 
                  planets.find(p => p.id === id)
                ).filter(Boolean);
                
                return (
                  <Link 
                    key={intersection.id}
                    to={`/intersection/${intersection.id}`}
                    className="planet-card group"
                  >
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold mb-2">{intersection.title}</h3>
                        <div className="flex items-center space-x-2 mb-3">
                          {connectedPlanets.map((planet, index) => (
                            <div 
                              key={index}
                              className="w-6 h-6 rounded-full"
                              style={{ 
                                backgroundColor: planet?.color,
                                boxShadow: `0 0 8px 1px ${planet?.color}50`
                              }}
                            />
                          ))}
                        </div>
                        <p className="text-white/70 line-clamp-2">{intersection.description}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;
