import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';

interface TemplateCardProps {
  name: string;
  displayName: string;
  description: string;
  imageSrc: string;
  isSelected: boolean;
  onClick: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ 
  name, 
  displayName, 
  description, 
  imageSrc, 
  isSelected, 
  onClick 
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mouseOver, setMouseOver] = useState(false);
  const isMobile = useIsMobile();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      style={{
        transformStyle: 'preserve-3d',
        transform: mouseOver && !isMobile ? 
          `perspective(1000px) rotateX(${mousePosition.y * -5}deg) rotateY(${mousePosition.x * 5}deg)` : 
          'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        transition: 'transform 0.2s ease-out'
      }}
      onClick={onClick}
      className={`w-full max-w-sm mx-auto cursor-pointer ${isSelected ? 'ring-4 ring-blue-500' : ''}`}
    >
      <Card className={`h-full overflow-hidden ${isSelected ? 'border-blue-500 border-2' : 'border-gray-200'}`}>
        <div className="relative h-48 overflow-hidden">
          <div 
            className="w-full h-full bg-cover bg-center transition-all duration-300 ease-in-out"
            style={{ 
              backgroundImage: `url(${imageSrc})`,
              transform: mouseOver && !isMobile ? 'scale(1.05)' : 'scale(1)'
            }}
          />
          {isSelected && (
            <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
              Selezionato
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-bold mb-1">{displayName}</h3>
          <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const TemplateSelection: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [, setLocation] = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    // Recupera il template selezionato precedentemente, se presente
    const savedTemplate = localStorage.getItem('selectedTemplate');
    if (savedTemplate) {
      setSelectedTemplate(savedTemplate);
    }
  }, []);

  const templates = [
    {
      name: 'classic',
      displayName: 'Classico',
      description: 'Un design classico, pulito e professionale per CV tradizionali',
      imageSrc: '/classic-template.png'
    },
    {
      name: 'modern',
      displayName: 'Moderno',
      description: 'Un design moderno con elementi contemporanei e colori vivaci',
      imageSrc: '/modern-template.png'
    },
    {
      name: 'minimalist',
      displayName: 'Minimalista',
      description: 'Un design essenziale che punta sulla chiarezza e sulla leggibilità',
      imageSrc: '/minimalist-template.png'
    },
    {
      name: 'professional',
      displayName: 'Professionale',
      description: 'Un design elegante per professionisti e manager',
      imageSrc: '/professional-template.png'
    },
    {
      name: 'artistic',
      displayName: 'Artistico',
      description: 'Un design creativo per professioni artistiche e creative',
      imageSrc: '/artistic-template.png'
    },
    {
      name: 'darkMinimalist',
      displayName: 'Dark Minimalista',
      description: 'Un design minimalista con sfondo scuro per un look moderno',
      imageSrc: '/dark-minimalist-template.png'
    },
    {
      name: 'corporate',
      displayName: 'Corporate',
      description: 'Un design formale per ambienti aziendali e corporate',
      imageSrc: '/corporate-template.png'
    },
    {
      name: 'timeline',
      displayName: 'Timeline',
      description: 'Un design che evidenzia l\'esperienza con un formato a timeline',
      imageSrc: '/timeline-template.png'
    }
  ];

  const handleTemplateSelect = (templateName: string) => {
    setSelectedTemplate(templateName);
  };

  const handleContinue = () => {
    if (selectedTemplate) {
      localStorage.setItem('selectedTemplate', selectedTemplate);
      setLocation('/editor');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Scegli il Tuo Template
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Seleziona lo stile che meglio rappresenta la tua personalità e la tua professionalità.
            Puoi sempre cambiarlo in seguito durante la creazione del CV.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10"
        >
          {templates.map((template, index) => (
            <motion.div
              key={template.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TemplateCard
                name={template.name}
                displayName={template.displayName}
                description={template.description}
                imageSrc={template.imageSrc}
                isSelected={selectedTemplate === template.name}
                onClick={() => handleTemplateSelect(template.name)}
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center mt-8">
          <Button
            onClick={handleContinue}
            disabled={!selectedTemplate}
            className={`px-8 py-3 text-lg font-medium transition-all duration-300 ${
              selectedTemplate
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continua con {selectedTemplate ? templates.find(t => t.name === selectedTemplate)?.displayName : 'il template selezionato'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelection;