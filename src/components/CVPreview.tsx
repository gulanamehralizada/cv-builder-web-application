import React from 'react';
import { CVData } from '../types/cv';
import { Mail, Phone, MapPin, Linkedin, Github, Calendar, Award, Globe } from 'lucide-react';

interface CVPreviewProps { cvData: CVData; }

const CVPreview: React.FC<CVPreviewProps> = React.memo(({ cvData }) => {
  const { personalInfo, summary, workExperience = [], education = [], skills = [], certificates = [], languages = [] } = cvData;

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const technicalSkills = skills.filter(s => s.category === 'technical');
  const softSkills = skills.filter(s => s.category === 'soft');

  return (
    <div id="cv-preview" className="bg-white shadow-lg max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gray-50 p-8 border-b flex gap-6 items-start">
        {personalInfo.profilePhoto && (
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
            <img src={personalInfo.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{personalInfo.name || 'Your Name'}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {personalInfo.email && <div className="flex items-center gap-1"><Mail className="w-4 h-4" />{personalInfo.email}</div>}
            {personalInfo.phone && <div className="flex items-center gap-1"><Phone className="w-4 h-4" />{personalInfo.phone}</div>}
            {personalInfo.address && <div className="flex items-center gap-1"><MapPin className="w-4 h-4" />{personalInfo.address}</div>}
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-blue-600 mt-2">
            {personalInfo.linkedin && <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1"><Linkedin className="w-4 h-4" />LinkedIn</a>}
            {personalInfo.github && <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1"><Github className="w-4 h-4" />GitHub</a>}
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {summary && <section><h2 className="text-xl font-bold border-b pb-1 mb-3">Peşəkar Xülasə</h2><p className="text-gray-700">{summary}</p></section>}

        {workExperience.length > 0 && (
          <section>
            <h2 className="text-xl font-bold border-b pb-1 mb-4">İş təcrübəsi</h2>
            <div className="space-y-6">
              {workExperience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div><h3 className="font-semibold">{exp.position}</h3><p>{exp.company}</p></div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" /> {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </div>
                  </div>
                  {exp.responsibilities?.length > 0 && (
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      {exp.responsibilities.map((r, i) => r.trim() && <li key={i}>{r}</li>)}
                    </ul>
                  )}
                  {exp.achievements?.length > 0 && (
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      {exp.achievements.map((a, i) => a.trim() && <li key={i}>{a}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h2 className="text-xl font-bold border-b pb-1 mb-4">Təhsil</h2>
            <div className="space-y-4">
              {education.map(edu => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div><h3 className="font-semibold">{edu.degree}</h3><p>{edu.school}</p></div>
                    <div className="flex items-center gap-1 text-sm text-gray-600"><Calendar className="w-4 h-4" /> {formatDate(edu.startDate)} - {formatDate(edu.endDate)}</div>
                  </div>
                  {edu.certifications?.length > 0 && <ul className="list-disc list-inside text-sm text-gray-700">{edu.certifications.map((c, i) => c.trim() && <li key={i}>{c}</li>)}</ul>}
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2 className="text-xl font-bold border-b pb-1 mb-4">Bacarıqlar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {technicalSkills.length > 0 && <div><h3 className="font-semibold mb-3">Texniki Bacarıqlar</h3>{technicalSkills.map(s => <div key={s.id} className="flex justify-between">{s.name}<span className="text-sm text-gray-500 capitalize">{s.level}</span></div>)}</div>}
              {softSkills.length > 0 && <div><h3 className="font-semibold mb-3">Yumşaq bacarıqlar</h3>{softSkills.map(s => <div key={s.id} className="flex justify-between">{s.name}<span className="text-sm text-gray-500 capitalize">{s.level}</span></div>)}</div>}
            </div>
          </section>
        )}

        {certificates.length > 0 && (
          <section>
            <h2 className="text-xl font-bold border-b pb-1 mb-4 flex items-center gap-2"><Award className="w-5 h-5" />Sertifikatlar və Kurslar</h2>
            <div className="space-y-3">
              {certificates.map(cert => (
                <div key={cert.id} className="flex justify-between items-start">
                  <div><h3 className="font-semibold">{cert.name}</h3><p>{cert.issuer}</p></div>
                  <div className="flex items-center gap-1 text-sm text-gray-600"><Calendar className="w-4 h-4" /> {formatDate(cert.date)}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {languages.length > 0 && (
          <section>
            <h2 className="text-xl font-bold border-b pb-1 mb-4 flex items-center gap-2"><Globe className="w-5 h-5" />Dillər</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {languages.map(lang => <div key={lang.id} className="flex justify-between items-center">{lang.name}<span className="text-sm text-gray-500 capitalize">{lang.proficiency}</span></div>)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
});

export default CVPreview;
