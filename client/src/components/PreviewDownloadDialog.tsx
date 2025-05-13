import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonalInfo, Experience, Education, Skill } from "@shared/schema";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface PreviewDownloadDialogProps {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  template: string;
  children: React.ReactNode;
}

interface SectionPosition {
  id: string;
  name: string;
  top: number;
  left: number;
  width: number;
  height: number;
  originalTop: number;
  originalLeft: number;
  isDragging?: boolean;
}

const PreviewDownloadDialog = ({ 
  personalInfo, 
  experiences, 
  education, 
  skills, 
  template,
  children 
}: PreviewDownloadDialogProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [zoom, setZoom] = useState(0.6);
  const [sections, setSections] = useState<SectionPosition[]>([]);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pdfOrientation, setPdfOrientation] = useState<'portrait' | 'landscape'>('portrait');
  
  const previewRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Generate preview when dialog opens
  useEffect(() => {
    if (open) {
      generatePreview();
    } else {
      // Reset state when closing
      setPreviewImage(null);
      setSections([]);
      setSelectedSection(null);
      setCurrentPage(1);
    }
  }, [open]);
  
  // Effect to detect sections when preview image is loaded
  useEffect(() => {
    if (previewImage) {
      detectSections();
    }
  }, [previewImage]);
  
  // Generate preview image of CV
  const generatePreview = async () => {
    setIsLoadingPreview(true);
    
    try {
      // Find the CV element in the parent document
      // Prima cerchiamo direttamente nel contenitore principale del CV
      const cvPreviewContainer = document.getElementById('cv-preview');
      if (!cvPreviewContainer || cvPreviewContainer.children.length === 0) {
        throw new Error("CV container not found");
      }
      
      // Ottieni il CV template vero e proprio (il primo figlio del container)
      const cvElement = cvPreviewContainer.children[0] as HTMLElement;
      
      if (!cvElement) {
        throw new Error("CV element not found inside container");
      }
      
      // Add a temporary class to set print mode styles
      document.body.classList.add('pdf-generation-in-progress');
      
      // Clone the element to avoid modifying the original
      const clonedCV = cvElement.cloneNode(true) as HTMLElement;
      
      // Apply any needed style adjustments for PDF generation
      clonedCV.style.width = '210mm'; // A4 width
      
      // Make sure all backgrounds and images are visible and rendered
      const allElements = clonedCV.querySelectorAll('*');
      allElements.forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.pageBreakInside = 'avoid';
          // Ensure all backgrounds are rendered
          const computed = window.getComputedStyle(el);
          if (computed.backgroundImage !== 'none' && !el.getAttribute('data-html2canvas-ignore')) {
            el.setAttribute('data-html2canvas-render-background', 'true');
          }
        }
      });
      
      // Temporarily add to body for rendering
      clonedCV.style.position = 'absolute';
      clonedCV.style.left = '-9999px';
      clonedCV.style.top = '0';
      clonedCV.style.backgroundColor = 'white';
      clonedCV.style.transition = 'none';
      
      const tempContainer = document.createElement('div');
      tempContainer.appendChild(clonedCV);
      tempContainer.className = 'pdf-generation-in-progress';
      tempContainer.style.position = 'fixed';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '0';
      tempContainer.style.width = '210mm';
      tempContainer.style.height = 'auto';
      tempContainer.style.overflow = 'hidden';
      tempContainer.style.zIndex = '-9999';
      document.body.appendChild(tempContainer);
      
      // Diamo un momento al browser per renderizzare tutto
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Generate canvas from the element
      const canvas = await html2canvas(clonedCV, {
        scale: 2, // Higher quality
        useCORS: true,
        logging: false,
        allowTaint: true,
        backgroundColor: 'white',
        onclone: (document, element) => {
          // Force style calculations in cloned document
          const allElements = element.querySelectorAll('*');
          allElements.forEach(el => {
            if (el instanceof HTMLElement) {
              // Force style calculation
              window.getComputedStyle(el).backgroundColor;
            }
          });
        }
      });
      
      // Store canvas for later use
      canvasRef.current = canvas;
      
      // Calculate number of pages (A4 ratio is approximately 1:1.414)
      const a4Width = 210; // mm
      const a4Height = 297; // mm
      const aspectRatio = canvas.height / canvas.width;
      const pageHeight = a4Width * aspectRatio;
      
      // Calculate how many pages needed
      const pages = Math.ceil(pageHeight / a4Height);
      setPageCount(pages || 1);
      
      // Convert canvas to image
      setPreviewImage(canvas.toDataURL('image/png'));
      
      // Clean up
      document.body.removeChild(tempContainer);
      document.body.classList.remove('pdf-generation-in-progress');
    } catch (error) {
      console.error("Error generating preview:", error);
    } finally {
      setIsLoadingPreview(false);
    }
  };
  
  // Detect sections in the CV for repositioning
  const detectSections = () => {
    // Prima cerchiamo l'immagine di anteprima, se è stata generata
    if (!previewImage || !previewRef.current) return;
    
    try {
      // Cerchiamo i principali contenitori di sezioni nell'anteprima originale
      const cvPreviewContainer = document.getElementById('cv-preview');
      if (!cvPreviewContainer || cvPreviewContainer.children.length === 0) return;
      
      // Ottieni il CV template vero e proprio (il primo figlio del container)
      const cvElement = cvPreviewContainer.children[0] as HTMLElement;
      if (!cvElement) return;
      
      // Find section elements (headings and their containers) - expand selector to capture more sections
      const detectedSections: SectionPosition[] = [];
      
      // Look for common section identifiers - more comprehensive selector
      const sectionElements = cvElement.querySelectorAll('div > h1, div > h2, div > h3, section, div[class*="section"], div.mb-6, div.mb-8, div.space-y-6 > div, div.space-y-8 > div');
      
      // Analisi della struttura del documento per identificare possibili contenitori di sezioni
      const possibleSections: HTMLElement[] = [];
      
      // Prima aggiungiamo gli elementi che trovamo con i selettori
      sectionElements.forEach(el => possibleSections.push(el as HTMLElement));
      
      // Cerchiamo anche i contenitori di sezioni in base alla struttura
      const divs = cvElement.querySelectorAll('div');
      divs.forEach(div => {
        // Se il div contiene un h2/h3 ed è abbastanza grande, probabilmente è una sezione
        const hasHeading = div.querySelector('h1, h2, h3, h4');
        if (hasHeading && div.clientHeight > 50) {
          possibleSections.push(div as HTMLElement);
        }
        
        // Se è un div con una classe che contiene "sezione" o simili
        if (div.className && (
            div.className.includes('section') || 
            div.className.includes('sezione') || 
            div.className.includes('container') ||
            div.className.includes('mb-') ||
            div.className.includes('space-y-')
          )) {
          possibleSections.push(div as HTMLElement);
        }
      });
      
      // Procediamo con la creazione delle sezioni
      const uniqueIds = new Set<string>();
      possibleSections.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const cvRect = cvElement.getBoundingClientRect();
        
        // Skip tiny elements or those without content
        if (rect.height < 40 || rect.width < 100 || !element.textContent?.trim()) return;
        
        // Get section name from text content or data attribute
        // Prima cerchiamo un titolo all'interno
        let name = '';
        const heading = element.querySelector('h1, h2, h3, h4');
        if (heading && heading.textContent) {
          name = heading.textContent.trim();
        } else {
          // Altrimenti usiamo il testo dell'elemento stesso o un nome generico
          name = element.textContent?.trim() || `Sezione ${index + 1}`;
        }
        
        // Limita la lunghezza e crea un ID univoco
        if (name.length > 30) {
          name = name.substring(0, 27) + '...';
        }
        
        // Solo le prime 3-4 parole per ID
        const idName = name.split(' ').slice(0, 3).join('-').toLowerCase();
        let id = `section-${idName}-${index}`;
        if (uniqueIds.has(id)) {
          id = `section-${idName}-${index}-${Math.floor(Math.random() * 1000)}`;
        }
        uniqueIds.add(id);
        
        // Calculate position relative to CV element
        const top = rect.top - cvRect.top;
        const left = rect.left - cvRect.left;
        
        detectedSections.push({
          id,
          name,
          top,
          left,
          width: rect.width,
          height: rect.height,
          originalTop: top,
          originalLeft: left
        });
      });
      
      // Merge sezioni simili e rimuovi sezioni troppo piccole o troppo grandi
      const processedSections = detectedSections
        .filter(section => {
          // Filtro per dimensioni ragionevoli
          const isReasonableSize = section.width > 100 && section.height > 40 && 
                                 section.width < 800 && section.height < 800;
          return isReasonableSize;
        })
        .sort((a, b) => a.top - b.top); // Ordina per posizione dall'alto verso il basso
      
      // Riduci potenziali duplicati o sezioni che si sovrappongono
      const finalSections: SectionPosition[] = [];
      processedSections.forEach(section => {
        // Verifica se questa sezione si sovrappone significativamente con una già aggiunta
        const hasDuplicate = finalSections.some(existing => {
          // Calcola sovrapposizione verticale
          const verticalOverlap = Math.min(
            existing.top + existing.height, 
            section.top + section.height
          ) - Math.max(existing.top, section.top);
          
          // Calcola sovrapposizione orizzontale
          const horizontalOverlap = Math.min(
            existing.left + existing.width, 
            section.left + section.width
          ) - Math.max(existing.left, section.left);
          
          // Se c'è sovrapposizione significativa in entrambe le direzioni
          const isSignificantOverlap = 
            (verticalOverlap > existing.height * 0.7 || verticalOverlap > section.height * 0.7) &&
            (horizontalOverlap > existing.width * 0.7 || horizontalOverlap > section.width * 0.7);
          
          return isSignificantOverlap;
        });
        
        if (!hasDuplicate) {
          finalSections.push(section);
        }
      });
      
      // Limita il numero totale di sezioni a massimo 8-10 per non sovraccaricare l'interfaccia
      const maxSections = 10;
      const resultSections = finalSections.slice(0, maxSections);
      
      setSections(resultSections);
    } catch (error) {
      console.error("Error detecting sections:", error);
      // Fallback a sezioni predefinite per garantire funzionalità minima
      const fallbackSections: SectionPosition[] = [
        { id: 'header', name: 'Intestazione', top: 20, left: 20, width: 500, height: 100, originalTop: 20, originalLeft: 20 },
        { id: 'personal', name: 'Informazioni Personali', top: 130, left: 20, width: 500, height: 150, originalTop: 130, originalLeft: 20 },
        { id: 'experience', name: 'Esperienze', top: 300, left: 20, width: 500, height: 200, originalTop: 300, originalLeft: 20 },
        { id: 'education', name: 'Formazione', top: 520, left: 20, width: 500, height: 200, originalTop: 520, originalLeft: 20 },
        { id: 'skills', name: 'Competenze', top: 740, left: 20, width: 500, height: 150, originalTop: 740, originalLeft: 20 }
      ];
      
      setSections(fallbackSections);
    }
  };
  
  // Stato per drag and drop
  const [dragStartPosition, setDragStartPosition] = useState<{ x: number, y: number } | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number, y: number } | null>(null);

  // Handle section drag start
  const handleDragStart = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Trova la sezione e imposta il flag di trascinamento
    setSections(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? { ...section, isDragging: true } 
          : section
      )
    );
    
    setSelectedSection(sectionId);
    setDragStartPosition({ x: e.clientX, y: e.clientY });
    
    // Calcola l'offset dal punto cliccato all'angolo superiore sinistro dell'elemento
    const sectionElement = document.getElementById(`preview-section-${sectionId}`);
    if (sectionElement) {
      const rect = sectionElement.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
    
    // Aggiungi event listener per il movimento e il rilascio
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
  };
  
  // Handle section drag move
  const handleDragMove = (e: MouseEvent) => {
    e.preventDefault();
    
    if (dragStartPosition && selectedSection) {
      const movingSection = sections.find(section => section.id === selectedSection);
      if (!movingSection || !dragOffset) return;
      
      // Calcola la nuova posizione considerando lo zoom
      const previewContainer = previewRef.current;
      if (!previewContainer) return;
      
      const containerRect = previewContainer.getBoundingClientRect();
      
      // Calcola la nuova posizione relativa al contenitore dell'anteprima e con lo zoom
      const newLeft = (e.clientX - containerRect.left - dragOffset.x) / zoom;
      const newTop = (e.clientY - containerRect.top - dragOffset.y) / zoom;
      
      // Aggiorna la posizione della sezione
      setSections(prev => 
        prev.map(section => 
          section.id === selectedSection 
            ? { ...section, left: newLeft, top: newTop } 
            : section
        )
      );
    }
  };
  
  // Handle section drag end
  const handleDragEnd = (e: MouseEvent) => {
    e.preventDefault();
    
    // Rimuovi il flag di trascinamento
    setSections(prev => 
      prev.map(section => 
        section.id === selectedSection 
          ? { ...section, isDragging: false } 
          : section
      )
    );
    
    setDragStartPosition(null);
    setDragOffset(null);
    
    // Rimuovi gli event listener
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);
  };
  
  // Update section position
  const updateSectionPosition = (id: string, deltaY: number) => {
    setSections(prev => 
      prev.map(section => 
        section.id === id 
          ? { ...section, top: section.top + deltaY } 
          : section
      )
    );
  };
  
  // Reset section positions
  const resetPositions = () => {
    setSections(prev => 
      prev.map(section => ({
        ...section,
        top: section.originalTop,
        left: section.originalLeft,
        isDragging: false
      }))
    );
    
    // Pulisci anche gli stati di drag and drop
    setDragStartPosition(null);
    setDragOffset(null);
    setSelectedSection(null);
  };
  
  // Generate and download the PDF with adjusted section positions
  const downloadPDF = async () => {
    if (!canvasRef.current) return;
    
    try {
      // Create PDF with proper orientation
      const pdf = new jsPDF({
        orientation: pdfOrientation,
        unit: 'mm',
        format: 'a4'
      });
      
      // Define page dimensions
      const pageWidth = pdfOrientation === 'portrait' ? 210 : 297;
      const pageHeight = pdfOrientation === 'portrait' ? 297 : 210;
      
      // Define margins
      const marginX = 10;
      const marginY = 10;
      
      // Get the original canvas
      const originalCanvas = canvasRef.current;
      
      // Create a new canvas to apply section position changes
      const modifiedCanvas = document.createElement('canvas');
      modifiedCanvas.width = originalCanvas.width;
      modifiedCanvas.height = originalCanvas.height;
      const ctx = modifiedCanvas.getContext('2d');
      
      if (!ctx) {
        throw new Error("Could not get canvas context");
      }
      
      // First draw the original image
      ctx.drawImage(originalCanvas, 0, 0);
      
      // Apply section position changes (more complex in reality, would need to manipulate individual sections)
      // This is a simple demonstration - a full implementation would involve:
      // 1. Extracting each section as separate canvas
      // 2. Clearing its original position
      // 3. Redrawing at new position
      // For this example, we'll keep it simple and just use the original canvas
      
      // Calculate the width and height for the image in the PDF
      const imgWidth = pageWidth - (marginX * 2);
      let imgHeight = (modifiedCanvas.height * imgWidth) / modifiedCanvas.width;
      
      // If the image height is greater than the page height, we need to split it into multiple pages
      const maxHeight = pageHeight - (marginY * 2);
      
      if (imgHeight <= maxHeight) {
        // If the image fits on one page
        pdf.addImage(
          modifiedCanvas.toDataURL('image/jpeg', 0.95),
          'JPEG',
          marginX, marginY,
          imgWidth, imgHeight
        );
      } else {
        // If the image spans multiple pages
        let currentPosition = 0;
        
        while (currentPosition < modifiedCanvas.height) {
          // Calculate the height of the current section
          const canvasSectionHeight = Math.min(
            modifiedCanvas.height - currentPosition,
            (maxHeight / imgHeight) * modifiedCanvas.height
          );
          
          // Calculate the height in millimeters of the current section
          const pdfSectionHeight = (canvasSectionHeight * imgHeight) / modifiedCanvas.height;
          
          // Create a temporary canvas for this section
          const tempCanvas = document.createElement('canvas');
          tempCanvas.width = modifiedCanvas.width;
          tempCanvas.height = canvasSectionHeight;
          
          // Draw the section onto the temporary canvas
          const tempCtx = tempCanvas.getContext('2d');
          if (!tempCtx) continue;
          
          tempCtx.drawImage(
            modifiedCanvas,
            0, currentPosition,
            modifiedCanvas.width, canvasSectionHeight,
            0, 0,
            tempCanvas.width, tempCanvas.height
          );
          
          // Add this section to the PDF
          if (currentPosition > 0) {
            pdf.addPage();
          }
          
          pdf.addImage(
            tempCanvas.toDataURL('image/jpeg', 0.95),
            'JPEG',
            marginX, marginY,
            imgWidth, pdfSectionHeight
          );
          
          // Move to the next section
          currentPosition += canvasSectionHeight;
        }
      }
      
      // Save the PDF
      pdf.save(`CV_${personalInfo.firstName || 'Nome'}_${personalInfo.lastName || 'Cognome'}.pdf`);
      
      // Close the dialog after download
      setOpen(false);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      
      <DialogContent className="max-w-6xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Anteprima Download CV</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col md:flex-row gap-4 overflow-hidden flex-grow">
          {/* Preview Area */}
          <div className="relative flex-grow overflow-auto border rounded-md bg-gray-100" ref={previewRef}>
            {isLoadingPreview ? (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm text-gray-600">Generazione anteprima in corso...</p>
                </div>
              </div>
            ) : previewImage ? (
              <div 
                className="relative transform origin-top-left transition-transform"
                style={{ transform: `scale(${zoom})` }}
              >
                <img 
                  src={previewImage} 
                  alt="Anteprima CV" 
                  className="max-w-none"
                />
                
                {/* Istruzioni drag-and-drop */}
                {sections.length > 0 && !selectedSection && (
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-blue-600/90 text-white px-4 py-2 rounded shadow-lg text-xs text-center z-50 max-w-[300px] pointer-events-none opacity-80">
                    <div className="font-medium mb-1">Riposiziona le sezioni del CV</div>
                    <p>Clicca e trascina le sezioni per riposizionarle prima della generazione del PDF</p>
                  </div>
                )}
                
                {/* Section markers */}
                {sections.map(section => (
                  <div
                    key={section.id}
                    id={`preview-section-${section.id}`}
                    className={`absolute border-2 ${
                      section.isDragging 
                        ? 'border-blue-600 bg-blue-200/30 shadow-lg' 
                        : selectedSection === section.id 
                          ? 'border-blue-500 bg-blue-100/20' 
                          : 'border-transparent hover:border-blue-300 hover:bg-blue-50/10'
                    } rounded cursor-move transition-all duration-150`}
                    style={{
                      top: `${section.top}px`,
                      left: `${section.left}px`,
                      width: `${section.width}px`,
                      height: `${section.height}px`,
                      zIndex: section.isDragging ? 50 : selectedSection === section.id ? 40 : 30
                    }}
                    onMouseDown={(e) => handleDragStart(e, section.id)}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!section.isDragging) {
                        setSelectedSection(section.id === selectedSection ? null : section.id);
                      }
                    }}
                  >
                    {/* Nome della sezione visibile durante la selezione */}
                    {(selectedSection === section.id || section.isDragging) && (
                      <div className="absolute -top-6 left-0 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-t pointer-events-none">
                        {section.name}
                      </div>
                    )}
                    
                    {/* Messaggio di feedback per il trascinamento */}
                    {selectedSection === section.id && !section.isDragging && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-blue-600/90 text-white px-3 py-1.5 rounded shadow-md text-xs pointer-events-none">
                          Trascina per spostare
                        </div>
                      </div>
                    )}
                    
                    {/* Handle per spostamento */}
                    <div className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center text-blue-500 opacity-70 hover:opacity-100">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-400">Nessuna anteprima disponibile</p>
              </div>
            )}
          </div>
          
          {/* Controls */}
          <div className="w-full md:w-64 flex-shrink-0 flex flex-col">
            <Tabs defaultValue="controls">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="controls">Controlli</TabsTrigger>
                <TabsTrigger value="sections">Sezioni</TabsTrigger>
              </TabsList>
              
              <TabsContent value="controls" className="space-y-4 p-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Zoom</label>
                  <Slider
                    value={[zoom * 100]}
                    min={40}
                    max={100}
                    step={5}
                    onValueChange={(values) => setZoom(values[0] / 100)}
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">40%</span>
                    <span className="text-xs text-gray-500">{zoom * 100}%</span>
                    <span className="text-xs text-gray-500">100%</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Orientamento</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      type="button"
                      variant={pdfOrientation === 'portrait' ? 'default' : 'outline'}
                      onClick={() => setPdfOrientation('portrait')}
                      className="h-auto py-1"
                    >
                      Verticale
                    </Button>
                    <Button
                      type="button"
                      variant={pdfOrientation === 'landscape' ? 'default' : 'outline'}
                      onClick={() => setPdfOrientation('landscape')}
                      className="h-auto py-1"
                    >
                      Orizzontale
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Pagine</label>
                  <div className="flex items-center justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={currentPage <= 1}
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    >
                      Precedente
                    </Button>
                    
                    <span className="text-sm">
                      {currentPage} / {pageCount}
                    </span>
                    
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={currentPage >= pageCount}
                      onClick={() => setCurrentPage(prev => Math.min(pageCount, prev + 1))}
                    >
                      Successiva
                    </Button>
                  </div>
                </div>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={resetPositions}
                  className="w-full"
                >
                  Ripristina posizioni
                </Button>
              </TabsContent>
              
              <TabsContent value="sections" className="h-[300px] overflow-y-auto">
                {sections.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    Nessuna sezione rilevata
                  </div>
                ) : (
                  <div className="space-y-3 p-4">
                    <div className="bg-blue-50 p-3 rounded-md border border-blue-100 mb-4">
                      <div className="flex items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium text-blue-700">Come riposizionare le sezioni</span>
                      </div>
                      <p className="text-sm text-blue-600">Clicca e trascina direttamente le sezioni nell'anteprima per riposizionarle. Ogni sezione può essere spostata liberamente prima di generare il PDF.</p>
                    </div>
                    
                    <h3 className="font-medium text-sm text-gray-700 mb-2">Sezioni rilevate:</h3>
                    
                    {sections.map(section => (
                      <div 
                        key={section.id}
                        className={`p-3 border rounded-md cursor-pointer transition-colors ${
                          selectedSection === section.id 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-blue-200'
                        }`}
                        onClick={() => setSelectedSection(section.id === selectedSection ? null : section.id)}
                      >
                        <div className="flex justify-between items-center">
                          <div className="font-medium text-sm">{section.name}</div>
                          
                          <div className="flex items-center space-x-1">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 p-0 rounded-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSections(prev => 
                                  prev.map(s => 
                                    s.id === section.id 
                                      ? { ...s, top: s.originalTop, left: s.originalLeft } 
                                      : s
                                  )
                                );
                              }}
                              title="Ripristina posizione originale"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                            </Button>
                          </div>
                        </div>
                        
                        {selectedSection === section.id && (
                          <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500">
                            <p>Posizione attuale: X={Math.round(section.left)}, Y={Math.round(section.top)}</p>
                            <p className="mt-1">
                              <span className="text-blue-500">Suggerimento:</span> Clicca e trascina questa sezione direttamente nell'anteprima
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Annulla
          </Button>
          <Button type="button" onClick={downloadPDF} disabled={!previewImage || isLoadingPreview}>
            Scarica PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewDownloadDialog;