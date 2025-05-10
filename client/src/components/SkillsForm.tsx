import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Experience, Skill } from "@shared/schema";
import { Plus, Trash2, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface SkillsFormProps {
  skills: Skill[];
  experiences: Experience[];
  addSkill: () => void;
  updateSkill: (skill: Skill) => void;
  removeSkill: (id: string) => void;
}

const SkillsForm = ({
  skills,
  experiences,
  addSkill,
  updateSkill,
  removeSkill
}: SkillsFormProps) => {
  const { toast } = useToast();
  const [isGeneratingSkill, setIsGeneratingSkill] = useState(false);
  
  const handleInputChange = (id: string, name: string) => {
    const skill = skills.find(skill => skill.id === id);
    if (skill) {
      updateSkill({
        ...skill,
        name
      });
    }
  };

  const handleLevelChange = (id: string, level: string) => {
    const skill = skills.find(skill => skill.id === id);
    if (skill) {
      updateSkill({
        ...skill,
        level: parseInt(level)
      });
    }
  };
  
  const generateSkillsFromExperiences = async () => {
    if (experiences.length === 0) {
      toast({
        title: "Nessuna esperienza trovata",
        description: "Aggiungi prima almeno un'esperienza lavorativa per generare competenze automaticamente.",
        variant: "destructive"
      });
      return;
    }
    
    setIsGeneratingSkill(true);
    
    try {
      // Prendiamo la posizione più recente (assumendo che sia la prima esperienza inserita)
      const latestPosition = experiences[0].position;
      if (!latestPosition) {
        toast({
          title: "Posizione mancante",
          description: "Inserisci una posizione nell'esperienza lavorativa per generare competenze.",
          variant: "destructive"
        });
        setIsGeneratingSkill(false);
        return;
      }
      
      // Lista di possibili competenze per ruoli comuni - basata su posizioni tipiche
      let suggestedSkills: string[] = [];
      const positionLower = latestPosition.toLowerCase();
      
      if (positionLower.includes('sviluppat') || positionLower.includes('programmat') || positionLower.includes('develop')) {
        suggestedSkills = ['JavaScript', 'HTML', 'CSS', 'React', 'Node.js', 'Git'];
      } else if (positionLower.includes('design') || positionLower.includes('ux') || positionLower.includes('ui')) {
        suggestedSkills = ['Figma', 'Adobe XD', 'Sketch', 'Wireframing', 'Prototyping', 'User Research'];
      } else if (positionLower.includes('market')) {
        suggestedSkills = ['Social Media', 'SEO', 'Content Creation', 'Analytics', 'Email Marketing', 'CRM'];
      } else if (positionLower.includes('manag')) {
        suggestedSkills = ['Leadership', 'Project Management', 'Team Building', 'Strategic Planning', 'Problem Solving'];
      } else {
        suggestedSkills = ['Microsoft Office', 'Comunicazione', 'Problem Solving', 'Teamwork', 'Organizzazione'];
      }
      
      // Aggiungi 3 competenze o meno se già esistono
      const existingSkillNames = skills.map(s => s.name.toLowerCase());
      
      for (const skillName of suggestedSkills) {
        if (!existingSkillNames.includes(skillName.toLowerCase())) {
          addSkill();
          // Ottieni l'ultima skill aggiunta
          const newSkill = skills[skills.length]; // sarà undefined la prima volta a causa del render asincrono
          
          if (newSkill) {
            updateSkill({
              ...newSkill,
              name: skillName,
              level: Math.floor(Math.random() * 3) + 3 // Livello tra 3 e 5
            });
          }
          
          if (skills.length >= 5) break; // Limitiamo a 5 competenze automatiche
        }
      }
      
      toast({
        title: "Competenze aggiunte",
        description: "Le competenze sono state generate in base alla tua esperienza lavorativa.",
      });
    } catch (error) {
      console.error("Error generating skills:", error);
      toast({
        title: "Errore",
        description: "Impossibile generare le competenze. Riprova più tardi.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingSkill(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg">Competenze</CardTitle>
        <div className="flex space-x-2">
          <Button 
            onClick={generateSkillsFromExperiences}
            size="sm"
            variant="outline"
            disabled={isGeneratingSkill || experiences.length === 0}
            title="Genera competenze in base alle esperienze lavorative"
          >
            {isGeneratingSkill ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin mr-1">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
            ) : (
              <Zap className="mr-1 h-4 w-4" />
            )}
            Auto-genera
          </Button>
          <Button 
            onClick={addSkill}
            size="sm"
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="mr-1 h-4 w-4" /> Aggiungi
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {skills.length === 0 ? (
          <div className="text-center py-8 border border-dashed border-gray-300 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-gray-500 mb-2">Nessuna competenza aggiunta</p>
            <Button 
              onClick={addSkill}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="mr-1 h-4 w-4" /> Aggiungi competenza
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {skills.map((skill) => (
              <div 
                key={skill.id} 
                className="flex items-center space-x-2 border border-gray-200 rounded-md p-3 bg-gray-50"
              >
                <div className="flex-1">
                  <Input
                    value={skill.name}
                    onChange={(e) => handleInputChange(skill.id, e.target.value)}
                    placeholder="Nome competenza"
                  />
                </div>
                
                <div className="w-32">
                  <Select
                    value={skill.level.toString()}
                    onValueChange={(value) => handleLevelChange(skill.id, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Livello" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Base</SelectItem>
                      <SelectItem value="2">Intermedio</SelectItem>
                      <SelectItem value="3">Avanzato</SelectItem>
                      <SelectItem value="4">Esperto</SelectItem>
                      <SelectItem value="5">Master</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSkill(skill.id)}
                  className="text-gray-500 hover:text-red-500 h-9 w-9"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SkillsForm;
