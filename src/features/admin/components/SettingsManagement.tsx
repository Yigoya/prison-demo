import React, { useState } from 'react';
import { mockSettings, SystemSettings } from '../../../data/mockData';

export const SettingsManagement: React.FC = () => {
  const [settings, setSettings] = useState<SystemSettings[]>(mockSettings);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const handleEdit = (setting: SystemSettings) => {
    setEditingId(setting.id);
    setEditValue(setting.value);
  };

  const handleSave = (settingId: string) => {
    setSettings(settings.map(setting =>
      setting.id === settingId ? { ...setting, value: editValue } : setting
    ));
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue('');
  };

  const groupedSettings = settings.reduce((acc, setting) => {
    if (!acc[setting.category]) {
      acc[setting.category] = [];
    }
    acc[setting.category].push(setting);
    return acc;
  }, {} as Record<string, SystemSettings[]>);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">System Settings</h2>

      {Object.entries(groupedSettings).map(([category, categorySettings]) => (
        <div key={category} className="mb-8">
          <h3 className="text-lg font-semibold mb-4 capitalize">{category}</h3>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Setting</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categorySettings.map((setting) => (
                  <tr key={setting.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {setting.key}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {editingId === setting.id ? (
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="border border-gray-300 rounded px-2 py-1 text-sm"
                        />
                      ) : (
                        setting.value
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {setting.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {editingId === setting.id ? (
                        <>
                          <button
                            onClick={() => handleSave(setting.id)}
                            className="text-green-600 hover:text-green-900 mr-4"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancel}
                            className="text-red-600 hover:text-red-900"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleEdit(setting)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}; 