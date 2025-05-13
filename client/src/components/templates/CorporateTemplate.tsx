import React from 'react';
import { PersonalInfo, Experience, Education, Skill } from '@shared/schema';
import { formatDate } from '@/lib/utils/date-formatter';

interface CorporateTemplateProps {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
}

const CorporateTemplate = ({ personalInfo, experiences, education, skills }: CorporateTemplateProps) => {
  return (
    <div className="w-full h-full bg-white text-gray-800 overflow-hidden">
      {/* Header with accent color */}
      <header className="py-6 px-10 bg-gradient-to-r from-blue-700 to-blue-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{personalInfo.firstName} {personalInfo.lastName}</h1>
          <p className="text-blue-100 text-lg mt-1">{personalInfo.title}</p>
        </div>
        
        <div className="mt-4 sm:mt-0 flex flex-col sm:items-end">
          <div className="flex items-center mb-2">
            <span className="text-blue-100">{personalInfo.email}</span>
            <div className="w-5 h-5 ml-2 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center mb-2">
            <span className="text-blue-100">{personalInfo.phone}</span>
            <div className="w-5 h-5 ml-2 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-blue-100">{personalInfo.location}</span>
            <div className="w-5 h-5 ml-2 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10">
        {/* Left column */}
        <div className="col-span-2">
          {/* Profile Summary */}
          <section className="mb-8 about-me">
            <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-100 pb-2 mb-4">Profilo Professionale</h2>
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </section>
          
          {/* Experience */}
          <section className="mb-8 experience-section">
            <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-100 pb-2 mb-4">Esperienza Professionale</h2>
            
            <div className="space-y-6">
              {experiences.map((experience, index) => (
                <div key={index} className="pb-5 hover:bg-blue-50 transition-colors p-3 rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-blue-900">{experience.title}</h3>
                    <span className="text-sm font-medium text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                      {formatDate(experience.startDate)} - {experience.current ? 'Presente' : formatDate(experience.endDate)}
                    </span>
                  </div>
                  <p className="text-gray-800 font-semibold mb-2">{experience.company}</p>
                  <p className="text-gray-600">{experience.description}</p>
                </div>
              ))}
            </div>
          </section>
          
          {/* Education */}
          <section className="education-section">
            <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-100 pb-2 mb-4">Formazione</h2>
            
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="pb-5 hover:bg-blue-50 transition-colors p-3 rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-blue-900">{edu.degree}</h3>
                    <span className="text-sm font-medium text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                      {formatDate(edu.startDate)} - {edu.current ? 'Presente' : formatDate(edu.endDate)}
                    </span>
                  </div>
                  <p className="text-gray-800 font-semibold mb-2">{edu.school}</p>
                  <p className="text-gray-600">{edu.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
        
        {/* Right column */}
        <div className="col-span-1">
          {/* Skills */}
          <section className="mb-6 skills-section bg-gray-50 p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-100 pb-2 mb-4">Competenze</h2>
            
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <p className="text-gray-700 font-medium">{skill.name}</p>
                    <span className="text-blue-700 text-sm">{skill.level * 2}/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${skill.level * 20}%` }} 
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Languages if available */}
          {personalInfo.languages && personalInfo.languages.length > 0 && (
            <section className="mb-6 bg-gray-50 p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-100 pb-2 mb-4">Lingue</h2>
              
              <div className="space-y-4">
                {personalInfo.languages.map((language, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <p className="text-gray-700 font-medium">{language.name}</p>
                      <span className="text-blue-700 text-sm">{language.level}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${language.level === 'Madrelingua' ? 100 : 
                                            language.level === 'Avanzato' ? 85 : 
                                            language.level === 'Intermedio' ? 65 : 
                                            language.level === 'Base' ? 40 : 20}%` }} 
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Driving License if available */}
          {personalInfo.drivingLicense && (
            <section className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-100 pb-2 mb-4">Patente di Guida</h2>
              <p className="text-gray-700 font-medium">Patente {personalInfo.drivingLicense}</p>
            </section>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="border-t py-4 px-10 text-center text-sm text-gray-500">
        Curriculum vitae di {personalInfo.firstName} {personalInfo.lastName} • Aggiornato al {new Date().toLocaleDateString('it-IT')}
      </footer>
    </div>
  );
};

export default CorporateTemplate;