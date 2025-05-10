import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Experience } from "@shared/schema";
import { Plus, Trash2 } from "lucide-react";

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
  
  const handleInputChange = (id: string, field: keyof Experience, value: string | boolean) => {
    const experience = experiences.find(exp => exp.id === id);
    if (experience) {
      updateExperience({
        ...experience,
        [field]: value,
      });
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
                    <Textarea
                      id={`description-${experience.id}`}
                      value={experience.description}
                      onChange={(e) => handleInputChange(experience.id, 'description', e.target.value)}
                      placeholder="Descrivi le tue responsabilità e risultati"
                      rows={3}
                    />
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
