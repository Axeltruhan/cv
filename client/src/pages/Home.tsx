import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import PersonalInfoForm from "@/components/PersonalInfoForm";
import ExperienceForm from "@/components/ExperienceForm";
import EducationForm from "@/components/EducationForm";
import SkillsForm from "@/components/SkillsForm";
import LanguagesForm from "@/components/LanguagesForm";
import DrivingInfoForm from "@/components/DrivingInfoForm";
import CVPreview from "@/components/CVPreview";
import { useToast } from "@/hooks/use-toast";
import { PersonalInfo, Experience, Education, Skill, Language } from "@shared/schema";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const { toast } = useToast();
  
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    description: "",
    photo: "",
    drivingLicense: "",
    hasCar: false,
    languages: []
  });
  
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  
  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: uuidv4(),
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        current: false,
        description: ""
      }
    ]);
  };
  
  const updateExperience = (updatedExperience: Experience) => {
    setExperiences(experiences.map(exp => 
      exp.id === updatedExperience.id ? updatedExperience : exp
    ));
  };
  
  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };
  
  const addEducation = () => {
    setEducation([
      ...education,
      {
        id: uuidv4(),
        institution: "",
        degree: "",
        startDate: "",
        endDate: "",
        current: false,
        description: ""
      }
    ]);
  };
  
  const updateEducation = (updatedEducation: Education) => {
    setEducation(education.map(edu => 
      edu.id === updatedEducation.id ? updatedEducation : edu
    ));
  };
  
  const removeEducation = (id: string) => {
    setEducation(education.filter(edu => edu.id !== id));
  };
  
  const addSkill = () => {
    setSkills([
      ...skills,
      {
        id: uuidv4(),
        name: "",
        level: 3
      }
    ]);
  };
  
  const updateSkill = (updatedSkill: Skill) => {
    setSkills(skills.map(skill => 
      skill.id === updatedSkill.id ? updatedSkill : skill
    ));
  };
  
  const removeSkill = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };
  
  const addLanguage = () => {
    setPersonalInfo({
      ...personalInfo,
      languages: [
        ...personalInfo.languages,
        {
          id: uuidv4(),
          name: "",
          level: "B1"
        }
      ]
    });
  };

  const updateLanguage = (updatedLanguage: Language) => {
    setPersonalInfo({
      ...personalInfo,
      languages: personalInfo.languages.map(lang => 
        lang.id === updatedLanguage.id ? updatedLanguage : lang
      )
    });
  };
  
  const removeLanguage = (id: string) => {
    setPersonalInfo({
      ...personalInfo,
      languages: personalInfo.languages.filter(lang => lang.id !== id)
    });
  };
  
  const downloadCV = async () => {
    const cvElement = document.getElementById('cv-preview');
    
    if (!cvElement) {
      toast({
        title: "Errore",
        description: "Impossibile generare il PDF. Elemento CV non trovato.",
        variant: "destructive"
      });
      return;
    }
    
    // Controlla che ci siano dati da includere nel CV
    if (!personalInfo.firstName) {
      toast({
        title: "Dati incompleti",
        description: "Inserisci almeno il tuo nome per generare il CV.",
        variant: "destructive"
      });
      return;
    }
    
    // Toast per indicare che la generazione è in corso
    const loadingToast = toast({
      title: "Preparazione",
      description: "Generazione del PDF in corso...",
    });
    
    try {
      // Dimensioni della pagina A4
      const pageWidth = 210; // mm
      const pageHeight = 297; // mm
      
      // Imposta margini e bordi
      const marginX = 8; // mm
      const marginY = 8; // mm
      
      // Crea il PDF usando jsPDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });
      
      // Modifichiamo temporaneamente lo stile dell'elemento per ottenere dimensioni corrette
      const originalStyle = {
        maxHeight: cvElement.style.maxHeight,
        overflowY: cvElement.style.overflowY,
        height: cvElement.style.height,
        border: cvElement.style.border,
        padding: cvElement.style.padding
      };
      
      // Rimuovi limiti di altezza per la generazione del PDF
      cvElement.style.maxHeight = "none";
      cvElement.style.overflowY = "visible";
      cvElement.style.height = "auto";
      cvElement.style.padding = "8mm";
      
      // Prendiamo le sezioni principali del CV
      // Il contenitore interno del CV
      const cvContainer = cvElement.querySelector('.p-6.border.rounded-md.bg-white') as HTMLElement;
      
      if (!cvContainer) {
        console.error("Errore: Impossibile trovare il contenitore del CV");
        throw new Error("Struttura del CV non valida");
      }
      
      // Trova l'intestazione (il primo elemento)
      const header = cvContainer.children[0] as HTMLElement;
      
      // Prendi tutte le altre sezioni (i figli successivi del contenitore)
      const sections = [] as HTMLElement[];
      for (let i = 1; i < cvContainer.children.length; i++) {
        sections.push(cvContainer.children[i] as HTMLElement);
      }
      
      console.log(`Trovate ${sections.length} sezioni nel CV`);
      
      // Cloniamo il container del PDF per mantenere tutti gli stili
      const pdfContent = document.createElement('div');
      pdfContent.style.position = 'absolute';
      pdfContent.style.left = '-9999px';
      pdfContent.style.backgroundColor = 'white';
      pdfContent.style.width = `${pageWidth - (marginX * 2)}mm`;
      pdfContent.style.border = '0.5mm solid #ccc';
      pdfContent.style.padding = '4mm';
      pdfContent.style.boxSizing = 'border-box';
      document.body.appendChild(pdfContent);
      
      // Funzione per generare una pagina
      const renderPage = async (elements: HTMLElement[], isFirstPage: boolean = false) => {
        try {
          // Pulisci il contenitore
          pdfContent.innerHTML = '';
          
          if (!elements || elements.length === 0) {
            console.warn('No elements to render for page');
            return;
          }
          
          // Aggiungi gli elementi alla pagina
          elements.forEach(el => {
            if (el) {
              const clone = el.cloneNode(true) as HTMLElement;
              pdfContent.appendChild(clone);
            }
          });
          
          // Assicurati che il contenuto abbia dimensioni corrette
          await new Promise(resolve => setTimeout(resolve, 100));
          
          // Genera il canvas per la pagina
          const canvas = await html2canvas(pdfContent, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: "#ffffff",
            logging: false,
            onclone: (doc) => {
              // Assicurati che le immagini siano completamente caricate
              const images = doc.getElementsByTagName('img');
              for (let i = 0; i < images.length; i++) {
                images[i].setAttribute('crossorigin', 'anonymous');
              }
            }
          });
          
          // Se non è la prima pagina, aggiungi una nuova pagina
          if (!isFirstPage) {
            pdf.addPage();
          }
          
          // Converti il canvas in immagine
          const imgData = canvas.toDataURL('image/jpeg', 0.92);
          
          // Calcola le dimensioni dell'immagine mantenendo le proporzioni
          const imgWidth = pageWidth - (marginX * 2);
          const imgHeight = canvas.height * imgWidth / canvas.width;
          
          // Aggiungi l'immagine al PDF
          pdf.addImage(imgData, 'JPEG', marginX, marginY, imgWidth, imgHeight);
        } catch (err) {
          console.error('Error rendering page:', err);
          throw new Error('Errore durante la generazione della pagina');
        }
      };
      
      // Raggruppare le sezioni in pagine ottimizzate
      const generateOptimizedPages = async () => {
        try {
          // Log per debug
          console.log("Header trovato:", !!header);
          console.log("Numero di sezioni trovate:", sections.length);
          
          // Verifica che tutti gli elementi necessari siano presenti
          if (!header) {
            console.warn("Header non trovato nel CV");
            throw new Error("Intestazione CV non trovata");
          }
          
          if (!Array.isArray(sections)) {
            console.warn("Array di sezioni non valido");
            throw new Error("Struttura del CV non valida");
          }
          
          if (sections.length === 0) {
            console.warn("Nessuna sezione trovata nel CV");
            // Continua comunque con solo l'header
            console.log("Generazione PDF con solo intestazione")
          }
          
          // Prima pagina: sempre l'intestazione
          const firstPageElements: HTMLElement[] = [header];
          let currentPage: HTMLElement[] = [];
          let currentPageHeight = header.offsetHeight || 0;
          const maxPageHeight = 275; // Altezza massima per pagina in mm (A4 - margini)
          
          console.log(`Inizio generazione PDF con ${sections.length} sezioni`);
          
          // Distribuisci le sezioni nelle pagine
          for (const section of sections) {
            if (!section) continue;
            
            const sectionHeight = section.offsetHeight || 0;
            
            // Se la sezione è troppo grande per una pagina, mettila da sola
            if (sectionHeight > maxPageHeight) {
              // Se ci sono elementi nella pagina corrente, finalizza la pagina
              if (currentPage.length > 0) {
                firstPageElements.push(...currentPage);
                await renderPage(firstPageElements, true);
                currentPage = [];
                firstPageElements.length = 0; // Svuota l'array
              } else if (firstPageElements.length > 1) {
                await renderPage(firstPageElements, true);
                firstPageElements.length = 0; // Svuota l'array
              }
              
              // Metti la sezione grande in una pagina dedicata
              await renderPage([section], firstPageElements.length === 0);
              currentPageHeight = 0;
              continue;
            }
            
            // Se aggiungere questa sezione supera l'altezza della pagina
            if (currentPageHeight + sectionHeight > maxPageHeight) {
              // Finalizza la pagina corrente
              if (firstPageElements.length > 0) {
                firstPageElements.push(...currentPage);
                await renderPage(firstPageElements, true);
                firstPageElements.length = 0;
              } else if (currentPage.length > 0) {
                await renderPage(currentPage, false);
              }
              
              // Inizia una nuova pagina con questa sezione
              currentPage = [section];
              currentPageHeight = sectionHeight;
            } else {
              // Aggiungi la sezione alla pagina corrente
              currentPage.push(section);
              currentPageHeight += sectionHeight;
            }
          }
          
          // Finalizza l'ultima pagina se ci sono elementi rimanenti
          if (currentPage.length > 0) {
            if (firstPageElements.length > 0) {
              firstPageElements.push(...currentPage);
              await renderPage(firstPageElements, true);
            } else {
              await renderPage(currentPage, false);
            }
          } else if (firstPageElements.length > 0) {
            await renderPage(firstPageElements, true);
          }
          
          console.log("Generazione PDF completata con successo");
        } catch (err) {
          console.error("Errore durante la generazione delle pagine:", err);
          throw new Error("Errore durante la generazione delle pagine");
        }
      };
      
      // Genera le pagine del PDF
      await generateOptimizedPages();
      
      // Salva il PDF
      pdf.save(`CV_${personalInfo.firstName}_${personalInfo.lastName || 'CV'}.pdf`);
      
      // Ripristina gli stili originali
      cvElement.style.maxHeight = originalStyle.maxHeight;
      cvElement.style.overflowY = originalStyle.overflowY;
      cvElement.style.height = originalStyle.height;
      cvElement.style.border = originalStyle.border;
      cvElement.style.padding = originalStyle.padding;
      
      // Rimuovi l'elemento temporaneo
      document.body.removeChild(pdfContent);
      
      toast({
        title: "Completato",
        description: "Il tuo CV è stato scaricato correttamente.",
      });
    } catch (error) {
      console.error("PDF generation error:", error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante la generazione del PDF.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-primary flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Generatore Curriculum Interattivo
          </h1>
          <Button 
            onClick={downloadCV} 
            className="bg-primary hover:bg-primary/90 text-white"
          >
            <Download className="mr-2 h-4 w-4" /> Scarica CV
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Forms */}
          <div className="space-y-6">
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="info">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Informazioni
                </TabsTrigger>
                <TabsTrigger value="experience">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Esperienze
                </TabsTrigger>
                <TabsTrigger value="education">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                  Formazione
                </TabsTrigger>
                <TabsTrigger value="skills">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Competenze
                </TabsTrigger>
                <TabsTrigger value="languages">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  Lingue
                </TabsTrigger>
                <TabsTrigger value="driving">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Patente
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="info">
                <PersonalInfoForm 
                  personalInfo={personalInfo} 
                  setPersonalInfo={setPersonalInfo} 
                />
              </TabsContent>
              
              <TabsContent value="experience">
                <ExperienceForm 
                  experiences={experiences}
                  addExperience={addExperience}
                  updateExperience={updateExperience}
                  removeExperience={removeExperience}
                />
              </TabsContent>
              
              <TabsContent value="education">
                <EducationForm 
                  education={education}
                  addEducation={addEducation}
                  updateEducation={updateEducation}
                  removeEducation={removeEducation}
                />
              </TabsContent>
              
              <TabsContent value="skills">
                <SkillsForm 
                  skills={skills}
                  experiences={experiences}
                  addSkill={addSkill}
                  updateSkill={updateSkill}
                  removeSkill={removeSkill}
                />
              </TabsContent>
              
              <TabsContent value="languages">
                <LanguagesForm 
                  languages={personalInfo.languages}
                  addLanguage={addLanguage}
                  updateLanguage={updateLanguage}
                  removeLanguage={removeLanguage}
                />
              </TabsContent>
              
              <TabsContent value="driving">
                <DrivingInfoForm 
                  personalInfo={personalInfo}
                  setPersonalInfo={setPersonalInfo}
                />
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right Column - CV Preview */}
          <div className="lg:sticky lg:top-8 self-start">
            <CVPreview
              personalInfo={personalInfo}
              experiences={experiences}
              education={education}
              skills={skills}
            />
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Generatore Curriculum Interattivo - Creato con 
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mx-1 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
