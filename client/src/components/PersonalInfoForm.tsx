import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { PersonalInfo } from "@shared/schema";
import { WandSparkles, Upload, Trash2 } from "lucide-react";

interface PersonalInfoFormProps {
  personalInfo: PersonalInfo;
  setPersonalInfo: (info: PersonalInfo) => void;
}

const PersonalInfoForm = ({ personalInfo, setPersonalInfo }: PersonalInfoFormProps) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) return;
    
    if (!file.type.match('image.*')) {
      toast({
        title: "Formato non valido",
        description: "Per favore, seleziona un file immagine valido.",
        variant: "destructive"
      });
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File troppo grande",
        description: "La dimensione massima consentita è 5MB.",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPersonalInfo({ ...personalInfo, photo: e.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  const generateDescription = async () => {
    setIsGenerating(true);
    
    try {
      // Generiamo una descrizione personale incentrata sulla persona e non sul ruolo professionale
      const response = await apiRequest('get', `/api/generate-description?isPersonal=true`, undefined);
      const data = await response.json();
      
      setPersonalInfo({ ...personalInfo, description: data.description });
      
      toast({
        title: "Descrizione generata",
        description: "La descrizione è stata generata con successo.",
      });
    } catch (error) {
      console.error("Error generating description:", error);
      toast({
        title: "Errore",
        description: "Impossibile generare la descrizione. Riprova più tardi.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Informazioni Personali</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nome</Label>
              <Input
                id="firstName"
                name="firstName"
                value={personalInfo.firstName}
                onChange={handleInputChange}
                placeholder="Mario"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Cognome</Label>
              <Input
                id="lastName"
                name="lastName"
                value={personalInfo.lastName}
                onChange={handleInputChange}
                placeholder="Rossi"
              />
            </div>
          </div>



          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={personalInfo.email}
                onChange={handleInputChange}
                placeholder="mario.rossi@esempio.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefono</Label>
              <Input
                id="phone"
                name="phone"
                value={personalInfo.phone}
                onChange={handleInputChange}
                placeholder="+39 123 456 7890"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Indirizzo</Label>
            <Input
              id="address"
              name="address"
              value={personalInfo.address}
              onChange={handleInputChange}
              placeholder="Via Roma 123, Milano, 20100"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Su di me</Label>
            <div className="flex items-start space-x-2">
              <Textarea
                id="description"
                name="description"
                value={personalInfo.description}
                onChange={handleInputChange}
                placeholder="Inserisci una breve descrizione su di te"
                rows={4}
                className="flex-1"
              />
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={generateDescription}
                disabled={isGenerating}
                title="Genera automaticamente una descrizione"
              >
                <WandSparkles className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Clicca sull'icona per generare automaticamente una descrizione
            </p>
          </div>

          <div className="space-y-2">
            <Label>Foto Profilo</Label>
            <div className="flex items-center space-x-4">
              <div 
                className={`w-24 h-24 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center overflow-hidden ${personalInfo.photo ? 'border-0' : ''}`}
              >
                {personalInfo.photo ? (
                  <img src={personalInfo.photo} alt="Foto profilo" className="w-full h-full object-cover" />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )}
              </div>
              
              <div className="flex-1">
                <input 
                  type="file" 
                  id="profilePhoto" 
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
                
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    onClick={() => document.getElementById('profilePhoto')?.click()}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Upload className="mr-2 h-4 w-4" /> Carica foto
                  </Button>
                  
                  {personalInfo.photo && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setPersonalInfo({ ...personalInfo, photo: "" })}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Rimuovi
                    </Button>
                  )}
                </div>
                
                <p className="text-xs text-muted-foreground mt-1">
                  Carica una foto professionale (formato .jpg, .png)
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoForm;
