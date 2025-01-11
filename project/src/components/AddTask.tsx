import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface AddTaskProps {
  onAdd: (title: string, pomodoros: number) => void;
}

export function AddTask({ onAdd }: AddTaskProps) {
  const [title, setTitle] = useState('');
  const [pomodoros, setPomodoros] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim(), pomodoros);
      setTitle('');
      setPomodoros(1);
      setIsExpanded(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full flex items-center justify-center space-x-2 py-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <Plus size={20} />
          <span>Add Task</span>
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What are you working on?"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          
          <div className="flex items-center space-x-4">
            <label className="text-sm text-gray-600">
              Estimated Pomodoros:
              <input
                type="number"
                min="1"
                max="10"
                value={pomodoros}
                onChange={(e) => setPomodoros(parseInt(e.target.value))}
                className="ml-2 w-16 p-1 border rounded"
              />
            </label>
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
}