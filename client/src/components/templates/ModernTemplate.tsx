import { formatDate } from "@/lib/utils/date-formatter";
import { PersonalInfo, Experience, Education, Skill } from "@shared/schema";

interface ModernTemplateProps {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
}

const ModernTemplate = ({ personalInfo, experiences, education, skills }: ModernTemplateProps) => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 p-4 pt-6 relative rounded-sm" id="cv-preview-modern" style={{ width: "100%" }}>
      {/* CV Header - Modern Style */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          {/* Photo with different styling */}
          {personalInfo.photo ? (
            <div className="w-24 h-24 rounded-lg overflow-hidden shadow-md mr-6">
              <img src={personalInfo.photo} alt="Foto profilo" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center shadow-md mr-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          )}
          
          {/* Name and contact info with modern styling */}
          <div>
            <div className="bg-gradient-to-r from-primary to-primary/80 text-transparent bg-clip-text">
              <h1 className="text-3xl font-bold">
                {personalInfo.firstName || 'Nome'} {personalInfo.lastName || 'Cognome'}
              </h1>
            </div>
            
            <div className="flex gap-x-4 mt-2">
              {personalInfo.email && (
                <div className="flex items-center text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="ml-1 text-sm">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="ml-1 text-sm">{personalInfo.phone}</span>
                </div>
              )}
            </div>
            
            {personalInfo.address && (
              <div className="flex items-center text-gray-700 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="ml-1 text-sm">{personalInfo.address}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Descrizione personale in una box moderna */}
        {personalInfo.description && (
          <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-primary shadow-sm">
            <h2 className="text-base font-semibold mb-2 text-primary">
              Su di me
            </h2>
            <p className="text-sm text-gray-600 italic">
              {personalInfo.description}
            </p>
          </div>
        )}
      </div>
      
      {/* Experience Section */}
      {experiences.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-4 text-primary flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Esperienze Lavorative
          </h2>
          
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <h3 className="text-md font-bold text-gray-800">{exp.position || 'Posizione'}</h3>
                  <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                    {formatDate(exp.startDate) || 'Data inizio'} - {exp.current ? 'Presente' : (formatDate(exp.endDate) || 'Data fine')}
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-700 mt-1">{exp.company || 'Azienda'}</p>
                <p className="text-sm text-gray-600 mt-2">{exp.description || 'Descrizione'}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Education Section */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-4 text-primary flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
            Formazione
          </h2>
          
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <h3 className="text-md font-bold text-gray-800">{edu.degree || 'Titolo di studio'}</h3>
                  <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                    {formatDate(edu.startDate) || 'Data inizio'} - {edu.current ? 'Presente' : (formatDate(edu.endDate) || 'Data fine')}
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-700 mt-1">{edu.institution || 'Istituto'}</p>
                <p className="text-sm text-gray-600 mt-2">{edu.description || 'Descrizione'}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Skills Section */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-4 text-primary flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Competenze
          </h2>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill) => (
                <div key={skill.id} className="flex flex-col">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{skill.name || 'Competenza'}</span>
                    <span className="text-xs text-gray-500">{skill.level}/5</span>
                  </div>
                  <div className="relative w-full h-2 bg-gray-200 rounded-full">
                    <div 
                      className="absolute left-0 top-0 h-2 bg-gradient-to-r from-primary to-primary/70 rounded-full"
                      style={{ width: `${(skill.level / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Languages Section */}
      {personalInfo.languages && personalInfo.languages.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-4 text-primary flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            Lingue Conosciute
          </h2>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="grid grid-cols-2 gap-4">
              {personalInfo.languages.map((language) => (
                <div key={language.id} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{language.name || 'Lingua'}</span>
                  <span className="text-sm px-3 py-1 bg-gradient-to-r from-primary to-primary/70 text-white rounded-full text-xs">
                    {language.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Driving Info Section */}
      {(personalInfo.drivingLicense || personalInfo.hasCar) && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-4 text-primary flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Informazioni di Mobilità
          </h2>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex flex-wrap gap-4">
              {personalInfo.drivingLicense && (
                <div className="bg-primary/10 rounded-lg px-3 py-2 flex items-center">
                  <span className="text-sm font-semibold text-primary mr-2">Patente di guida:</span>
                  <span className="text-sm text-gray-700">{personalInfo.drivingLicense}</span>
                </div>
              )}
              {personalInfo.hasCar && (
                <div className="bg-primary/10 rounded-lg px-3 py-2 flex items-center">
                  <span className="text-sm font-semibold text-primary mr-2">Automunito:</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernTemplate;