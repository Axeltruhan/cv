import { formatDate } from "@/lib/utils/date-formatter";
import { PersonalInfo, Experience, Education, Skill } from "@shared/schema";

interface TechnicalTemplateProps {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
}

const TechnicalTemplate = ({ personalInfo, experiences, education, skills }: TechnicalTemplateProps) => {
  // Determina se siamo in modalità di stampa (per PDF) o visualizzazione normale
  const isPrintMode = typeof window !== 'undefined' && 
                    window.document.querySelector('.pdf-generation-in-progress') !== null;

  return (
    <div className="bg-white font-mono" id="cv-preview-technical" style={{ width: "100%" }}>
      {/* Header in stile Tecnico */}
      <div className={`${!isPrintMode ? "bg-slate-800" : "bg-slate-700"} text-white p-6`}>
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          {/* Foto con bordo tecnico */}
          {personalInfo.photo ? (
            <div className="w-28 h-28 border-2 border-emerald-400 p-1">
              <img src={personalInfo.photo} alt="Foto profilo" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-28 h-28 border-2 border-emerald-400 p-1 flex items-center justify-center bg-slate-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          )}
          
          {/* Nome e info di contatto in stile tecnico */}
          <div className="text-center md:text-left flex-1">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-emerald-400">
              {personalInfo.firstName || 'Nome'} {personalInfo.lastName || 'Cognome'}
            </h1>
            
            <div className="flex flex-col md:flex-row gap-3 md:gap-6 justify-center md:justify-start">
              {personalInfo.email && (
                <div className="flex items-center text-sm">
                  <span className="inline-block bg-emerald-400 text-slate-800 p-1 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <span className="text-slate-100 truncate max-w-[200px]">{personalInfo.email}</span>
                </div>
              )}
              
              {personalInfo.phone && (
                <div className="flex items-center text-sm">
                  <span className="inline-block bg-emerald-400 text-slate-800 p-1 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  <span className="text-slate-100">{personalInfo.phone}</span>
                </div>
              )}
              
              {personalInfo.address && (
                <div className="flex items-center text-sm">
                  <span className="inline-block bg-emerald-400 text-slate-800 p-1 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  <span className="text-slate-100 truncate max-w-[200px]">{personalInfo.address}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {/* Colonna Sinistra */}
        <div className={`p-4 md:p-6 ${!isPrintMode ? "bg-slate-100" : "bg-slate-50"} md:col-span-1`}>
          {/* Competenze tecniche */}
          {skills.length > 0 && (
            <div className="mb-8" style={{ pageBreakInside: "avoid" }}>
              <h2 className="text-lg font-bold mb-4 pb-2 border-b-2 border-emerald-400 inline-block text-slate-700">
                <span className="tracking-wider">COMPETENZE</span> <span className="text-emerald-500">//</span>
              </h2>
              
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.id} className="mb-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-bold text-slate-700">{skill.name || 'Competenza'}</span>
                      <span className="text-xs font-mono text-emerald-600 bg-emerald-100 px-1">
                        {/* Output skills as 0-100% in tech style */}
                        {Math.round((skill.level / 5) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-2">
                      <div className={`h-full ${!isPrintMode ? "bg-emerald-400" : "bg-emerald-600"}`} style={{ width: `${(skill.level / 5) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Lingue */}
          {personalInfo.languages && personalInfo.languages.length > 0 && (
            <div className="mb-8" style={{ pageBreakInside: "avoid" }}>
              <h2 className="text-lg font-bold mb-4 pb-2 border-b-2 border-emerald-400 inline-block text-slate-700">
                <span className="tracking-wider">LINGUE</span> <span className="text-emerald-500">//</span>
              </h2>
              
              <div className="space-y-2">
                {personalInfo.languages.map((language) => (
                  <div key={language.id} className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-700">{language.name || 'Lingua'}</span>
                    <span className="inline-flex items-center text-xs px-2 py-1 bg-slate-200 text-slate-700 font-mono">
                      [{language.level}]
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Mobilità */}
          {(personalInfo.drivingLicense || personalInfo.hasCar) && (
            <div style={{ pageBreakInside: "avoid" }}>
              <h2 className="text-lg font-bold mb-4 pb-2 border-b-2 border-emerald-400 inline-block text-slate-700">
                <span className="tracking-wider">MOBILITÀ</span> <span className="text-emerald-500">//</span>
              </h2>
              
              <div className="space-y-2">
                {personalInfo.drivingLicense && (
                  <div className="flex items-center">
                    <span className="inline-block bg-emerald-400 text-white p-1 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-700">Patente di guida:</p>
                      <p className="text-xs text-slate-600">{personalInfo.drivingLicense}</p>
                    </div>
                  </div>
                )}
                
                {personalInfo.hasCar && (
                  <div className="flex items-center">
                    <span className="inline-block bg-emerald-400 text-white p-1 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-700">Automunito:</p>
                      <p className="text-xs text-slate-600">Sì</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Colonna Destra */}
        <div className="p-4 md:p-6 md:col-span-2">
          {/* Su di me */}
          {personalInfo.description && (
            <div className="mb-8" style={{ pageBreakInside: "avoid" }}>
              <h2 className="text-lg font-bold mb-4 pb-2 border-b-2 border-emerald-400 inline-block text-slate-700">
                <span className="tracking-wider">PROFILO</span> <span className="text-emerald-500">//</span>
              </h2>
              <p className="text-sm text-slate-600 font-mono leading-relaxed">
                {personalInfo.description}
              </p>
            </div>
          )}
          
          {/* Esperienze */}
          {experiences.length > 0 && (
            <div className="mb-8" style={{ pageBreakInside: "avoid" }}>
              <h2 className="text-lg font-bold mb-4 pb-2 border-b-2 border-emerald-400 inline-block text-slate-700">
                <span className="tracking-wider">ESPERIENZA</span> <span className="text-emerald-500">//</span>
              </h2>
              
              <div className="space-y-6">
                {experiences.map((exp) => (
                  <div key={exp.id} className="relative pl-4 border-l-2 border-slate-200" style={{ pageBreakInside: "avoid" }}>
                    <div className="absolute left-[-5px] top-0 w-2 h-2 bg-emerald-400"></div>
                    <div className="flex flex-col">
                      <p className="text-xs text-emerald-500 mb-1 font-mono">
                        {formatDate(exp.startDate) || 'Data inizio'} {'->'} {exp.current ? 'Presente' : (formatDate(exp.endDate) || 'Data fine')}
                      </p>
                      <h3 className="text-base font-bold text-slate-700 mb-1">{exp.position || 'Posizione'}</h3>
                      <p className="text-sm text-slate-600 mb-2">{'@ ' + (exp.company || 'Azienda')}</p>
                      <p className="text-xs text-slate-600">{exp.description || 'Descrizione'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Formazione */}
          {education.length > 0 && (
            <div style={{ pageBreakInside: "avoid" }}>
              <h2 className="text-lg font-bold mb-4 pb-2 border-b-2 border-emerald-400 inline-block text-slate-700">
                <span className="tracking-wider">FORMAZIONE</span> <span className="text-emerald-500">//</span>
              </h2>
              
              <div className="space-y-6">
                {education.map((edu) => (
                  <div key={edu.id} className="relative pl-4 border-l-2 border-slate-200" style={{ pageBreakInside: "avoid" }}>
                    <div className="absolute left-[-5px] top-0 w-2 h-2 bg-emerald-400"></div>
                    <div className="flex flex-col">
                      <p className="text-xs text-emerald-500 mb-1 font-mono">
                        {formatDate(edu.startDate) || 'Data inizio'} {'->'} {edu.current ? 'Presente' : (formatDate(edu.endDate) || 'Data fine')}
                      </p>
                      <h3 className="text-base font-bold text-slate-700 mb-1">{edu.degree || 'Titolo di studio'}</h3>
                      <p className="text-sm text-slate-600 mb-2">{'@ ' + (edu.institution || 'Istituto')}</p>
                      <p className="text-xs text-slate-600">{edu.description || 'Descrizione'}</p>
                    </div>
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

export default TechnicalTemplate;