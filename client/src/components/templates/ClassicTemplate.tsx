import { formatDate } from "@/lib/utils/date-formatter";
import { PersonalInfo, Experience, Education, Skill } from "@shared/schema";

interface ClassicTemplateProps {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
}

const ClassicTemplate = ({ personalInfo, experiences, education, skills }: ClassicTemplateProps) => {
  return (
    <div className="bg-white p-4 pt-6 relative border border-gray-300 rounded-sm" id="cv-preview-classic" style={{ width: "100%" }}>
      {/* CV Header */}
      <div className="flex flex-col items-start mb-4 pb-3 border-b border-gray-300">
        <div className="flex flex-row w-full mb-3">
          <div className="mr-6">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              {personalInfo.photo ? (
                <img src={personalInfo.photo} alt="Foto profilo" className="w-full h-full object-cover" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )}
            </div>
          </div>
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold">
              {personalInfo.firstName || 'Nome'} {personalInfo.lastName || 'Cognome'}
            </h1>
            
            <div className="flex flex-col gap-y-1">
              {personalInfo.email && (
                <div className="w-full flex items-start text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 flex-shrink-0 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="break-all">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="w-full flex items-start text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 flex-shrink-0 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="break-all">{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.address && (
                <div className="w-full flex items-start text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 flex-shrink-0 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="break-all">{personalInfo.address}</span>
                </div>
              )}
            </div>
            
            {/* Su di me section */}
            {personalInfo.description && (
              <div className="mt-5 pt-4 border-t border-gray-200">
                <h2 className="text-base font-semibold mb-2 flex items-center text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Su di me
                </h2>
                <p className="text-sm text-gray-600">
                  {personalInfo.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Experience Section */}
      {experiences.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-3 pb-1 border-b border-gray-300 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Esperienze Lavorative
          </h2>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1">
                  <h3 className="text-md font-medium">{exp.position || 'Posizione'}</h3>
                  <div className="text-sm text-gray-600 italic">
                    {formatDate(exp.startDate) || 'Data inizio'} - {exp.current ? 'Presente' : (formatDate(exp.endDate) || 'Data fine')}
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-700 mb-1">{exp.company || 'Azienda'}</p>
                <p className="text-sm text-gray-600">{exp.description || 'Descrizione'}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Education Section */}
      {education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-3 pb-1 border-b border-gray-300 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
            Formazione
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="mb-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1">
                  <h3 className="text-md font-medium">{edu.degree || 'Titolo di studio'}</h3>
                  <div className="text-sm text-gray-600 italic">
                    {formatDate(edu.startDate) || 'Data inizio'} - {edu.current ? 'Presente' : (formatDate(edu.endDate) || 'Data fine')}
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-700 mb-1">{edu.institution || 'Istituto'}</p>
                <p className="text-sm text-gray-600">{edu.description || 'Descrizione'}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Skills Section */}
      {skills.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-3 pb-1 border-b border-gray-300 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Competenze
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {skills.map((skill) => (
              <div key={skill.id} className="flex items-center">
                <span className="text-sm mr-2 flex-1">{skill.name || 'Competenza'}</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div 
                      key={level}
                      className={`w-4 h-4 rounded-full mx-0.5 ${level <= skill.level ? 'bg-primary' : 'bg-gray-200'}`}
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Languages Section */}
      {personalInfo.languages && personalInfo.languages.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-3 pb-1 border-b border-gray-300 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            Lingue Conosciute
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {personalInfo.languages.map((language) => (
              <div key={language.id} className="flex items-center">
                <span className="text-sm mr-2 flex-1">{language.name || 'Lingua'}</span>
                <span className="text-sm px-2 py-1 bg-primary text-white rounded font-medium">
                  {language.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Driving Info Section */}
      {(personalInfo.drivingLicense || personalInfo.hasCar) && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-3 pb-1 border-b border-gray-300 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Informazioni di Mobilità
          </h2>
          <div className="space-y-2">
            {personalInfo.drivingLicense && (
              <div className="flex items-center">
                <span className="text-sm text-gray-700 font-medium mr-2">Patente di guida:</span>
                <span className="text-sm text-gray-600">{personalInfo.drivingLicense}</span>
              </div>
            )}
            {personalInfo.hasCar && (
              <div className="flex items-center">
                <span className="text-sm text-gray-700 font-medium mr-2">Automunito:</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassicTemplate;