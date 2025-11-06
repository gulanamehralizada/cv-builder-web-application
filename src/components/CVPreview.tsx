import React from 'react';
import { CVData } from '../types/cv';
import { Mail, Phone, MapPin, Linkedin, Github, Calendar, Award, Globe } from 'lucide-react';

interface CVPreviewProps {
  cvData: CVData;
}

export default function CVPreview({ cvData }: CVPreviewProps) {
  const { personalInfo, summary, workExperience, education, skills, certificates, languages } = cvData;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const technicalSkills = skills.filter(skill => skill.category === 'technical');
  const softSkills = skills.filter(skill => skill.category === 'soft');

  return (
    <div id="cv-preview" className="bg-white shadow-lg max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gray-50 p-8 border-b">
        <div className="flex items-start gap-6">
          {personalInfo.profilePhoto && (
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
              <img 
                src={personalInfo.profilePhoto} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {personalInfo.name || 'Your Name'}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              {personalInfo.email && (
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {personalInfo.email}
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  {personalInfo.phone}
                </div>
              )}
              {personalInfo.address && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {personalInfo.address}
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-blue-600 mt-2">
              {personalInfo.linkedin && (
                <div className="flex items-center gap-1">
                  <Linkedin className="w-4 h-4" />
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-center gap-1">
                  <Github className="w-4 h-4" />
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Professional Summary */}
        {summary && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          </section>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-1">
              Work Experience
            </h2>
            <div className="space-y-6">
              {workExperience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-gray-700 font-medium">{exp.company}</p>
                    </div>
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </div>
                  </div>
                  {exp.responsibilities.some(r => r.trim()) && (
                    <div className="mb-2">
                      <h4 className="text-sm font-semibold text-gray-800 mb-1">Key Responsibilities:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        {exp.responsibilities.filter(r => r.trim()).map((responsibility, index) => (
                          <li key={index}>{responsibility}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {exp.achievements.some(a => a.trim()) && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 mb-1">Key Achievements:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        {exp.achievements.filter(a => a.trim()).map((achievement, index) => (
                          <li key={index}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-1">
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-700 font-medium">{edu.school}</p>
                    </div>
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </div>
                  </div>
                  {edu.certifications.some(c => c.trim()) && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 mb-1">Honors & Certifications:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-700">
                        {edu.certifications.filter(c => c.trim()).map((cert, index) => (
                          <li key={index}>{cert}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-1">
              Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {technicalSkills.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Technical Skills</h3>
                  <div className="space-y-2">
                    {technicalSkills.map((skill) => (
                      <div key={skill.id} className="flex justify-between items-center">
                        <span className="text-gray-700">{skill.name}</span>
                        <span className="text-sm text-gray-500 capitalize">{skill.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {softSkills.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Soft Skills</h3>
                  <div className="space-y-2">
                    {softSkills.map((skill) => (
                      <div key={skill.id} className="flex justify-between items-center">
                        <span className="text-gray-700">{skill.name}</span>
                        <span className="text-sm text-gray-500 capitalize">{skill.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Certificates */}
        {certificates.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-1 flex items-center gap-2">
              <Award className="w-5 h-5" />
              Certificates & Courses
            </h2>
            <div className="space-y-3">
              {certificates.map((cert) => (
                <div key={cert.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                    <p className="text-gray-700">{cert.issuer}</p>
                  </div>
                  <div className="text-sm text-gray-600 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(cert.date)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-1 flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Languages
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {languages.map((language) => (
                <div key={language.id} className="flex justify-between items-center">
                  <span className="text-gray-700">{language.name}</span>
                  <span className="text-sm text-gray-500 capitalize">{language.proficiency}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}