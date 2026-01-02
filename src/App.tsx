import { useState } from 'react';
import { CVData, PersonalInfo, WorkExperience, Education, Skill, Certificate, Language } from './types/cv';
import { useLocalStorage } from './hooks/useLocalStorage';

import PersonalInfoForm from './components/PersonalInfoForm';
import SummaryForm from './components/SummaryForm';
import WorkExperienceForm from './components/WorkExperienceForm';
import EducationForm from './components/EducationForm';
import SkillsForm from './components/SkillsForm';
import CertificatesForm from './components/CertificatesForm';
import LanguagesForm from './components/LanguagesForm';
import CVPreview from './components/CVPreview';

import html2pdf from 'html2pdf.js';
import { Download, Save, FileText, Eye, EyeOff } from 'lucide-react';

const initialCVData: CVData = {
  personalInfo: { name: '', phone: '', email: '', address: '', linkedin: '', github: '', profilePhoto: undefined },
  summary: '',
  workExperience: [],
  education: [],
  skills: [],
  certificates: [],
  languages: []
};

function App() {
  const [cvData, setCVData] = useLocalStorage<CVData>('cv-builder-data', initialCVData);
  const [activeSection, setActiveSection] = useState('personal');
  const [showPreview, setShowPreview] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // ---------------- UPDATE HANDLERS ----------------
  const updatePersonalInfo = (personalInfo: PersonalInfo) => setCVData({ ...cvData, personalInfo });
  const updateSummary = (summary: string) => setCVData({ ...cvData, summary });
  const updateWorkExperience = (workExperience: WorkExperience[]) => setCVData({ ...cvData, workExperience });
  const updateEducation = (education: Education[]) => setCVData({ ...cvData, education });
  const updateSkills = (skills: Skill[]) => setCVData({ ...cvData, skills });
  const updateCertificates = (certificates: Certificate[]) => setCVData({ ...cvData, certificates });
  const updateLanguages = (languages: Language[]) => setCVData({ ...cvData, languages });

  // ---------------- PDF EXPORT ----------------
  const downloadPDF = async () => {
    const element = document.getElementById("cv-preview");
    if (!element) return;

    const opt = {
      margin: 0,
      filename: `${cvData.personalInfo.name || "CV"}_Resume.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 3, useCORS: true, scrollX: 0, scrollY: -window.scrollY },
      jsPDF: { orientation: "portrait", unit: "pt", format: "a4" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    try {
    await html2pdf().set(opt).from(element).save();
    } catch (error) {
    console.error("PDF generation failed:", error);
    alert("Failed to generate PDF. Please try again.");
   }
  };

  // ---------------- SAVE / LOAD / EXPORT JSON ----------------
  const saveData = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  // ---------------- SECTION NAVIGATION ----------------
  const sections = [
    { id: 'personal', name: 'Şəxsi məlumat', icon: '👤' },
    { id: 'summary', name: 'Xülasə', icon: '📝' },
    { id: 'experience', name: 'Təcrübə', icon: '💼' },
    { id: 'education', name: 'Təhsil', icon: '🎓' },
    { id: 'skills', name: 'Bacarıqlar', icon: '⚡' },
    { id: 'certificates', name: 'Sertifikatlar', icon: '🏆' },
    { id: 'languages', name: 'Dillər', icon: '🌐' }
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'personal': return <PersonalInfoForm personalInfo={cvData.personalInfo} onChange={updatePersonalInfo} />;
      case 'summary': return <SummaryForm summary={cvData.summary} onChange={updateSummary} />;
      case 'experience': return <WorkExperienceForm workExperience={cvData.workExperience} onChange={updateWorkExperience} />;
      case 'education': return <EducationForm education={cvData.education} onChange={updateEducation} />;
      case 'skills': return <SkillsForm skills={cvData.skills} onChange={updateSkills} />;
      case 'certificates': return <CertificatesForm certificates={cvData.certificates} onChange={updateCertificates} />;
      case 'languages': return <LanguagesForm languages={cvData.languages} onChange={updateLanguages} />;
      default: return <PersonalInfoForm personalInfo={cvData.personalInfo} onChange={updatePersonalInfo} />;
    }
  };

  // ---------------- UI LAYOUT ----------------
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">CV builder</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="lg:hidden bg-gray-100 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-200 flex items-center gap-2"
            >
              {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>

            <button onClick={saveData} disabled={isSaving} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-2 disabled:opacity-50">
              <Save className="w-4 h-4" /> {isSaving ? 'Saved!' : 'Save'}
            </button>

            <button onClick={downloadPDF} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center gap-2">
              <Download className="w-4 h-4" /> PDF
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* LEFT FORM */}
        <div className={`${showPreview ? 'lg:w-1/2' : 'w-full'} space-y-6`}>
          {/* Navigation */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`p-3 rounded-md text-sm font-medium flex flex-col items-center gap-1 transition-colors
                    ${activeSection === section.id ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}
                  `}
                  aria-label={section.name}
                >
                  <span className="text-lg">{section.icon}</span>
                  <span className="hidden sm:block">{section.name}</span>
                </button>
              ))}
            </div>
          </div>

          {renderActiveSection()}
        </div>

        {/* RIGHT PREVIEW (Desktop) */}
        {showPreview && (
          <div className="hidden lg:block lg:w-1/2">
            <div className="sticky top-8 space-y-4">
              <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-lg font-semibold">Canlı Önizləmə</h2>
                <p className="text-sm text-gray-600">Siz formanı doldurduğunuz zaman CV-niz avtomatik olaraq yenilənir.</p>
              </div>
              <CVPreview cvData={cvData} />
            </div>
          </div>
        )}

        {/* MOBILE PREVIEW */}
        {showPreview && (
          <div className="lg:hidden fixed inset-0 bg-white z-50 overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Önizləmə</h2>
              <button onClick={() => setShowPreview(false)} className="text-gray-600 hover:text-gray-800">
                <EyeOff className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <CVPreview cvData={cvData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
