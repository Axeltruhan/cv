import { formatDate } from "@/lib/utils/date-formatter";
import { PersonalInfo, Experience, Education, Skill } from "@shared/schema";

interface Modern3DTemplateProps {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
}

const Modern3DTemplate = ({ personalInfo, experiences, education, skills }: Modern3DTemplateProps) => {
  // Determina se siamo in modalità di stampa (per PDF) o visualizzazione normale
  const isPrintMode = typeof window !== 'undefined' && 
                    window.document.querySelector('.pdf-generation-in-progress') !== null;

  return (
    <div className="bg-white p-4 md:p-6 relative rounded-xl" id="cv-preview-modern3d" style={{ width: "100%", pageBreakInside: "avoid" }}>
      {/* Header con effetto più semplice per la stampa */}
      <div className="relative mb-6">
        {!isPrintMode && (
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl -z-10 opacity-80"></div>
        )}
        <div className={`${isPrintMode ? 'border border-indigo-200' : 'bg-white'} rounded-xl p-6`}>
          <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
            {/* Foto profilo */}
            <div className="relative">
              <div className={`relative w-24 h-24 rounded-full overflow-hidden ${isPrintMode ? 'border-2 border-indigo-300' : 'shadow-xl border-2 border-white'}`}>
                {personalInfo.photo ? (
                  <img src={personalInfo.photo} alt="Foto profilo" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-indigo-500 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
            
            {/* Nome e titolo */}
            <div className="text-center md:text-left md:flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-indigo-700">
                {personalInfo.firstName || 'Nome'} {personalInfo.lastName || 'Cognome'}
              </h1>
              
              {/* Minimal contact info with icons and hover effects */}
              <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-2">
                {personalInfo.email && (
                  <div className="flex items-center text-gray-600 px-2 py-1 rounded-md bg-gray-100 text-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs truncate max-w-[150px]">{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.phone && (
                  <div className="flex items-center text-gray-600 px-2 py-1 rounded-md bg-gray-100 text-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-xs">{personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo.address && (
                  <div className="flex items-center text-gray-600 px-2 py-1 rounded-md bg-gray-100 text-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-xs truncate max-w-[150px]">{personalInfo.address}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* About me section - versione semplificata per PDF */}
      {personalInfo.description && (
        <div className="mb-6" style={{ pageBreakInside: "avoid" }}>
          <div className={`relative rounded-xl ${isPrintMode ? 'border border-indigo-200' : 'border border-indigo-200 bg-white shadow-sm'}`}>
            <div className="p-4">
              <h2 className="text-lg font-bold text-indigo-700 mb-2">Su di me</h2>
              <p className="text-sm text-gray-600 leading-normal">
                {personalInfo.description}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Main content in a 3D card - layout adattivo che riduce il numero di colonne su schermi piccoli */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Left column */}
        <div className="space-y-6">
          {/* Experience Section - versione ottimizzata per PDF */}
          {experiences.length > 0 && (
            <div style={{ pageBreakInside: "avoid" }}>
              <div className={`relative rounded-xl ${isPrintMode ? 'border border-indigo-200' : 'border border-indigo-200 bg-white shadow-sm'}`}>
                <div className="p-4">
                  <h2 className="text-lg font-bold text-indigo-700 mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Esperienze Lavorative
                  </h2>
                  
                  <div className="space-y-3">
                    {experiences.map((exp, index) => (
                      <div key={exp.id} className={`${index !== 0 ? 'pt-3 border-t border-gray-100' : ''}`} style={{ pageBreakInside: "avoid" }}>
                        <div className="flex flex-col mb-1">
                          <h3 className="text-md font-semibold text-gray-800">{exp.position || 'Posizione'}</h3>
                          <div className="flex justify-between mt-1">
                            <p className="text-sm font-medium text-gray-700">{exp.company || 'Azienda'}</p>
                            <div className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md inline-flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {formatDate(exp.startDate) || 'Data inizio'} - {exp.current ? 'Presente' : (formatDate(exp.endDate) || 'Data fine')}
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{exp.description || 'Descrizione'}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Skills section - versione ottimizzata per PDF */}
          {skills.length > 0 && (
            <div style={{ pageBreakInside: "avoid" }}>
              <div className={`relative rounded-xl ${isPrintMode ? 'border border-indigo-200' : 'border border-indigo-200 bg-white shadow-sm'}`}>
                <div className="p-4">
                  <h2 className="text-lg font-bold text-indigo-700 mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Competenze
                  </h2>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {skills.map((skill) => (
                      <div key={skill.id}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-medium text-gray-700">{skill.name || 'Competenza'}</span>
                          <span className="text-xs font-medium text-indigo-600">{skill.level}/5</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-500 rounded-full"
                            style={{ 
                              width: `${(skill.level / 5) * 100}%`
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Right column */}
        <div className="space-y-6">
          {/* Education Section - versione ottimizzata per PDF */}
          {education.length > 0 && (
            <div style={{ pageBreakInside: "avoid" }}>
              <div className={`relative rounded-xl ${isPrintMode ? 'border border-indigo-200' : 'border border-indigo-200 bg-white shadow-sm'}`}>
                <div className="p-4">
                  <h2 className="text-lg font-bold text-indigo-700 mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                    Formazione
                  </h2>
                  
                  <div className="space-y-3">
                    {education.map((edu, index) => (
                      <div key={edu.id} className={`${index !== 0 ? 'pt-3 border-t border-gray-100' : ''}`} style={{ pageBreakInside: "avoid" }}>
                        <div className="flex flex-col mb-1">
                          <h3 className="text-md font-semibold text-gray-800">{edu.degree || 'Titolo di studio'}</h3>
                          <div className="flex justify-between mt-1">
                            <p className="text-sm font-medium text-gray-700">{edu.institution || 'Istituto'}</p>
                            <div className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md inline-flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {formatDate(edu.startDate) || 'Data inizio'} - {edu.current ? 'Presente' : (formatDate(edu.endDate) || 'Data fine')}
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{edu.description || 'Descrizione'}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Languages Section - versione ottimizzata per PDF */}
          {personalInfo.languages && personalInfo.languages.length > 0 && (
            <div style={{ pageBreakInside: "avoid" }}>
              <div className={`relative rounded-xl ${isPrintMode ? 'border border-indigo-200' : 'border border-indigo-200 bg-white shadow-sm'}`}>
                <div className="p-4">
                  <h2 className="text-lg font-bold text-indigo-700 mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                    Lingue Conosciute
                  </h2>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {personalInfo.languages.map((language) => (
                      <div key={language.id} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                        <span className="text-xs font-medium text-gray-700">{language.name || 'Lingua'}</span>
                        <span className="text-xs font-bold px-2 py-0.5 bg-indigo-500 text-white rounded shrink-0">
                          {language.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Driving Info Section - versione ottimizzata per PDF */}
          {(personalInfo.drivingLicense || personalInfo.hasCar) && (
            <div style={{ pageBreakInside: "avoid" }}>
              <div className={`relative rounded-xl ${isPrintMode ? 'border border-indigo-200' : 'border border-indigo-200 bg-white shadow-sm'}`}>
                <div className="p-4">
                  <h2 className="text-lg font-bold text-indigo-700 mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    Informazioni di Mobilità
                  </h2>
                  
                  <div className="flex flex-wrap gap-2">
                    {personalInfo.drivingLicense && (
                      <div className="flex items-center bg-gray-50 px-3 py-2 rounded-lg flex-1">
                        <span className="text-xs font-medium text-gray-700 mr-2">Patente di guida:</span>
                        <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded">{personalInfo.drivingLicense}</span>
                      </div>
                    )}
                    {personalInfo.hasCar && (
                      <div className="flex items-center bg-gray-50 px-3 py-2 rounded-lg flex-1">
                        <span className="text-xs font-medium text-gray-700 mr-2">Automunito:</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Nota: le animazioni sono definite globalmente in index.css */}
    </div>
  );
};

export default Modern3DTemplate;