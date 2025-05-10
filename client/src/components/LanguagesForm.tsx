import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Language } from "@shared/schema";
import { v4 as uuidv4 } from 'uuid';
import { Trash2 } from "lucide-react";

interface LanguagesFormProps {
  languages: Language[];
  addLanguage: () => void;
  updateLanguage: (language: Language) => void;
  removeLanguage: (id: string) => void;
}

const LanguagesForm = ({
  languages,
  addLanguage,
  updateLanguage,
  removeLanguage,
}: LanguagesFormProps) => {
  const handleLevelChange = (id: string, level: number) => {
    const language = languages.find(lang => lang.id === id);
    if (language) {
      updateLanguage({ ...language, level });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
          </svg>
          Lingue Conosciute
        </CardTitle>
      </CardHeader>
      <CardContent>
        {languages.map((language) => (
          <div key={language.id} className="mb-6 p-4 border border-gray-200 rounded-md">
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between">
                <Label htmlFor={`language-name-${language.id}`} className="text-base">
                  Lingua
                </Label>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-red-500 hover:text-red-700"
                  onClick={() => removeLanguage(language.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Input
                id={`language-name-${language.id}`}
                value={language.name || ''}
                onChange={(e) => updateLanguage({ ...language, name: e.target.value })}
                placeholder="Es. Italiano, Inglese, Francese..."
              />
              
              <div className="mt-4">
                <Label>Livello di conoscenza</Label>
                <div className="flex items-center space-x-2 mt-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => handleLevelChange(language.id, level)}
                      className={`w-8 h-8 rounded-full transition-colors ${
                        level <= language.level
                          ? 'bg-primary text-white'
                          : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <Button 
          type="button" 
          variant="outline" 
          onClick={addLanguage}
          className="w-full mt-2"
        >
          + Aggiungi Lingua
        </Button>
      </CardContent>
    </Card>
  );
};

export default LanguagesForm;