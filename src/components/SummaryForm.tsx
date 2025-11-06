import React from 'react';
import { FileText } from 'lucide-react';

interface SummaryFormProps {
  summary: string;
  onChange: (summary: string) => void;
}

export default function SummaryForm({ summary, onChange }: SummaryFormProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        <FileText className="w-5 h-5 text-blue-600" />
        Professional Summary
      </h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Write a brief professional summary (2-3 sentences)
        </label>
        <textarea
          value={summary}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="A passionate software developer with 5+ years of experience in building scalable web applications. Skilled in React, Node.js, and cloud technologies. Committed to writing clean, maintainable code and delivering exceptional user experiences."
        />
      </div>
    </div>
  );
}