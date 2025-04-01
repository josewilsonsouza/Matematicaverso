import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X, PlusCircle, Copy, Trash, Move } from 'lucide-react';
import { 
  HoverCard,
  HoverCardTrigger,
  HoverCardContent 
} from '@/components/ui/hover-card';
import { useNavigate } from 'react-router-dom';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface Planet {
  id: string;
  name: string;
  description: string;
  systemId: string;
}

interface System {
  id: string;
  name: string;
  planets: Planet[];
}

interface TagData {
  systems: System[];
}

interface TagSystemProps {
  activeTag: string | null;
  onTagClick: (tagName: string) => void;
  onPlanetClick: (tagName: string, systemName: string, planetId: string, planetName: string) => void;
}

const TagSystem: React.FC<TagSystemProps> = ({ activeTag, onTagClick, onPlanetClick }) => {
  const navigate = useNavigate();
  const [tags, setTags] = useState<Record<string, TagData>>({
    'Matematic∂verso': { systems: [] }
  });
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [isAddingSystem, setIsAddingSystem] = useState<string | null>(null);
  const [newSystemName, setNewSystemName] = useState('');
  const [isAddingPlanet, setIsAddingPlanet] = useState<{tagName: string, systemId: string} | null>(null);
  const [newPlanetName, setNewPlanetName] = useState('');
  const [openHoverCard, setOpenHoverCard] = useState<string | null>(null);
  const [moveDialogOpen, setMoveDialogOpen] = useState(false);
  const [currentMoveItem, setCurrentMoveItem] = useState<{
    type: 'system' | 'planet',
    itemId: string,
    sourceTagName: string,
    sourceSystemId?: string,
    itemName: string
  } | null>(null);
  const [targetTagName, setTargetTagName] = useState<string>('');
  const [targetSystemId, setTargetSystemId] = useState<string>('');

  useEffect(() => {
    const savedTags = localStorage.getItem('userTags');
    if (savedTags) {
      try {
        const parsedTags = JSON.parse(savedTags);
        setTags({ 'Matematic∂verso': { systems: [] }, ...parsedTags });
      } catch (error) {
        console.error('Error parsing saved tags:', error);
      }
    }
  }, []);

  useEffect(() => {
    const tagsToSave = { ...tags };
    delete tagsToSave['Matematic∂verso'];
    localStorage.setItem('userTags', JSON.stringify(tagsToSave));
  }, [tags]);

  const handleAddTag = () => {
    if (newTagName.trim() && !tags[newTagName.trim()]) {
      setTags({
        ...tags,
        [newTagName.trim()]: { systems: [] }
      });
      setNewTagName('');
      setIsAddingTag(false);
    }
  };

  const handleAddSystem = (tagName: string) => {
    if (newSystemName.trim()) {
      const updatedTags = { ...tags };
      const systemId = `${tagName}-system-${Date.now()}`;
      
      updatedTags[tagName].systems.push({
        id: systemId,
        name: newSystemName.trim(),
        planets: []
      });
      
      setTags(updatedTags);
      setNewSystemName('');
      setIsAddingSystem(null);
    }
  };

  const handleAddPlanet = (tagName: string, systemId: string) => {
    if (newPlanetName.trim()) {
      const updatedTags = { ...tags };
      const tagData = updatedTags[tagName];
      const systemIndex = tagData.systems.findIndex(system => system.id === systemId);
      
      if (systemIndex !== -1) {
        const planetId = `planet-${Date.now()}`;
        tagData.systems[systemIndex].planets.push({
          id: planetId,
          name: newPlanetName.trim(),
          description: `Um planeta do ${tagName}`,
          systemId: systemId
        });
        
        setTags(updatedTags);
        setNewPlanetName('');
        setIsAddingPlanet(null);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') {
      action();
    } else if (e.key === 'Escape') {
      setIsAddingTag(false);
      setIsAddingSystem(null);
      setIsAddingPlanet(null);
      setNewTagName('');
      setNewSystemName('');
      setNewPlanetName('');
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    if (tagToDelete !== 'Matematic∂verso') {
      const updatedTags = { ...tags };
      delete updatedTags[tagToDelete];
      setTags(updatedTags);
      if (activeTag === tagToDelete) {
        onTagClick('Matematic∂verso');
      }
      setOpenHoverCard(null);
    }
  };

  const handleHoverCardOpenChange = (tagName: string, open: boolean) => {
    if (open) {
      setOpenHoverCard(tagName);
    } else if (openHoverCard === tagName) {
      setOpenHoverCard(null);
    }
  };
  
  const closeHoverCard = () => {
    setOpenHoverCard(null);
  };

  const handleDuplicateSystem = (tagName: string, systemId: string) => {
    const updatedTags = { ...tags };
    const tagData = updatedTags[tagName];
    const systemIndex = tagData.systems.findIndex(system => system.id === systemId);
    
    if (systemIndex !== -1) {
      const originalSystem = tagData.systems[systemIndex];
      const newSystemId = `${tagName}-system-${Date.now()}`;
      
      const newSystem: System = {
        id: newSystemId,
        name: `${originalSystem.name} (Cópia)`,
        planets: originalSystem.planets.map(planet => ({
          id: `planet-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          name: planet.name,
          description: planet.description,
          systemId: newSystemId
        }))
      };
      
      tagData.systems.push(newSystem);
      setTags(updatedTags);
    }
  };

  const handleDeleteSystem = (tagName: string, systemId: string) => {
    const updatedTags = { ...tags };
    const tagData = updatedTags[tagName];
    const systemIndex = tagData.systems.findIndex(system => system.id === systemId);
    
    if (systemIndex !== -1) {
      tagData.systems.splice(systemIndex, 1);
      setTags(updatedTags);
    }
  };

  const handleDuplicatePlanet = (tagName: string, systemId: string, planetId: string) => {
    const updatedTags = { ...tags };
    const tagData = updatedTags[tagName];
    const systemIndex = tagData.systems.findIndex(system => system.id === systemId);
    
    if (systemIndex !== -1) {
      const planetIndex = tagData.systems[systemIndex].planets.findIndex(p => p.id === planetId);
      if (planetIndex !== -1) {
        const originalPlanet = tagData.systems[systemIndex].planets[planetIndex];
        
        const newPlanet: Planet = {
          id: `planet-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          name: `${originalPlanet.name} (Cópia)`,
          description: originalPlanet.description,
          systemId: systemId
        };
        
        tagData.systems[systemIndex].planets.push(newPlanet);
        setTags(updatedTags);
      }
    }
  };

  const handleDeletePlanet = (tagName: string, systemId: string, planetId: string) => {
    const updatedTags = { ...tags };
    const tagData = updatedTags[tagName];
    const systemIndex = tagData.systems.findIndex(system => system.id === systemId);
    
    if (systemIndex !== -1) {
      const planets = tagData.systems[systemIndex].planets;
      const planetIndex = planets.findIndex(p => p.id === planetId);
      
      if (planetIndex !== -1) {
        planets.splice(planetIndex, 1);
        setTags(updatedTags);
      }
    }
  };

  const handleMoveDialogOpen = (
    type: 'system' | 'planet', 
    itemId: string, 
    sourceTagName: string, 
    itemName: string,
    sourceSystemId?: string
  ) => {
    setCurrentMoveItem({type, itemId, sourceTagName, sourceSystemId, itemName});
    setTargetTagName(sourceTagName);
    setTargetSystemId(sourceSystemId || '');
    setMoveDialogOpen(true);
  };

  const handleMoveConfirm = () => {
    if (!currentMoveItem) return;
    
    const updatedTags = { ...tags };
    
    if (currentMoveItem.type === 'system') {
      const sourceTagData = updatedTags[currentMoveItem.sourceTagName];
      const systemIndex = sourceTagData.systems.findIndex(s => s.id === currentMoveItem.itemId);
      
      if (systemIndex !== -1 && targetTagName && targetTagName !== currentMoveItem.sourceTagName) {
        const [systemToMove] = sourceTagData.systems.splice(systemIndex, 1);
        
        if (!updatedTags[targetTagName]) {
          updatedTags[targetTagName] = { systems: [] };
        }
        
        updatedTags[targetTagName].systems.push(systemToMove);
      }
    } else if (currentMoveItem.type === 'planet' && currentMoveItem.sourceSystemId) {
      const sourceTagData = updatedTags[currentMoveItem.sourceTagName];
      const sourceSystemIndex = sourceTagData.systems.findIndex(s => s.id === currentMoveItem.sourceSystemId);
      
      if (sourceSystemIndex !== -1) {
        const sourcePlanets = sourceTagData.systems[sourceSystemIndex].planets;
        const planetIndex = sourcePlanets.findIndex(p => p.id === currentMoveItem.itemId);
        
        if (planetIndex !== -1 && targetTagName && targetSystemId) {
          const [planetToMove] = sourcePlanets.splice(planetIndex, 1);
          
          const targetTagData = updatedTags[targetTagName];
          const targetSystemIndex = targetTagData.systems.findIndex(s => s.id === targetSystemId);
          
          if (targetSystemIndex !== -1) {
            planetToMove.systemId = targetSystemId;
            
            targetTagData.systems[targetSystemIndex].planets.push(planetToMove);
          }
        }
      }
    }
    
    setTags(updatedTags);
    setMoveDialogOpen(false);
    setCurrentMoveItem(null);
  };

  return (
    <>
      {Object.keys(tags).map(tag => (
        <div key={tag} className="flex items-center">
          <HoverCard open={openHoverCard === tag} onOpenChange={(open) => handleHoverCardOpenChange(tag, open)}>
            <HoverCardTrigger asChild>
              <Button
                variant={openHoverCard === tag ? "default" : "outline"}
                className={`rounded-full text-sm px-4 py-2 ${
                  openHoverCard === tag 
                    ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
                onClick={() => {
                  onTagClick(tag);
                  setOpenHoverCard(tag === 'Matematic∂verso' ? null : tag);
                }}
              >
                {tag}
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 bg-space-deep border border-purple-500/30 p-4 text-white">
              <div className="space-y-3">
                <h4 className="text-lg font-medium border-b border-purple-500/30 pb-2 mb-2 flex justify-between items-center">
                  {tag}
                  <div className="flex items-center">
                    <Popover open={isAddingSystem === tag} onOpenChange={() => setIsAddingSystem(isAddingSystem === tag ? null : tag)}>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white">
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-60 bg-space-deep border border-purple-500/30 p-3 text-white">
                        <div className="space-y-2">
                          <h5 className="font-medium">Novo Sistema</h5>
                          <div className="flex">
                            <Input
                              autoFocus
                              value={newSystemName}
                              onChange={(e) => setNewSystemName(e.target.value)}
                              onKeyDown={(e) => handleKeyDown(e, () => handleAddSystem(tag))}
                              placeholder="Nome do sistema..."
                              className="h-8 bg-white/10 text-white border-none focus-visible:ring-purple-500"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              className="ml-1 text-white h-8"
                              onClick={() => handleAddSystem(tag)}
                            >
                              <Plus size={16} />
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-white ml-1"
                      onClick={closeHoverCard}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </h4>
                
                {tags[tag].systems.length === 0 ? (
                  <div className="text-sm text-white/70 text-center py-2">
                    Nenhum sistema criado ainda
                  </div>
                ) : (
                  <div className="space-y-3">
                    {tags[tag].systems.map(system => (
                      <ContextMenu key={system.id}>
                        <ContextMenuTrigger>
                          <div className="bg-white/5 rounded-lg p-2">
                            <div className="flex justify-between items-center mb-2">
                              <h5 className="font-medium">{system.name}</h5>
                              <Popover 
                                open={isAddingPlanet?.tagName === tag && isAddingPlanet?.systemId === system.id} 
                                onOpenChange={() => setIsAddingPlanet(
                                  isAddingPlanet?.tagName === tag && isAddingPlanet?.systemId === system.id 
                                    ? null 
                                    : {tagName: tag, systemId: system.id}
                                )}
                              >
                                <PopoverTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-white">
                                    <PlusCircle className="h-3 w-3" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-60 bg-space-deep border border-purple-500/30 p-3 text-white">
                                  <div className="space-y-2">
                                    <h5 className="font-medium">Novo Planeta</h5>
                                    <div className="flex">
                                      <Input
                                        autoFocus
                                        value={newPlanetName}
                                        onChange={(e) => setNewPlanetName(e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(e, () => handleAddPlanet(tag, system.id))}
                                        placeholder="Nome do planeta..."
                                        className="h-8 bg-white/10 text-white border-none focus-visible:ring-purple-500"
                                      />
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="ml-1 text-white h-8"
                                        onClick={() => handleAddPlanet(tag, system.id)}
                                      >
                                        <Plus size={16} />
                                      </Button>
                                    </div>
                                  </div>
                                </PopoverContent>
                              </Popover>
                            </div>
                            
                            {system.planets.length === 0 ? (
                              <div className="text-xs text-white/70 text-center py-1">
                                Nenhum planeta criado
                              </div>
                            ) : (
                              <div className="grid grid-cols-2 gap-1">
                                {system.planets.map(planet => (
                                  <ContextMenu key={planet.id}>
                                    <ContextMenuTrigger>
                                      <div 
                                        key={planet.id}
                                        className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
                                        onClick={() => onPlanetClick(tag, system.name, planet.id, planet.name)}
                                      >
                                        <div className="flex items-center space-x-2">
                                          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-400 to-purple-600"></div>
                                          <span className="text-xs">{planet.name}</span>
                                        </div>
                                      </div>
                                    </ContextMenuTrigger>
                                    <ContextMenuContent className="bg-space-deep border border-purple-500/30 text-white">
                                      <ContextMenuItem 
                                        onClick={() => handleDuplicatePlanet(tag, system.id, planet.id)}
                                        className="cursor-pointer focus:bg-white/20 focus:text-white"
                                      >
                                        <Copy className="w-4 h-4 mr-2" /> Duplicar
                                      </ContextMenuItem>
                                      <ContextMenuItem 
                                        onClick={() => handleMoveDialogOpen('planet', planet.id, tag, planet.name, system.id)}
                                        className="cursor-pointer focus:bg-white/20 focus:text-white"
                                      >
                                        <Move className="w-4 h-4 mr-2" /> Mover
                                      </ContextMenuItem>
                                      <ContextMenuSeparator className="bg-white/20" />
                                      <ContextMenuItem 
                                        onClick={() => handleDeletePlanet(tag, system.id, planet.id)}
                                        className="text-red-400 cursor-pointer focus:bg-white/20 focus:text-red-400"
                                      >
                                        <Trash className="w-4 h-4 mr-2" /> Excluir
                                      </ContextMenuItem>
                                    </ContextMenuContent>
                                  </ContextMenu>
                                ))}
                              </div>
                            )}
                          </div>
                        </ContextMenuTrigger>
                        <ContextMenuContent className="bg-space-deep border border-purple-500/30 text-white">
                          <ContextMenuItem 
                            onClick={() => handleDuplicateSystem(tag, system.id)}
                            className="cursor-pointer focus:bg-white/20 focus:text-white"
                          >
                            <Copy className="w-4 h-4 mr-2" /> Duplicar
                          </ContextMenuItem>
                          <ContextMenuItem 
                            onClick={() => handleMoveDialogOpen('system', system.id, tag, system.name)}
                            className="cursor-pointer focus:bg-white/20 focus:text-white"
                          >
                            <Move className="w-4 h-4 mr-2" /> Mover
                          </ContextMenuItem>
                          <ContextMenuSeparator className="bg-white/20" />
                          <ContextMenuItem 
                            onClick={() => handleDeleteSystem(tag, system.id)}
                            className="text-red-400 cursor-pointer focus:bg-white/20 focus:text-red-400"
                          >
                            <Trash className="w-4 h-4 mr-2" /> Excluir
                          </ContextMenuItem>
                        </ContextMenuContent>
                      </ContextMenu>
                    ))}
                  </div>
                )}
              </div>
            </HoverCardContent>
          </HoverCard>
          {tag !== 'Matematic∂verso' && (
            <button
              className="ml-1 p-1 rounded-full hover:bg-white/20 text-white/70 hover:text-white"
              onClick={() => handleDeleteTag(tag)}
            >
              <X size={14} />
            </button>
          )}
        </div>
      ))}

      {isAddingTag ? (
        <div className="flex items-center">
          <Input
            autoFocus
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, handleAddTag)}
            placeholder="Nome da tag..."
            className="rounded-full h-9 bg-white/10 text-white border-none focus-visible:ring-purple-500"
          />
          <Button
            variant="ghost"
            size="sm"
            className="ml-1 text-white"
            onClick={handleAddTag}
          >
            <Plus size={16} />
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          size="sm"
          className="rounded-full bg-white/10 hover:bg-white/20 text-white"
          onClick={() => setIsAddingTag(true)}
        >
          <Plus size={16} className="mr-1" /> Nova Tag
        </Button>
      )}

      <Dialog open={moveDialogOpen} onOpenChange={setMoveDialogOpen}>
        <DialogContent className="bg-space-deep border border-purple-500/30 text-white">
          <DialogHeader>
            <DialogTitle>Mover {currentMoveItem?.type === 'system' ? 'Sistema' : 'Planeta'}</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p className="mb-4">{currentMoveItem?.itemName}</p>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Tag de Destino</label>
                <select 
                  value={targetTagName}
                  onChange={(e) => setTargetTagName(e.target.value)}
                  className="w-full p-2 rounded-md bg-white/10 border border-white/20 text-white"
                >
                  {Object.keys(tags).filter(t => t !== 'Matematic∂verso').map(tagName => (
                    <option key={tagName} value={tagName}>{tagName}</option>
                  ))}
                </select>
              </div>
              
              {currentMoveItem?.type === 'planet' && (
                <div>
                  <label className="text-sm font-medium mb-1 block">Sistema de Destino</label>
                  <select 
                    value={targetSystemId}
                    onChange={(e) => setTargetSystemId(e.target.value)}
                    className="w-full p-2 rounded-md bg-white/10 border border-white/20 text-white"
                  >
                    {targetTagName && tags[targetTagName]?.systems.map(system => (
                      <option key={system.id} value={system.id}>{system.name}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline"
              onClick={() => setMoveDialogOpen(false)}
              className="bg-transparent text-white border-white/30 hover:bg-white/10"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleMoveConfirm}
              className="bg-purple-600 text-white hover:bg-purple-700"
            >
              Mover
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TagSystem;
