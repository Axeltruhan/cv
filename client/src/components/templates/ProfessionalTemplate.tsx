import { formatDate } from "@/lib/utils/date-formatter";
import { PersonalInfo, Experience, Education, Skill } from "@shared/schema";

interface ProfessionalTemplateProps {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
}

const ProfessionalTemplate = ({ personalInfo, experiences, education, skills }: ProfessionalTemplateProps) => {
  return (
    <div className="bg-white p-0 relative" id="cv-preview-professional" style={{ width: "100%" }}>
      {/* CV Header - Professional Style with sidebar */}
      <div className="flex flex-col md:flex-row">
        {/* Sidebar for personal info */}
        <div className="bg-gray-900 text-white p-6 md:w-1/3">
          {/* Photo with circle design */}
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/30">
              {personalInfo.photo ? (
                <img src={personalInfo.photo} alt="Foto profilo" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
          
          {/* Name */}
          <h1 className="text-2xl font-bold text-center mb-6">
            {personalInfo.firstName || 'Nome'} {personalInfo.lastName || 'Cognome'}
          </h1>
          
          {/* Contact Info Section */}
          <div className="space-y-4 mb-6">
            <h2 className="text-lg font-semibold border-b border-white/20 pb-2 mb-2">Contatti</h2>
            
            {personalInfo.email && (
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-white/70 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-white/80 break-all">{personalInfo.email}</span>
              </div>
            )}
            
            {personalInfo.phone && (
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-white/70 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm text-white/80">{personalInfo.phone}</span>
              </div>
            )}
            
            {personalInfo.address && (
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-white/70 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm text-white/80">{personalInfo.address}</span>
              </div>
            )}
          </div>
          
          {/* Skills Section in sidebar */}
          {skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold border-b border-white/20 pb-2 mb-2">Competenze</h2>
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between">
                      <span className="text-sm text-white/80">{skill.name || 'Competenza'}</span>
                    </div>
                    <div className="h-1.5 bg-gray-700 rounded-full mt-1 overflow-hidden">
                      <div 
                        className="h-1.5 bg-white" 
                        style={{ width: `${(skill.level / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Languages Section in sidebar */}
          {personalInfo.languages && personalInfo.languages.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold border-b border-white/20 pb-2 mb-2">Lingue</h2>
              <div className="space-y-2">
                {personalInfo.languages.map((language) => (
                  <div key={language.id} className="flex justify-between">
                    <span className="text-sm text-white/80">{language.name || 'Lingua'}</span>
                    <span className="text-xs px-2 py-1 bg-gray-700 text-white/90 rounded font-medium">
                      {language.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Driving Info Section in sidebar */}
          {(personalInfo.drivingLicense || personalInfo.hasCar) && (
            <div>
              <h2 className="text-lg font-semibold border-b border-white/20 pb-2 mb-2">Mobilità</h2>
              <div className="space-y-2">
                {personalInfo.drivingLicense && (
                  <div>
                    <span className="text-sm text-white/70">Patente di guida:</span>
                    <div className="text-sm text-white/90 font-medium">{personalInfo.drivingLicense}</div>
                  </div>
                )}
                {personalInfo.hasCar && (
                  <div className="flex items-center">
                    <span className="text-sm text-white/70 mr-2">Automunito:</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Main content */}
        <div className="p-6 md:w-2/3">
          {/* Personal description */}
          {personalInfo.description && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-900 pb-2 mb-3">
                Su di me
              </h2>
              <p className="text-gray-700">
                {personalInfo.description}
              </p>
            </div>
          )}
          
          {/* Experience Section */}
          {experiences.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-900 pb-2 mb-3">
                Esperienze Lavorative
              </h2>
              <div className="space-y-5">
                {experiences.map((exp) => (
                  <div key={exp.id} className="relative pl-6 pb-5 border-l-2 border-gray-200">
                    <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-gray-900"></div>
                    <div className="flex justify-between">
                      <h3 className="text-md font-bold text-gray-800">{exp.position || 'Posizione'}</h3>
                      <div className="text-sm text-gray-600">
                        {formatDate(exp.startDate) || 'Data inizio'} - {exp.current ? 'Presente' : (formatDate(exp.endDate) || 'Data fine')}
                      </div>
                    </div>
                    <p className="text-md font-medium text-gray-700 mt-1">{exp.company || 'Azienda'}</p>
                    <p className="text-sm text-gray-600 mt-2">{exp.description || 'Descrizione'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Education Section */}
          {education.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-900 pb-2 mb-3">
                Formazione
              </h2>
              <div className="space-y-5">
                {education.map((edu) => (
                  <div key={edu.id} className="relative pl-6 pb-5 border-l-2 border-gray-200">
                    <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-gray-900"></div>
                    <div className="flex justify-between">
                      <h3 className="text-md font-bold text-gray-800">{edu.degree || 'Titolo di studio'}</h3>
                      <div className="text-sm text-gray-600">
                        {formatDate(edu.startDate) || 'Data inizio'} - {edu.current ? 'Presente' : (formatDate(edu.endDate) || 'Data fine')}
                      </div>
                    </div>
                    <p className="text-md font-medium text-gray-700 mt-1">{edu.institution || 'Istituto'}</p>
                    <p className="text-sm text-gray-600 mt-2">{edu.description || 'Descrizione'}</p>
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

export default ProfessionalTemplate;