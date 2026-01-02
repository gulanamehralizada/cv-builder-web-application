import { WorkExperience } from '../types/cv';
import { Briefcase, Plus, Trash2 } from 'lucide-react';

interface WorkExperienceFormProps {
  workExperience: WorkExperience[];
  onChange: (workExperience: WorkExperience[]) => void;
}

export default function WorkExperienceForm({ workExperience, onChange }: WorkExperienceFormProps) {
  const addExperience = () => {
    const newExperience: WorkExperience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      responsibilities: [''],
      achievements: ['']
    };
    onChange([...workExperience, newExperience]);
  };

  const updateExperience = (id: string, updates: Partial<WorkExperience>) => {
    onChange(workExperience.map(exp => exp.id === id ? { ...exp, ...updates } : exp));
  };

  const removeExperience = (id: string) => {
    onChange(workExperience.filter(exp => exp.id !== id));
  };

  const addResponsibility = (id: string) => {
    const experience = workExperience.find(exp => exp.id === id);
    if (experience) {
      updateExperience(id, {
        responsibilities: [...experience.responsibilities, '']
      });
    }
  };

  const updateResponsibility = (id: string, index: number, value: string) => {
    const experience = workExperience.find(exp => exp.id === id);
    if (experience) {
      const newResponsibilities = [...experience.responsibilities];
      newResponsibilities[index] = value;
      updateExperience(id, { responsibilities: newResponsibilities });
    }
  };

  const removeResponsibility = (id: string, index: number) => {
    const experience = workExperience.find(exp => exp.id === id);
    if (experience && experience.responsibilities.length > 1) {
      const newResponsibilities = experience.responsibilities.filter((_, i) => i !== index);
      updateExperience(id, { responsibilities: newResponsibilities });
    }
  };

  const addAchievement = (id: string) => {
    const experience = workExperience.find(exp => exp.id === id);
    if (experience) {
      updateExperience(id, {
        achievements: [...experience.achievements, '']
      });
    }
  };

  const updateAchievement = (id: string, index: number, value: string) => {
    const experience = workExperience.find(exp => exp.id === id);
    if (experience) {
      const newAchievements = [...experience.achievements];
      newAchievements[index] = value;
      updateExperience(id, { achievements: newAchievements });
    }
  };

  const removeAchievement = (id: string, index: number) => {
    const experience = workExperience.find(exp => exp.id === id);
    if (experience && experience.achievements.length > 1) {
      const newAchievements = experience.achievements.filter((_, i) => i !== index);
      updateExperience(id, { achievements: newAchievements });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-blue-600" />
          İş təcrübəsi
        </h2>
        <button
          onClick={addExperience}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Təcrübə əlavə edin
        </button>
      </div>

      <div className="space-y-6">
        {workExperience.map((exp, index) => (
          <div key={exp.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-800">Təcrübə #{index + 1}</h3>
              <button
                onClick={() => removeExperience(exp.id)}
                className="text-red-600 hover:text-red-800 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Şirkət *
                </label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Company Name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vəzifə *
                </label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Job Title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Başlama tarixi *
                </label>
                <input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bitmə tarixi
                </label>
                <input
                  type="month"
                  value={exp.endDate}
                  onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                  disabled={exp.current}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                />
                <label className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) => updateExperience(exp.id, {
                      current: e.target.checked,
                      endDate: e.target.checked ? '' : exp.endDate
                    })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-600">Currently working here</span>
                </label>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Əsas Məsuliyyətlər
                </label>
                <button
                  onClick={() => addResponsibility(exp.id)}
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  Əlavə edin
                </button>
              </div>
              {exp.responsibilities.map((responsibility, respIndex) => (
                <div key={respIndex} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={responsibility}
                    onChange={(e) => updateResponsibility(exp.id, respIndex, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe your responsibility"
                  />
                  {exp.responsibilities.length > 1 && (
                    <button
                      onClick={() => removeResponsibility(exp.id, respIndex)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Əsas Nailiyyətlər
                </label>
                <button
                  onClick={() => addAchievement(exp.id)}
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  Əlavə edin
                </button>
              </div>
              {exp.achievements.map((achievement, achIndex) => (
                <div key={achIndex} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={achievement}
                    onChange={(e) => updateAchievement(exp.id, achIndex, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe your achievement"
                  />
                  {exp.achievements.length > 1 && (
                    <button
                      onClick={() => removeAchievement(exp.id, achIndex)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}