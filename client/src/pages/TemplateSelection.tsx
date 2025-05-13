import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
  return (
    <div 
      className={cn(
        "group relative cursor-pointer rounded-xl overflow-hidden shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl",
        isSelected ? "ring-4 ring-blue-500 scale-105" : ""
      )}
      onClick={onClick}
    >
      <div className="relative h-80 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={`${displayName} template`} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-80 group-hover:opacity-70 transition-opacity"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <h3 className="text-xl font-bold mb-1">{displayName}</h3>
          <p className="text-sm text-gray-200 mb-3">{description}</p>
          
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              variant={isSelected ? "default" : "outline"}
              className={cn(
                "bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30",
                isSelected ? "bg-blue-600 hover:bg-blue-700 border-none" : ""
              )}
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
            >
              {isSelected ? "Selezionato" : "Seleziona"}
            </Button>
            
            <Button 
              size="sm" 
              variant="outline"
              className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
            >
              Anteprima
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const TemplateSelection = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('classic');
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  
  // 3D effect for the hero section
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Calculate normalized mouse position (-1 to 1)
      const xNorm = (clientX / windowWidth) * 2 - 1;
      const yNorm = (clientY / windowHeight) * 2 - 1;
      
      setMousePosition({ x: xNorm, y: yNorm });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  const continueToEditor = () => {
    setIsLoading(true);
    // Save the template selection to localStorage for persistence
    localStorage.setItem('selectedTemplate', selectedTemplate);
    // Navigate to the editor
    setTimeout(() => {
      setLocation('/');
    }, 500);
  };
  
  const templates = [
    {
      name: 'classic',
      displayName: 'Classico',
      description: 'Layout tradizionale ed elegante, perfetto per qualsiasi settore professionale.',
      imageSrc: '/template-previews/classic.jpg'
    },
    {
      name: 'modern',
      displayName: 'Moderno',
      description: 'Design contemporaneo con stile pulito e minimalista.',
      imageSrc: '/template-previews/modern.jpg'
    },
    {
      name: 'creative',
      displayName: 'Creativo',
      description: 'Layout colorato e dinamico, ideale per professioni creative.',
      imageSrc: '/template-previews/creative.jpg'
    },
    {
      name: 'professional',
      displayName: 'Professionale',
      description: 'Aspetto sobrio e formale, perfetto per ruoli aziendali e dirigenziali.',
      imageSrc: '/template-previews/professional.jpg'
    },
    {
      name: 'modern3d',
      displayName: 'Moderno 3D',
      description: 'Design con elementi tridimensionali per un CV che cattura l\'attenzione.',
      imageSrc: '/template-previews/modern3d.jpg'
    },
    {
      name: 'minimalist',
      displayName: 'Minimalista',
      description: 'Essenziale e raffinato, mette in risalto i contenuti con uno stile pulito.',
      imageSrc: '/template-previews/minimalist.jpg'
    },
    {
      name: 'academic',
      displayName: 'Accademico',
      description: 'Layout strutturato per ambiti accademici e di ricerca.',
      imageSrc: '/template-previews/academic.jpg'
    },
    {
      name: 'technical',
      displayName: 'Tecnico',
      description: 'Design che evidenzia competenze tecniche e progetti.',
      imageSrc: '/template-previews/technical.jpg'
    },
    {
      name: 'artistic',
      displayName: 'Artistico',
      description: 'Layout colorato e creativo con elementi grafici dinamici.',
      imageSrc: '/template-previews/artistic.jpg'
    },
    {
      name: 'darkMinimalist',
      displayName: 'Minimalista Scuro',
      description: 'Tema scuro elegante con un design moderno e sofisticato.',
      imageSrc: '/template-previews/dark-minimalist.jpg'
    },
    {
      name: 'corporate',
      displayName: 'Corporate',
      description: 'Stile aziendale professionale, ideale per ruoli manageriali.',
      imageSrc: '/template-previews/corporate.jpg'
    },
    {
      name: 'timeline',
      displayName: 'Timeline',
      description: 'Layout con timeline visuale per evidenziare il percorso professionale.',
      imageSrc: '/template-previews/timeline.jpg'
    }
  ];
  
  // Temporary placeholder images while real images are being prepared
  const placeholderImage = (template: string) => {
    return `https://via.placeholder.com/400x500?text=${template.replace(/[0-9]+d$/, '')}`;
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Hero section with 3D effect */}
      <section 
        className="relative h-[70vh] flex items-center justify-center overflow-hidden"
        style={{
          perspective: '1000px'
        }}
      >
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/hero-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `rotateX(${mousePosition.y * 5}deg) rotateY(${-mousePosition.x * 5}deg) scale(1.1)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-purple-900/70 to-indigo-900/90"></div>
        </div>
        
        <div className="relative z-10 text-center px-6">
          <h1 
            className="text-4xl md:text-6xl font-bold text-white mb-4"
            style={{
              transform: `translateZ(50px) translateX(${mousePosition.x * 10}px) translateY(${mousePosition.y * 10}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            Scegli il Tuo <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Template</span>
          </h1>
          
          <p 
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-8"
            style={{
              transform: `translateZ(30px) translateX(${mousePosition.x * 5}px) translateY(${mousePosition.y * 5}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            Seleziona il design perfetto per il tuo curriculum prima di passare alla personalizzazione dei contenuti.
          </p>
          
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg"
            onClick={continueToEditor}
            disabled={isLoading}
            style={{
              transform: `translateZ(20px) translateX(${mousePosition.x * 2}px) translateY(${mousePosition.y * 2}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            {isLoading ? (
              <>
                <span className="mr-2">Caricamento...</span>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </>
            ) : (
              'Continua con questo template'
            )}
          </Button>
        </div>
        
        {/* Decorative 3D elements */}
        <div 
          className="absolute top-1/4 left-1/4 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20 blur-xl"
          style={{
            transform: `translateZ(10px) translateX(${-mousePosition.x * 30}px) translateY(${-mousePosition.y * 30}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
        
        <div 
          className="absolute bottom-1/3 right-1/3 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-xl"
          style={{
            transform: `translateZ(20px) translateX(${-mousePosition.x * 40}px) translateY(${-mousePosition.y * 40}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
      </section>
      
      {/* Template gallery */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">I nostri template</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <TemplateCard
              key={template.name}
              name={template.name}
              displayName={template.displayName}
              description={template.description}
              imageSrc={template.imageSrc || placeholderImage(template.name)}
              isSelected={selectedTemplate === template.name}
              onClick={() => setSelectedTemplate(template.name)}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg"
            onClick={continueToEditor}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="mr-2">Caricamento...</span>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </>
            ) : (
              'Continua con questo template'
            )}
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 border-t border-gray-800">
        <p>&copy; {new Date().getFullYear()} Generatore Curriculum Interattivo</p>
      </footer>
    </div>
  );
};

export default TemplateSelection;