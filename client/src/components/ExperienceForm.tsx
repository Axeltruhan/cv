import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Experience } from "@shared/schema";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";

interface ExperienceFormProps {
  experiences: Experience[];
  addExperience: () => void;
  updateExperience: (experience: Experience) => void;
  removeExperience: (id: string) => void;
}

const ExperienceForm = ({
  experiences,
  addExperience,
  updateExperience,
  removeExperience
}: ExperienceFormProps) => {
  const { toast } = useToast();
  const [generatingDescriptions, setGeneratingDescriptions] = useState<Record<string, boolean>>({});
  
  const handleInputChange = (id: string, field: keyof Experience, value: string | boolean) => {
    const experience = experiences.find(exp => exp.id === id);
    if (experience) {
      updateExperience({
        ...experience,
        [field]: value,
      });
    }
  };
  
  const handleGenerateDescription = async (id: string) => {
    const experience = experiences.find(exp => exp.id === id);
    
    if (!experience || !experience.position) {
      toast({
        title: "Posizione mancante",
        description: "Inserisci una posizione per generare la descrizione.",
        variant: "destructive"
      });
      return;
    }
    
    setGeneratingDescriptions(prev => ({ ...prev, [id]: true }));
    
    try {
      const response = await apiRequest('get', `/api/generate-description?title=${encodeURIComponent(experience.position)}`, undefined);
      const data = await response.json();
      
      updateExperience({
        ...experience,
        description: data.description
      });
      
      toast({
        title: "Descrizione generata",
        description: "La descrizione delle mansioni è stata generata con successo.",
      });
    } catch (error) {
      console.error("Error generating description:", error);
      toast({
        title: "Errore",
        description: "Impossibile generare la descrizione. Riprova più tardi.",
        variant: "destructive"
      });
    } finally {
      setGeneratingDescriptions(prev => ({ ...prev, [id]: false }));
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg">Esperienze Lavorative</CardTitle>
        <Button 
          onClick={addExperience}
          size="sm"
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="mr-1 h-4 w-4" /> Aggiungi
        </Button>
      </CardHeader>
      <CardContent>
        {experiences.length === 0 ? (
          <div className="text-center py-8 border border-dashed border-gray-300 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-500 mb-2">Nessuna esperienza lavorativa aggiunta</p>
            <Button 
              onClick={addExperience}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="mr-1 h-4 w-4" /> Aggiungi esperienza
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {experiences.map((experience) => (
              <div key={experience.id} className="border border-gray-200 rounded-md p-4 bg-gray-50">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-md font-medium">
                    {experience.company || 'Nuova esperienza'}
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeExperience(experience.id)}
                    className="text-gray-500 hover:text-red-500 h-8 w-8"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`company-${experience.id}`}>Azienda</Label>
                    <Input
                      id={`company-${experience.id}`}
                      value={experience.company}
                      onChange={(e) => handleInputChange(experience.id, 'company', e.target.value)}
                      placeholder="Nome dell'azienda"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`position-${experience.id}`}>Posizione</Label>
                    <Input
                      id={`position-${experience.id}`}
                      value={experience.position}
                      onChange={(e) => handleInputChange(experience.id, 'position', e.target.value)}
                      placeholder="Titolo della posizione"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`startDate-${experience.id}`}>Data inizio</Label>
                      <Input
                        id={`startDate-${experience.id}`}
                        type="date"
                        value={experience.startDate}
                        onChange={(e) => handleInputChange(experience.id, 'startDate', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`endDate-${experience.id}`}>Data fine</Label>
                      <div className="flex flex-col space-y-2">
                        <Input
                          id={`endDate-${experience.id}`}
                          type="date"
                          value={experience.endDate}
                          onChange={(e) => handleInputChange(experience.id, 'endDate', e.target.value)}
                          disabled={experience.current}
                        />
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`current-${experience.id}`}
                            checked={experience.current}
                            onCheckedChange={(checked) => handleInputChange(experience.id, 'current', !!checked)}
                          />
                          <Label 
                            htmlFor={`current-${experience.id}`}
                            className="text-sm font-normal"
                          >
                            Attuale
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`description-${experience.id}`}>Descrizione</Label>
                    <div className="flex items-start space-x-2">
                      <Textarea
                        id={`description-${experience.id}`}
                        value={experience.description}
                        onChange={(e) => handleInputChange(experience.id, 'description', e.target.value)}
                        placeholder="Descrivi le tue responsabilità e risultati"
                        rows={3}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        onClick={() => handleGenerateDescription(experience.id)}
                        title="Genera automaticamente una descrizione basata sulla posizione"
                        disabled={!experience.position || generatingDescriptions[experience.id]}
                      >
                        {generatingDescriptions[experience.id] ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
                            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide">
                            <path d="M17 7.8A6 6 0 0 0 6 7.8c-2.7 3.5-2 8.4.7 10.7.2.2.3.4.3.6 0 1-.8 1.9-1.9 1.9H5a2 2 0 0 0-2 2c0 .6.4 1 1 1h16c.6 0 1-.4 1-1a2 2 0 0 0-2-2h-.1c-1 0-1.9-.8-1.9-1.9 0-.2.1-.4.3-.6 2.7-2.3 3.3-7.2.7-10.7z"/>
                            <path d="m4.5 16 2.5-4.5"/>
                            <path d="M20 7.5c-3 1-5.5.5-8-1"/>
                            <path d="M7.5 7.7C8.8 9.2 10 14 10 17"/>
                            <path d="m13 17 3 5"/>
                            <path d="M16 18h-6"/>
                          </svg>
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Clicca sull'icona per generare automaticamente una descrizione basata sulla posizione
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExperienceForm;
