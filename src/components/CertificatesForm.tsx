import { Certificate } from '../types/cv';
import { Award, Plus, Trash2, ExternalLink } from 'lucide-react';

interface CertificatesFormProps {
  certificates: Certificate[];
  onChange: (certificates: Certificate[]) => void;
}

export default function CertificatesForm({ certificates, onChange }: CertificatesFormProps) {
  const addCertificate = () => {
    const newCertificate: Certificate = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      url: ''
    };
    onChange([...certificates, newCertificate]);
  };

  const updateCertificate = (id: string, updates: Partial<Certificate>) => {
    onChange(certificates.map(cert => cert.id === id ? { ...cert, ...updates } : cert));
  };

  const removeCertificate = (id: string) => {
    onChange(certificates.filter(cert => cert.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Award className="w-5 h-5 text-blue-600" />
          Sertifikatlar və Kurslar
        </h2>
        <button
          onClick={addCertificate}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Sertifikat əlavə edin
        </button>
      </div>

      <div className="space-y-4">
        {certificates.map((cert, index) => (
          <div key={cert.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-800">Sertifikat #{index + 1}</h3>
              <button
                onClick={() => removeCertificate(cert.id)}
                className="text-red-600 hover:text-red-800 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sertifikat/Kursun Adı *
                </label>
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => updateCertificate(cert.id, { name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="AWS Certified Solutions Architect"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Qurumun adı *
                </label>
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) => updateCertificate(cert.id, { issuer: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Amazon Web Services"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buraxılış tarixi *
                </label>
                <input
                  type="month"
                  value={cert.date}
                  onChange={(e) => updateCertificate(cert.id, { date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <ExternalLink className="w-4 h-4 inline mr-1" />
                  Sertifikat URL-i (isteğe bağlı)
                </label>
                <input
                  type="url"
                  value={cert.url || ''}
                  onChange={(e) => updateCertificate(cert.id, { url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>
        ))}
        {certificates.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Award className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Hələ heç bir sertifikat əlavə edilməyib. Başlamaq üçün "Sertifikat əlavə et" düyməsini basın.</p>
          </div>
        )}
      </div>
    </div>
  );
}