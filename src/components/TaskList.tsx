import React from 'react';
import { CheckCircle2, Circle, Trash2 } from 'lucide-react';
import type { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onTaskComplete: (taskId: string) => void;
  onTaskDelete: (taskId: string) => void;
  onTaskSelect: (taskId: string) => void;
  selectedTaskId?: string;
}

export function TaskList({ tasks, onTaskComplete, onTaskDelete, onTaskSelect, selectedTaskId }: TaskListProps) {
  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`flex items-center justify-between p-3 rounded-lg ${
            selectedTaskId === task.id ? 'bg-blue-50 border-2 border-blue-200' : 'bg-white'
          } hover:bg-gray-50 transition-colors cursor-pointer`}
          onClick={() => onTaskSelect(task.id)}
        >
          <div className="flex items-center space-x-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTaskComplete(task.id);
              }}
              className={`${task.completed ? 'text-green-500' : 'text-gray-400'} hover:text-green-600`}
            >
              {task.completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
            </button>
            <div className={`${task.completed ? 'line-through text-gray-500' : ''}`}>
              <div className="font-medium">{task.title}</div>
              <div className="text-sm text-gray-500">
                {task.completedPomodoros}/{task.pomodoros} pomodoros
              </div>
            </div>
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onTaskDelete(task.id);
            }}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}
    </div>
  );
}