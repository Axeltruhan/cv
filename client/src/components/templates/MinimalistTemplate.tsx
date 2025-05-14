import { formatDate } from "@/lib/utils/date-formatter";
import { PersonalInfo, Experience, Education, Skill } from "@shared/schema";

interface MinimalistTemplateProps {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
}

const MinimalistTemplate = ({ personalInfo, experiences, education, skills }: MinimalistTemplateProps) => {
  return (
    <div className="bg-white p-6 relative" id="cv-preview-minimalist" style={{ width: "100%" }}>
      {/* Header - Minimalista */}
      <div className="mb-8 pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-light text-gray-900 mb-1 tracking-wide uppercase">
          {personalInfo.firstName || 'Nome'} {personalInfo.lastName || 'Cognome'}
        </h1>
        
        {/* Informazioni di contatto su una singola riga */}
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-600">
          {personalInfo.email && (
            <span className="inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {personalInfo.email}
            </span>
          )}
          
          {personalInfo.phone && (
            <span className="inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {personalInfo.phone}
            </span>
          )}
          
          {personalInfo.address && (
            <span className="inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {personalInfo.address}
            </span>
          )}
          
          {(personalInfo.drivingLicense || personalInfo.hasCar) && (
            <span className="inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {personalInfo.drivingLicense}{personalInfo.hasCar ? (personalInfo.drivingLicense ? ', Automunito' : 'Automunito') : ''}
            </span>
          )}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ pageBreakInside: "avoid" }}>
        {/* Colonna Sinistra */}
        <div className="md:col-span-2 space-y-8">
          {/* Su di me */}
          {personalInfo.description && (
            <div style={{ pageBreakInside: "avoid" }}>
              <h2 className="text-sm font-normal text-gray-400 mb-3 uppercase tracking-widest">Su di me</h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {personalInfo.description}
              </p>
            </div>
          )}
          
          {/* Esperienze */}
          {experiences.length > 0 && (
            <div style={{ pageBreakInside: "avoid" }}>
              <h2 className="text-sm font-normal text-gray-400 mb-3 uppercase tracking-widest">Esperienze professionali</h2>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="pb-4" style={{ pageBreakInside: "avoid" }}>
                    <div className="flex justify-between mb-1 items-baseline">
                      <h3 className="text-md font-medium text-gray-800">{exp.position || 'Posizione'}</h3>
                      <span className="text-xs text-gray-500">
                        {formatDate(exp.startDate) || 'Data inizio'} — {exp.current ? 'Presente' : (formatDate(exp.endDate) || 'Data fine')}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-gray-600 mb-2">{exp.company || 'Azienda'}</div>
                    <p className="text-sm text-gray-600">{exp.description || 'Descrizione'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Formazione */}
          {education.length > 0 && (
            <div style={{ pageBreakInside: "avoid" }}>
              <h2 className="text-sm font-normal text-gray-400 mb-3 uppercase tracking-widest">Formazione</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="pb-4" style={{ pageBreakInside: "avoid" }}>
                    <div className="flex justify-between mb-1 items-baseline">
                      <h3 className="text-md font-medium text-gray-800">{edu.degree || 'Titolo di studio'}</h3>
                      <span className="text-xs text-gray-500">
                        {formatDate(edu.startDate) || 'Data inizio'} — {edu.current ? 'Presente' : (formatDate(edu.endDate) || 'Data fine')}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-gray-600 mb-2">{edu.institution || 'Istituto'}</div>
                    <p className="text-sm text-gray-600">{edu.description || 'Descrizione'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Colonna Destra */}
        <div className="space-y-8">
          {/* Competenze */}
          {skills.length > 0 && (
            <div style={{ pageBreakInside: "avoid" }}>
              <h2 className="text-sm font-normal text-gray-400 mb-3 uppercase tracking-widest">Competenze</h2>
              <div className="space-y-2">
                {skills.map((skill) => (
                  <div key={skill.id} className="pb-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-700">{skill.name || 'Competenza'}</span>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`w-2 h-2 rounded-full ${i < skill.level ? 'bg-gray-700' : 'bg-gray-200'}`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Lingue */}
          {personalInfo.languages && personalInfo.languages.length > 0 && (
            <div style={{ pageBreakInside: "avoid" }}>
              <h2 className="text-sm font-normal text-gray-400 mb-3 uppercase tracking-widest">Lingue</h2>
              <div className="space-y-2">
                {personalInfo.languages.map((language) => (
                  <div key={language.id} className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">{language.name || 'Lingua'}</span>
                    <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      {language.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MinimalistTemplate;