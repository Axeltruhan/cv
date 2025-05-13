import React from 'react';
import { PersonalInfo, Experience, Education, Skill } from '@shared/schema';
import { formatDate } from '@/lib/utils/date-formatter';

interface ArtisticTemplateProps {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
}

const ArtisticTemplate = ({ personalInfo, experiences, education, skills }: ArtisticTemplateProps) => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Design elements - abstract shapes */}
      <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-gradient-to-tr from-pink-200/40 to-purple-300/40 -z-1"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-gradient-to-tr from-blue-200/30 to-indigo-300/30 -z-1"></div>
      
      <div className="relative p-8 z-10">
        {/* Header */}
        <header className="mb-10 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start mb-4">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                {personalInfo.firstName} {personalInfo.lastName}
              </h1>
              <p className="text-md md:text-lg text-gray-600 italic mt-1">{personalInfo.title}</p>
            </div>
            
            {/* Contact info in a creative style */}
            <div className="mt-4 md:mt-0 bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-purple-100 shadow-sm">
              <div className="flex items-center mb-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">{personalInfo.email}</span>
              </div>
              <div className="flex items-center mb-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">{personalInfo.phone}</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">{personalInfo.location}</span>
              </div>
            </div>
          </div>
          
          {/* A decorative underline */}
          <div className="h-1 w-full bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400"></div>
        </header>
        
        {/* About me */}
        <section className="mb-8 about-me">
          <div className="flex items-center mb-4">
            <h2 className="text-xl font-semibold text-purple-700">Su di me</h2>
            <div className="ml-4 h-px flex-grow bg-gradient-to-r from-purple-300 to-transparent"></div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-purple-100 shadow-sm">
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </div>
        </section>
        
        {/* Experience */}
        <section className="mb-8 experience-section">
          <div className="flex items-center mb-4">
            <h2 className="text-xl font-semibold text-purple-700">Esperienze Lavorative</h2>
            <div className="ml-4 h-px flex-grow bg-gradient-to-r from-purple-300 to-transparent"></div>
          </div>
          
          <div className="space-y-4">
            {experiences.map((experience, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-purple-100 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-800">{experience.title}</h3>
                  <span className="text-sm font-medium text-purple-600">
                    {formatDate(experience.startDate)} - {experience.current ? 'Presente' : formatDate(experience.endDate)}
                  </span>
                </div>
                <p className="text-purple-700 font-medium mb-1 italic">{experience.company}</p>
                <p className="text-gray-700 text-sm">{experience.description}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Education */}
        <section className="mb-8 education-section">
          <div className="flex items-center mb-4">
            <h2 className="text-xl font-semibold text-purple-700">Formazione</h2>
            <div className="ml-4 h-px flex-grow bg-gradient-to-r from-purple-300 to-transparent"></div>
          </div>
          
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-purple-100 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-800">{edu.degree}</h3>
                  <span className="text-sm font-medium text-purple-600">
                    {formatDate(edu.startDate)} - {edu.current ? 'Presente' : formatDate(edu.endDate)}
                  </span>
                </div>
                <p className="text-purple-700 font-medium mb-1 italic">{edu.school}</p>
                <p className="text-gray-700 text-sm">{edu.description}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Skills - in a creative grid */}
        <section className="skills-section">
          <div className="flex items-center mb-4">
            <h2 className="text-xl font-semibold text-purple-700">Competenze</h2>
            <div className="ml-4 h-px flex-grow bg-gradient-to-r from-purple-300 to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-purple-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center">
                  <div className="w-2 h-10 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium text-gray-800">{skill.name}</p>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                      <div 
                        className="bg-gradient-to-r from-purple-400 to-pink-500 h-1.5 rounded-full" 
                        style={{ width: `${skill.level * 20}%` }} 
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ArtisticTemplate;