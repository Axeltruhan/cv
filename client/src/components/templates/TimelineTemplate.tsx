import React from 'react';
import { PersonalInfo, Experience, Education, Skill } from '@shared/schema';
import { formatDate } from '@/lib/utils/date-formatter';

interface TimelineTemplateProps {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
}

const TimelineTemplate = ({ personalInfo, experiences, education, skills }: TimelineTemplateProps) => {
  // Combine experiences and education for the timeline, sort by date
  const timelineItems = [
    ...experiences.map(exp => ({
      ...exp,
      type: 'experience',
      date: new Date(exp.startDate),
      endDateObj: exp.endDate ? new Date(exp.endDate) : null
    })),
    ...education.map(edu => ({
      ...edu,
      type: 'education',
      date: new Date(edu.startDate),
      endDateObj: edu.endDate ? new Date(edu.endDate) : null
    }))
  ].sort((a, b) => b.date.getTime() - a.date.getTime());
  
  return (
    <div className="w-full h-full bg-gray-50 text-gray-800 overflow-hidden">
      <div className="flex flex-col h-full">
        {/* Sidebar */}
        <div className="flex flex-col md:flex-row h-full">
          <aside className="w-full md:w-1/3 bg-gray-800 text-white p-8">
            <div className="mb-12 text-center">
              <div className="w-32 h-32 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold">
                  {personalInfo.firstName.charAt(0)}{personalInfo.lastName.charAt(0)}
                </span>
              </div>
              <h1 className="text-2xl font-bold">{personalInfo.firstName} {personalInfo.lastName}</h1>
              <p className="text-gray-300 mt-1">{personalInfo.title}</p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">Contatti</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-6 mr-3 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-gray-300">{personalInfo.email}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 mr-3 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="text-gray-300">{personalInfo.phone}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 mr-3 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="text-gray-300">{personalInfo.location}</span>
                </div>
              </div>
            </div>
            
            {/* Skills */}
            <div className="mb-8 skills-section">
              <h2 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">Competenze</h2>
              <div className="space-y-3">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-gray-400">{skill.level * 2}/10</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <div 
                        className="bg-teal-500 h-1.5 rounded-full" 
                        style={{ width: `${skill.level * 20}%` }} 
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Languages if available */}
            {personalInfo.languages && personalInfo.languages.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">Lingue</h2>
                <div className="space-y-3">
                  {personalInfo.languages.map((language, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">{language.name}</span>
                        <span className="text-gray-400">{language.level}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1.5">
                        <div 
                          className="bg-teal-500 h-1.5 rounded-full" 
                          style={{ width: `${language.level === 'Madrelingua' ? 100 : 
                                              language.level === 'Avanzato' ? 85 : 
                                              language.level === 'Intermedio' ? 65 : 
                                              language.level === 'Base' ? 40 : 20}%` }} 
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>
          
          {/* Main Content */}
          <main className="w-full md:w-2/3 p-8">
            {/* About section */}
            <section className="mb-8 about-me">
              <h2 className="text-2xl font-bold text-gray-700 mb-4">Profilo Professionale</h2>
              <p className="text-gray-600 leading-relaxed">{personalInfo.summary}</p>
            </section>
            
            {/* Timeline */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-700 mb-6">La Mia Storia</h2>
              
              <div className="relative border-l-2 border-gray-300 pl-8 ml-4">
                {timelineItems.map((item, index) => (
                  <div key={index} className="mb-10 relative">
                    {/* Timeline dot */}
                    <div className="absolute -left-10 mt-1.5">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        item.type === 'experience' ? 'bg-teal-500' : 'bg-blue-500'
                      }`}>
                        {item.type === 'experience' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                          </svg>
                        )}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="pb-1">
                      <div className="text-sm font-medium text-gray-400 mb-1">
                        {formatDate(item.date.toISOString().split('T')[0])} - {
                          item.current ? 'Presente' : 
                          item.endDateObj ? formatDate(item.endDateObj.toISOString().split('T')[0]) : 'N/A'
                        }
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-700 mb-1">
                        {item.type === 'experience' ? item.title : item.degree}
                      </h3>
                      
                      <p className="text-gray-600 font-medium mb-2">
                        {item.type === 'experience' ? item.company : item.school}
                      </p>
                      
                      <p className="text-gray-500">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Driving License if available */}
            {personalInfo.drivingLicense && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Informazioni Aggiuntive</h2>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-gray-600">
                    <span className="font-medium">Patente di Guida:</span> {personalInfo.drivingLicense}
                  </p>
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default TimelineTemplate;