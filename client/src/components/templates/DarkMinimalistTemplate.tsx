import React from 'react';
import { PersonalInfo, Experience, Education, Skill } from '@shared/schema';
import { formatDate } from '@/lib/utils/date-formatter';

interface DarkMinimalistTemplateProps {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
}

const DarkMinimalistTemplate = ({ personalInfo, experiences, education, skills }: DarkMinimalistTemplateProps) => {
  return (
    <div className="w-full h-full bg-black text-white overflow-hidden">
      <div className="flex flex-col h-full">
        {/* Header area */}
        <header className="px-12 pt-12 pb-8 bg-zinc-900">
          <h1 className="text-3xl md:text-4xl font-light tracking-tight mb-1">
            {personalInfo.firstName} <span className="font-bold">{personalInfo.lastName}</span>
          </h1>
          <p className="text-zinc-400 text-lg">{personalInfo.title}</p>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center">
              <div className="w-6 h-6 flex items-center justify-center mr-2 text-zinc-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-zinc-300">{personalInfo.email}</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 flex items-center justify-center mr-2 text-zinc-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <span className="text-zinc-300">{personalInfo.phone}</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 flex items-center justify-center mr-2 text-zinc-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="text-zinc-300">{personalInfo.location}</span>
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 px-12 py-8 bg-black">
          {/* Summary / About */}
          <section className="mb-10 about-me">
            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-4">Profilo</h2>
            <p className="text-zinc-300 leading-relaxed">{personalInfo.summary}</p>
          </section>
          
          {/* Experience */}
          <section className="mb-10 experience-section">
            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-4">Esperienza</h2>
            
            <div className="space-y-6">
              {experiences.map((experience, index) => (
                <div key={index} className="border-l-2 border-zinc-800 pl-4 hover:border-zinc-500 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1">
                    <h3 className="text-lg font-medium text-white">{experience.title}</h3>
                    <span className="text-xs font-medium text-zinc-500 tracking-wide">
                      {formatDate(experience.startDate)} — {experience.current ? 'Presente' : formatDate(experience.endDate)}
                    </span>
                  </div>
                  <p className="text-zinc-400 text-sm mb-2">{experience.company}</p>
                  <p className="text-zinc-400 text-sm">{experience.description}</p>
                </div>
              ))}
            </div>
          </section>
          
          {/* Education */}
          <section className="mb-10 education-section">
            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-4">Formazione</h2>
            
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="border-l-2 border-zinc-800 pl-4 hover:border-zinc-500 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1">
                    <h3 className="text-lg font-medium text-white">{edu.degree}</h3>
                    <span className="text-xs font-medium text-zinc-500 tracking-wide">
                      {formatDate(edu.startDate)} — {edu.current ? 'Presente' : formatDate(edu.endDate)}
                    </span>
                  </div>
                  <p className="text-zinc-400 text-sm mb-2">{edu.school}</p>
                  <p className="text-zinc-400 text-sm">{edu.description}</p>
                </div>
              ))}
            </div>
          </section>
          
          {/* Skills */}
          <section className="skills-section">
            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-4">Competenze</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
              {skills.map((skill, index) => (
                <div key={index} className="group">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-zinc-300 font-medium">{skill.name}</p>
                    <span className="text-xs text-zinc-500">{skill.level * 2}/10</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1">
                    <div 
                      className="bg-zinc-500 group-hover:bg-white h-1 transition-colors" 
                      style={{ width: `${skill.level * 20}%` }} 
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
        
        {/* Footer */}
        <footer className="py-4 text-center text-xs text-zinc-600 bg-zinc-900">
          © {new Date().getFullYear()} {personalInfo.firstName} {personalInfo.lastName}
        </footer>
      </div>
    </div>
  );
};

export default DarkMinimalistTemplate;