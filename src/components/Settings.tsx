import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import type { TimerSettings } from '../types';

interface SettingsProps {
  settings: TimerSettings;
  onUpdate: (settings: TimerSettings) => void;
}

export function Settings({ settings, onUpdate }: SettingsProps) {
  const handleChange = (key: keyof TimerSettings, value: number) => {
    onUpdate({ ...settings, [key]: value * 60 }); // Convert minutes to seconds
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center space-x-2 mb-4">
        <SettingsIcon className="text-blue-500" />
        <h2 className="text-xl font-semibold">Timer Settings</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Work Duration (minutes)
            <input
              type="number"
              min="1"
              max="60"
              value={settings.workDuration / 60}
              onChange={(e) => handleChange('workDuration', parseInt(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </label>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Short Break Duration (minutes)
            <input
              type="number"
              min="1"
              max="30"
              value={settings.shortBreakDuration / 60}
              onChange={(e) => handleChange('shortBreakDuration', parseInt(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </label>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Long Break Duration (minutes)
            <input
              type="number"
              min="1"
              max="60"
              value={settings.longBreakDuration / 60}
              onChange={(e) => handleChange('longBreakDuration', parseInt(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </label>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Long Break Interval (pomodoros)
            <input
              type="number"
              min="1"
              max="10"
              value={settings.longBreakInterval}
              onChange={(e) => handleChange('longBreakInterval', parseInt(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </label>
        </div>
      </div>
    </div>
  );
}