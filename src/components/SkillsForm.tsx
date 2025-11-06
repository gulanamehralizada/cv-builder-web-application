import React from 'react';
import { Skill } from '../types/cv';
import { Code, Users, Plus, Trash2 } from 'lucide-react';

interface SkillsFormProps {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
}

export default function SkillsForm({ skills, onChange }: SkillsFormProps) {
  const addSkill = (category: 'technical' | 'soft') => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      category,
      level: 'intermediate'
    };
    onChange([...skills, newSkill]);
  };

  const updateSkill = (id: string, updates: Partial<Skill>) => {
    onChange(skills.map(skill => skill.id === id ? { ...skill, ...updates } : skill));
  };

  const removeSkill = (id: string) => {
    onChange(skills.filter(skill => skill.id !== id));
  };

  const technicalSkills = skills.filter(skill => skill.category === 'technical');
  const softSkills = skills.filter(skill => skill.category === 'soft');

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        <Code className="w-5 h-5 text-blue-600" />
        Skills
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Technical Skills */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700 flex items-center gap-2">
              <Code className="w-4 h-4" />
              Technical Skills
            </h3>
            <button
              onClick={() => addSkill('technical')}
              className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-1 text-sm"
            >
              <Plus className="w-3 h-3" />
              Add
            </button>
          </div>
          <div className="space-y-3">
            {technicalSkills.map((skill) => (
              <div key={skill.id} className="flex items-center gap-2">
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., React, Python, AWS"
                />
                <select
                  value={skill.level}
                  onChange={(e) => updateSkill(skill.id, { level: e.target.value as Skill['level'] })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
                <button
                  onClick={() => removeSkill(skill.id)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {technicalSkills.length === 0 && (
              <p className="text-gray-500 text-sm">No technical skills added yet.</p>
            )}
          </div>
        </div>

        {/* Soft Skills */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Soft Skills
            </h3>
            <button
              onClick={() => addSkill('soft')}
              className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-1 text-sm"
            >
              <Plus className="w-3 h-3" />
              Add
            </button>
          </div>
          <div className="space-y-3">
            {softSkills.map((skill) => (
              <div key={skill.id} className="flex items-center gap-2">
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Leadership, Communication"
                />
                <select
                  value={skill.level}
                  onChange={(e) => updateSkill(skill.id, { level: e.target.value as Skill['level'] })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
                <button
                  onClick={() => removeSkill(skill.id)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {softSkills.length === 0 && (
              <p className="text-gray-500 text-sm">No soft skills added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}