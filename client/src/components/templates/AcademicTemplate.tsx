import { formatDate } from "@/lib/utils/date-formatter";
import { PersonalInfo, Experience, Education, Skill } from "@shared/schema";

interface AcademicTemplateProps {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
}

const AcademicTemplate = ({ personalInfo, experiences, education, skills }: AcademicTemplateProps) => {
  return (
    <div className="bg-white p-6 font-serif" id="cv-preview-academic" style={{ width: "100%" }}>
      {/* Header con stile accademico */}
      <div className="mb-6 text-center border-b border-gray-300 pb-4">
        <h1 className="text-3xl font-bold mb-1 text-slate-800 tracking-wide uppercase">
          {personalInfo.firstName || 'Nome'} {personalInfo.lastName || 'Cognome'}
        </h1>
        
        {/* Informazioni di contatto in stile formale */}
        <div className="flex flex-wrap justify-center gap-6 text-slate-600 mt-3">
          {personalInfo.email && (
            <div className="flex items-center text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {personalInfo.email}
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {personalInfo.phone}
            </div>
          )}
          
          {personalInfo.address && (
            <div className="flex items-center text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {personalInfo.address}
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="space-y-6">
        {/* Su di me - Descrizione in stile accademico formale */}
        {personalInfo.description && (
          <div className="mb-6" style={{ pageBreakInside: "avoid" }}>
            <h2 className="text-xl font-bold mb-3 text-slate-800 border-b border-slate-200 pb-1">Profilo Professionale</h2>
            <p className="text-justify text-sm leading-relaxed text-slate-700">
              {personalInfo.description}
            </p>
          </div>
        )}
        
        {/* Formazione - Prima in un CV accademico */}
        {education.length > 0 && (
          <div className="mb-6" style={{ pageBreakInside: "avoid" }}>
            <h2 className="text-xl font-bold mb-3 text-slate-800 border-b border-slate-200 pb-1">Formazione Accademica</h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="pl-0" style={{ pageBreakInside: "avoid" }}>
                  <div className="flex flex-col md:flex-row md:justify-between mb-1">
                    <h3 className="text-base font-bold text-slate-700">{edu.degree || 'Titolo di studio'}</h3>
                    <p className="text-sm italic text-slate-600">
                      {formatDate(edu.startDate) || 'Data inizio'} - {edu.current ? 'Presente' : (formatDate(edu.endDate) || 'Data fine')}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-slate-700 mb-1">{edu.institution || 'Istituto'}</p>
                  <p className="text-sm text-slate-600 text-justify">{edu.description || 'Descrizione'}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Pubblicazioni/Ricerche (simulato con le esperienze) */}
        {experiences.length > 0 && (
          <div className="mb-6" style={{ pageBreakInside: "avoid" }}>
            <h2 className="text-xl font-bold mb-3 text-slate-800 border-b border-slate-200 pb-1">Esperienza Professionale</h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="pl-0" style={{ pageBreakInside: "avoid" }}>
                  <div className="flex flex-col md:flex-row md:justify-between mb-1">
                    <h3 className="text-base font-bold text-slate-700">{exp.position || 'Posizione'}</h3>
                    <p className="text-sm italic text-slate-600">
                      {formatDate(exp.startDate) || 'Data inizio'} - {exp.current ? 'Presente' : (formatDate(exp.endDate) || 'Data fine')}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-slate-700 mb-1">{exp.company || 'Istituzione'}</p>
                  <p className="text-sm text-slate-600 text-justify">{exp.description || 'Descrizione'}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Competenze */}
        {skills.length > 0 && (
          <div className="mb-6" style={{ pageBreakInside: "avoid" }}>
            <h2 className="text-xl font-bold mb-3 text-slate-800 border-b border-slate-200 pb-1">Competenze</h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {skills.map((skill) => (
                <div key={skill.id} className="mb-1">
                  <div className="flex justify-between mb-1">
                    <p className="text-sm font-medium text-slate-700">{skill.name || 'Competenza'}</p>
                    <div className="text-xs text-slate-600">
                      {/* Livello espresso in termini accademici */}
                      {skill.level === 1 && <span>Base</span>}
                      {skill.level === 2 && <span>Intermedio</span>}
                      {skill.level === 3 && <span>Buono</span>}
                      {skill.level === 4 && <span>Avanzato</span>}
                      {skill.level === 5 && <span>Esperto</span>}
                    </div>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-sm overflow-hidden">
                    <div 
                      className="h-1.5 bg-slate-600" 
                      style={{ width: `${(skill.level / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Lingue */}
        {personalInfo.languages && personalInfo.languages.length > 0 && (
          <div style={{ pageBreakInside: "avoid" }}>
            <h2 className="text-xl font-bold mb-3 text-slate-800 border-b border-slate-200 pb-1">Conoscenze Linguistiche</h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {personalInfo.languages.map((language) => (
                <div key={language.id} className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700">{language.name || 'Lingua'}</span>
                  <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-700">
                    {language.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Mobilità e altre info */}
        {(personalInfo.drivingLicense || personalInfo.hasCar) && (
          <div className="mt-6" style={{ pageBreakInside: "avoid" }}>
            <h2 className="text-xl font-bold mb-3 text-slate-800 border-b border-slate-200 pb-1">Informazioni Aggiuntive</h2>
            <ul className="list-disc ml-5 text-sm text-slate-700">
              {personalInfo.drivingLicense && (
                <li className="mb-1">Patente di guida: {personalInfo.drivingLicense}</li>
              )}
              {personalInfo.hasCar && (
                <li>Disponibilità di mezzo proprio</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademicTemplate;