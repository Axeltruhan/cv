import { formatDate } from "@/lib/utils/date-formatter";
import { PersonalInfo, Experience, Education, Skill } from "@shared/schema";

interface CreativeTemplateProps {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
}

const CreativeTemplate = ({ personalInfo, experiences, education, skills }: CreativeTemplateProps) => {
  // Determina se siamo in modalità di stampa (per PDF) o visualizzazione normale
  const isPrintMode = typeof window !== 'undefined' && 
                    window.document.querySelector('.pdf-generation-in-progress') !== null;

  return (
    <div className="relative bg-white" id="cv-preview-creative" style={{ width: "100%" }}>
      {/* Background design (nascosto in modalità stampa) */}
      {!isPrintMode && (
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-pink-100 to-transparent z-0 rounded-tl-[150px] rounded-bl-[50px]"></div>
      )}
      
      {/* Header - Creativo */}
      <div className="relative pt-6 px-6 pb-4 z-10">
        <div className="flex flex-col md:flex-row md:items-end gap-5">
          {/* Foto con stile creativo */}
          {personalInfo.photo ? (
            <div className="relative">
              <div className={`w-28 h-28 rounded-xl overflow-hidden ${!isPrintMode && "rotate-6 border-4 border-white shadow-lg"}`}>
                <img src={personalInfo.photo} alt="Foto profilo" className="w-full h-full object-cover" />
              </div>
              {!isPrintMode && <div className="absolute -z-10 top-2 left-2 w-28 h-28 bg-pink-200 rounded-xl -rotate-3"></div>}
            </div>
          ) : (
            <div className="relative">
              <div className={`w-28 h-28 flex items-center justify-center bg-gradient-to-br from-pink-400 to-violet-500 rounded-xl text-white ${!isPrintMode && "rotate-6 border-4 border-white shadow-lg"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              {!isPrintMode && <div className="absolute -z-10 top-2 left-2 w-28 h-28 bg-pink-200 rounded-xl -rotate-3"></div>}
            </div>
          )}
          
          {/* Nome e titolo */}
          <div className="flex-grow">
            <div className={`font-bold text-3xl md:text-4xl mb-1 ${!isPrintMode && "text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-500"}`}>
              {personalInfo.firstName || 'Nome'} {personalInfo.lastName || 'Cognome'}
            </div>
            
            {/* Contatti con design creativo */}
            <div className="flex flex-wrap gap-3 mt-3">
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`} className="inline-flex items-center px-3 py-1 bg-white text-sm text-gray-700 rounded-full shadow-sm hover:shadow">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="truncate max-w-[150px]">{personalInfo.email}</span>
                </a>
              )}
              
              {personalInfo.phone && (
                <a href={`tel:${personalInfo.phone}`} className="inline-flex items-center px-3 py-1 bg-white text-sm text-gray-700 rounded-full shadow-sm hover:shadow">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {personalInfo.phone}
                </a>
              )}
              
              {personalInfo.address && (
                <div className="inline-flex items-center px-3 py-1 bg-white text-sm text-gray-700 rounded-full shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="truncate max-w-[150px]">{personalInfo.address}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 px-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Colonna Principale (Esperienza e Formazione) */}
          <div className="md:col-span-2 space-y-6">
            {/* Su di me */}
            {personalInfo.description && (
              <div className={`p-5 rounded-xl ${!isPrintMode && "bg-white shadow-md"}`} style={{ pageBreakInside: "avoid" }}>
                <h2 className={`text-lg font-bold mb-3 ${!isPrintMode && "text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-500"}`}>
                  Su di me
                </h2>
                <p className="text-gray-600">
                  {personalInfo.description}
                </p>
              </div>
            )}
            
            {/* Esperienze */}
            {experiences.length > 0 && (
              <div className={`p-5 rounded-xl ${!isPrintMode && "bg-white shadow-md"}`} style={{ pageBreakInside: "avoid" }}>
                <h2 className={`text-lg font-bold mb-3 ${!isPrintMode && "text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-500"}`}>
                  Esperienze professionali
                </h2>
                <div className="space-y-4">
                  {experiences.map((exp, index) => (
                    <div key={exp.id} style={{ pageBreakInside: "avoid" }}>
                      <div className="relative pl-6">
                        {!isPrintMode && index < experiences.length - 1 && (
                          <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-violet-300 to-pink-300"></div>
                        )}
                        <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-pink-500"></div>
                        <div className="mb-1">
                          <h3 className="text-md font-semibold text-gray-800">{exp.position || 'Posizione'}</h3>
                          <div className="flex justify-between items-center">
                            <p className="text-sm font-medium text-gray-600">{exp.company || 'Azienda'}</p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {formatDate(exp.startDate) || 'Data inizio'} - {exp.current ? 'Presente' : (formatDate(exp.endDate) || 'Data fine')}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{exp.description || 'Descrizione'}</p>
                      </div>
                      {index < experiences.length - 1 && <div className="h-4"></div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Formazione */}
            {education.length > 0 && (
              <div className={`p-5 rounded-xl ${!isPrintMode && "bg-white shadow-md"}`} style={{ pageBreakInside: "avoid" }}>
                <h2 className={`text-lg font-bold mb-3 ${!isPrintMode && "text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-500"}`}>
                  Formazione
                </h2>
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <div key={edu.id} style={{ pageBreakInside: "avoid" }}>
                      <div className="relative pl-6">
                        {!isPrintMode && index < education.length - 1 && (
                          <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-violet-300 to-pink-300"></div>
                        )}
                        <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-pink-500"></div>
                        <div className="mb-1">
                          <h3 className="text-md font-semibold text-gray-800">{edu.degree || 'Titolo di studio'}</h3>
                          <div className="flex justify-between items-center">
                            <p className="text-sm font-medium text-gray-600">{edu.institution || 'Istituto'}</p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {formatDate(edu.startDate) || 'Data inizio'} - {edu.current ? 'Presente' : (formatDate(edu.endDate) || 'Data fine')}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{edu.description || 'Descrizione'}</p>
                      </div>
                      {index < education.length - 1 && <div className="h-4"></div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Colonna Secondaria (Skills e Info) */}
          <div className="space-y-6">
            {/* Competenze */}
            {skills.length > 0 && (
              <div className={`p-5 rounded-xl ${!isPrintMode && "bg-white shadow-md"}`} style={{ pageBreakInside: "avoid" }}>
                <h2 className={`text-lg font-bold mb-3 ${!isPrintMode && "text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-500"}`}>
                  Competenze
                </h2>
                <div className="space-y-3">
                  {skills.map((skill) => (
                    <div key={skill.id} className="mb-2">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{skill.name || 'Competenza'}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${!isPrintMode ? "bg-gradient-to-r from-violet-500 to-pink-500" : "bg-violet-500"}`}
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
              <div className={`p-5 rounded-xl ${!isPrintMode && "bg-white shadow-md"}`} style={{ pageBreakInside: "avoid" }}>
                <h2 className={`text-lg font-bold mb-3 ${!isPrintMode && "text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-500"}`}>
                  Lingue
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  {personalInfo.languages.map((language) => (
                    <div key={language.id} className={`text-center p-2 rounded-lg ${!isPrintMode && "bg-gradient-to-r from-violet-50 to-pink-50"}`}>
                      <span className="text-sm font-medium block text-gray-700">{language.name || 'Lingua'}</span>
                      <span className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${!isPrintMode ? "bg-gradient-to-r from-violet-500 to-pink-500 text-white" : "bg-violet-100 text-violet-700"}`}>
                        {language.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Mobilità */}
            {(personalInfo.drivingLicense || personalInfo.hasCar) && (
              <div className={`p-5 rounded-xl ${!isPrintMode && "bg-white shadow-md"}`} style={{ pageBreakInside: "avoid" }}>
                <h2 className={`text-lg font-bold mb-3 ${!isPrintMode && "text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-500"}`}>
                  Mobilità
                </h2>
                <div className="space-y-2">
                  {personalInfo.drivingLicense && (
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full mr-3 flex items-center justify-center ${!isPrintMode ? "bg-gradient-to-r from-violet-100 to-pink-100" : "bg-gray-100"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${!isPrintMode ? "text-pink-500" : "text-gray-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Patente di guida</p>
                        <p className="text-sm font-medium text-gray-700">{personalInfo.drivingLicense}</p>
                      </div>
                    </div>
                  )}
                  
                  {personalInfo.hasCar && (
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full mr-3 flex items-center justify-center ${!isPrintMode ? "bg-gradient-to-r from-violet-100 to-pink-100" : "bg-gray-100"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${!isPrintMode ? "text-pink-500" : "text-gray-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Automezzo proprio</p>
                        <p className="text-sm font-medium text-gray-700">Disponibile</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;