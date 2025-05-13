import { PersonalInfo, Experience, Education, Skill } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ClassicTemplate from "./templates/ClassicTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import Modern3DTemplate from "./templates/Modern3DTemplate";
import MinimalistTemplate from "./templates/MinimalistTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import AcademicTemplate from "./templates/AcademicTemplate";
import TechnicalTemplate from "./templates/TechnicalTemplate";

interface CVPreviewProps {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  template?: string;
}

const CVPreview = ({ personalInfo, experiences, education, skills, template = "classic" }: CVPreviewProps) => {
  // Funzione che renderizza il template appropriato
  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate 
          personalInfo={personalInfo} 
          experiences={experiences} 
          education={education} 
          skills={skills} 
        />;
      case "professional":
        return <ProfessionalTemplate 
          personalInfo={personalInfo} 
          experiences={experiences} 
          education={education} 
          skills={skills} 
        />;
      case "modern3d":
        return <Modern3DTemplate 
          personalInfo={personalInfo} 
          experiences={experiences} 
          education={education} 
          skills={skills} 
        />;
      case "minimalist":
        return <MinimalistTemplate 
          personalInfo={personalInfo} 
          experiences={experiences} 
          education={education} 
          skills={skills} 
        />;
      case "creative":
        return <CreativeTemplate 
          personalInfo={personalInfo} 
          experiences={experiences} 
          education={education} 
          skills={skills} 
        />;
      case "academic":
        return <AcademicTemplate 
          personalInfo={personalInfo} 
          experiences={experiences} 
          education={education} 
          skills={skills} 
        />;
      case "technical":
        return <TechnicalTemplate 
          personalInfo={personalInfo} 
          experiences={experiences} 
          education={education} 
          skills={skills} 
        />;
      case "classic":
      default:
        return <ClassicTemplate 
          personalInfo={personalInfo} 
          experiences={experiences} 
          education={education} 
          skills={skills} 
        />;
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Anteprima CV
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border border-gray-300 rounded-lg overflow-hidden" style={{ maxHeight: "80vh", overflowY: "auto" }} id="cv-preview">
          {renderTemplate()}
        </div>
      </CardContent>
    </Card>
  );
};

export default CVPreview;