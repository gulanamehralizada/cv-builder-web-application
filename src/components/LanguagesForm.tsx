import React from 'react';
import { Language } from '../types/cv';
import { Globe, Plus, Trash2 } from 'lucide-react';

interface LanguagesFormProps {
  languages: Language[];
  onChange: (languages: Language[]) => void;
}

export default function LanguagesForm({ languages, onChange }: LanguagesFormProps) {
  const addLanguage = () => {
    const newLanguage: Language = {
      id: Date.now().toString(),
      name: '',
      proficiency: 'conversational'
    };
    onChange([...languages, newLanguage]);
  };

  const updateLanguage = (id: string, updates: Partial<Language>) => {
    onChange(languages.map(lang => lang.id === id ? { ...lang, ...updates } : lang));
  };

  const removeLanguage = (id: string) => {
    onChange(languages.filter(lang => lang.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-600" />
          Languages
        </h2>
        <button
          onClick={addLanguage}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Language
        </button>
      </div>

      <div className="space-y-3">
        {languages.map((language, index) => (
          <div key={language.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
            <div className="flex-1">
              <input
                type="text"
                value={language.name}
                onChange={(e) => updateLanguage(language.id, { name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., English, Spanish, French"
              />
            </div>
            <div className="w-40">
              <select
                value={language.proficiency}
                onChange={(e) => updateLanguage(language.id, { proficiency: e.target.value as Language['proficiency'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="basic">Basic</option>
                <option value="conversational">Conversational</option>
                <option value="fluent">Fluent</option>
                <option value="native">Native</option>
              </select>
            </div>
            <button
              onClick={() => removeLanguage(language.id)}
              className="text-red-600 hover:text-red-800 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        {languages.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Globe className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No languages added yet. Click "Add Language" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}