import React, { useState } from 'react';
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
import { Download, Save, Upload, FileText, Eye, EyeOff } from 'lucide-react';

const initialCVData: CVData = {
  personalInfo: {
    name: '',
    phone: '',
    email: '',
    address: '',
    linkedin: '',
    github: '',
    profilePhoto: undefined
  },
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

  const updatePersonalInfo = (personalInfo: PersonalInfo) => {
    setCVData({ ...cvData, personalInfo });
  };

  const updateSummary = (summary: string) => {
    setCVData({ ...cvData, summary });
  };

  const updateWorkExperience = (workExperience: WorkExperience[]) => {
    setCVData({ ...cvData, workExperience });
  };

  const updateEducation = (education: Education[]) => {
    setCVData({ ...cvData, education });
  };

  const updateSkills = (skills: Skill[]) => {
    setCVData({ ...cvData, skills });
  };

  const updateCertificates = (certificates: Certificate[]) => {
    setCVData({ ...cvData, certificates });
  };

  const updateLanguages = (languages: Language[]) => {
    setCVData({ ...cvData, languages });
  };

  const downloadPDF = async () => {
    const html2pdf = (await import('html2pdf.js')).default;
    const element = document.getElementById('cv-preview');
    
    if (element) {
      const opt = {
        margin: 0.5,
        filename: `${cvData.personalInfo.name || 'CV'}_Resume.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      
      await html2pdf().set(opt).from(element).save();
    }
  };

  const saveData = () => {
    setIsSaving(true);
    // Data is automatically saved to localStorage via the useLocalStorage hook
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  const loadData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          setCVData(data);
        } catch (error) {
          console.error('Error loading file:', error);
          alert('Error loading file. Please make sure it\'s a valid CV data file.');
        }
      };
      reader.readAsText(file);
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(cvData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${cvData.personalInfo.name || 'CV'}_data.json`;
    link.click();
  };

  const sections = [
    { id: 'personal', name: 'Personal Info', icon: '👤' },
    { id: 'summary', name: 'Summary', icon: '📝' },
    { id: 'experience', name: 'Experience', icon: '💼' },
    { id: 'education', name: 'Education', icon: '🎓' },
    { id: 'skills', name: 'Skills', icon: '⚡' },
    { id: 'certificates', name: 'Certificates', icon: '🏆' },
    { id: 'languages', name: 'Languages', icon: '🌐' }
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalInfoForm personalInfo={cvData.personalInfo} onChange={updatePersonalInfo} />;
      case 'summary':
        return <SummaryForm summary={cvData.summary} onChange={updateSummary} />;
      case 'experience':
        return <WorkExperienceForm workExperience={cvData.workExperience} onChange={updateWorkExperience} />;
      case 'education':
        return <EducationForm education={cvData.education} onChange={updateEducation} />;
      case 'skills':
        return <SkillsForm skills={cvData.skills} onChange={updateSkills} />;
      case 'certificates':
        return <CertificatesForm certificates={cvData.certificates} onChange={updateCertificates} />;
      case 'languages':
        return <LanguagesForm languages={cvData.languages} onChange={updateLanguages} />;
      default:
        return <PersonalInfoForm personalInfo={cvData.personalInfo} onChange={updatePersonalInfo} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">CV Builder</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="lg:hidden bg-gray-100 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </button>
              <input
                type="file"
                accept=".json"
                onChange={loadData}
                className="hidden"
                id="load-data"
              />
              <label
                htmlFor="load-data"
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                Load
              </label>
              <button
                onClick={saveData}
                disabled={isSaving}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Saved!' : 'Save'}
              </button>
              <button
                onClick={exportData}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              <button
                onClick={downloadPDF}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                PDF
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Left Side - Form */}
          <div className={`${showPreview ? 'lg:w-1/2' : 'w-full'} space-y-6`}>
            {/* Section Navigation */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`p-3 rounded-md text-sm font-medium transition-colors flex flex-col items-center gap-1 ${
                      activeSection === section.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-lg">{section.icon}</span>
                    <span className="hidden sm:block">{section.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Section Form */}
            {renderActiveSection()}
          </div>

          {/* Right Side - Preview */}
          {showPreview && (
            <div className="hidden lg:block lg:w-1/2">
              <div className="sticky top-8">
                <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">Live Preview</h2>
                  <p className="text-sm text-gray-600">
                    Your CV updates automatically as you fill out the form.
                  </p>
                </div>
                <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                  <CVPreview cvData={cvData} />
                </div>
              </div>
            </div>
          )}

          {/* Mobile Preview */}
          {showPreview && (
            <div className="lg:hidden fixed inset-0 bg-white z-50 overflow-y-auto">
              <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                <h2 className="text-lg font-semibold">Preview</h2>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
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
    </div>
  );
}

export default App;