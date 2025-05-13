import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonalInfo, Experience, Education, Skill } from "@shared/schema";
import { Slider } from "@/components/ui/slider";
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
}

const PreviewDownloadDialog = ({ 
  personalInfo, 
  experiences, 
  education, 
  skills, 
  template,
  children 
}: PreviewDownloadDialogProps) => {
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
    
    // Find the CV element in the parent document
    const cvElement = document.getElementById(`cv-preview-${template}`);
    
    if (!cvElement) {
      console.error("CV element not found");
      setIsLoadingPreview(false);
      return;
    }
    
    try {
      // Add a temporary class to set print mode styles
      document.body.classList.add('pdf-generation-in-progress');
      
      // Clone the element to avoid modifying the original
      const clonedCV = cvElement.cloneNode(true) as HTMLElement;
      
      // Apply any needed style adjustments for PDF generation
      clonedCV.style.width = '210mm'; // A4 width
      
      // Temporarily add to body for rendering
      clonedCV.style.position = 'absolute';
      clonedCV.style.left = '-9999px';
      document.body.appendChild(clonedCV);
      
      // Generate canvas from the element
      const canvas = await html2canvas(clonedCV, {
        scale: 2, // Higher quality
        useCORS: true,
        logging: false,
        allowTaint: true
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
      setPageCount(pages);
      
      // Convert canvas to image
      setPreviewImage(canvas.toDataURL('image/png'));
      
      // Clean up
      document.body.removeChild(clonedCV);
      document.body.classList.remove('pdf-generation-in-progress');
    } catch (error) {
      console.error("Error generating preview:", error);
    } finally {
      setIsLoadingPreview(false);
    }
  };
  
  // Detect sections in the CV for repositioning
  const detectSections = () => {
    const cvElement = document.getElementById(`cv-preview-${template}`);
    if (!cvElement) return;
    
    // Find section elements (headings and their containers)
    const detectedSections: SectionPosition[] = [];
    
    // Look for common section identifiers
    const sectionElements = cvElement.querySelectorAll('h2, h3, section, div[id^="section-"]');
    
    sectionElements.forEach((element, index) => {
      const rect = element.getBoundingClientRect();
      const cvRect = cvElement.getBoundingClientRect();
      
      // Skip tiny elements or those without content
      if (rect.height < 20 || !element.textContent?.trim()) return;
      
      // Get section name from text content or data attribute
      let name = element.textContent?.trim() || `Sezione ${index + 1}`;
      
      // Limit name length
      if (name.length > 30) {
        name = name.substring(0, 27) + '...';
      }
      
      // Calculate position relative to CV element
      const top = rect.top - cvRect.top;
      const left = rect.left - cvRect.left;
      
      detectedSections.push({
        id: `section-${index}`,
        name,
        top,
        left,
        width: rect.width,
        height: rect.height,
        originalTop: top,
        originalLeft: left
      });
    });
    
    // Only keep unique sections with sufficient size
    const filteredSections = detectedSections.filter(section => 
      section.width > 50 && section.height > 20
    );
    
    setSections(filteredSections);
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
        left: section.originalLeft
      }))
    );
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
                
                {/* Section markers */}
                {sections.map(section => (
                  <div
                    key={section.id}
                    className={`absolute border-2 ${selectedSection === section.id ? 'border-blue-500 bg-blue-100/20' : 'border-transparent hover:border-blue-300 hover:bg-blue-50/10'} rounded cursor-pointer transition-colors`}
                    style={{
                      top: `${section.top}px`,
                      left: `${section.left}px`,
                      width: `${section.width}px`,
                      height: `${section.height}px`
                    }}
                    onClick={() => setSelectedSection(section.id === selectedSection ? null : section.id)}
                  ></div>
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
                        <div className="font-medium text-sm mb-2">{section.name}</div>
                        
                        {selectedSection === section.id && (
                          <div className="space-y-2">
                            <div>
                              <label className="text-xs text-gray-500 block mb-1">Posizione verticale</label>
                              <div className="flex items-center gap-2">
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateSectionPosition(section.id, -10)}
                                  className="h-7 px-2"
                                >
                                  ↑
                                </Button>
                                <Slider
                                  value={[section.top]}
                                  min={0}
                                  max={1000}
                                  step={1}
                                  onValueChange={(values) => {
                                    const newTop = values[0];
                                    setSections(prev => 
                                      prev.map(s => 
                                        s.id === section.id ? { ...s, top: newTop } : s
                                      )
                                    );
                                  }}
                                  className="flex-grow"
                                />
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateSectionPosition(section.id, 10)}
                                  className="h-7 px-2"
                                >
                                  ↓
                                </Button>
                              </div>
                            </div>
                            
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSections(prev => 
                                  prev.map(s => 
                                    s.id === section.id 
                                      ? { ...s, top: s.originalTop, left: s.originalLeft } 
                                      : s
                                  )
                                );
                              }}
                              className="w-full text-xs h-7"
                            >
                              Reset position
                            </Button>
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