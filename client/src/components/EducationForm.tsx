import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Education } from "@shared/schema";
import { Plus, Trash2 } from "lucide-react";

interface EducationFormProps {
  education: Education[];
  addEducation: () => void;
  updateEducation: (education: Education) => void;
  removeEducation: (id: string) => void;
}

const EducationForm = ({
  education,
  addEducation,
  updateEducation,
  removeEducation
}: EducationFormProps) => {
  
  const handleInputChange = (id: string, field: keyof Education, value: string | boolean) => {
    const educationItem = education.find(edu => edu.id === id);
    if (educationItem) {
      updateEducation({
        ...educationItem,
        [field]: value,
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg">Formazione</CardTitle>
        <Button 
          onClick={addEducation}
          size="sm"
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="mr-1 h-4 w-4" /> Aggiungi
        </Button>
      </CardHeader>
      <CardContent>
        {education.length === 0 ? (
          <div className="text-center py-8 border border-dashed border-gray-300 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
            <p className="text-gray-500 mb-2">Nessuna formazione aggiunta</p>
            <Button 
              onClick={addEducation}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="mr-1 h-4 w-4" /> Aggiungi formazione
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.id} className="border border-gray-200 rounded-md p-4 bg-gray-50">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-md font-medium">
                    {edu.institution || 'Nuova formazione'}
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeEducation(edu.id)}
                    className="text-gray-500 hover:text-red-500 h-8 w-8"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`institution-${edu.id}`}>Istituto</Label>
                    <Input
                      id={`institution-${edu.id}`}
                      value={edu.institution}
                      onChange={(e) => handleInputChange(edu.id, 'institution', e.target.value)}
                      placeholder="Nome dell'università o scuola"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`degree-${edu.id}`}>Titolo di studio</Label>
                    <Input
                      id={`degree-${edu.id}`}
                      value={edu.degree}
                      onChange={(e) => handleInputChange(edu.id, 'degree', e.target.value)}
                      placeholder="Es. Laurea in Informatica"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`eduStartDate-${edu.id}`}>Data inizio</Label>
                      <Input
                        id={`eduStartDate-${edu.id}`}
                        type="date"
                        value={edu.startDate}
                        onChange={(e) => handleInputChange(edu.id, 'startDate', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`eduEndDate-${edu.id}`}>Data fine</Label>
                      <div className="flex flex-col space-y-2">
                        <Input
                          id={`eduEndDate-${edu.id}`}
                          type="date"
                          value={edu.endDate}
                          onChange={(e) => handleInputChange(edu.id, 'endDate', e.target.value)}
                          disabled={edu.current}
                        />
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`eduCurrent-${edu.id}`}
                            checked={edu.current}
                            onCheckedChange={(checked) => handleInputChange(edu.id, 'current', !!checked)}
                          />
                          <Label 
                            htmlFor={`eduCurrent-${edu.id}`}
                            className="text-sm font-normal"
                          >
                            In corso
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`eduDescription-${edu.id}`}>Descrizione</Label>
                    <Textarea
                      id={`eduDescription-${edu.id}`}
                      value={edu.description}
                      onChange={(e) => handleInputChange(edu.id, 'description', e.target.value)}
                      placeholder="Descrivi il percorso di studi e eventuali specializzazioni"
                      rows={2}
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

export default EducationForm;
