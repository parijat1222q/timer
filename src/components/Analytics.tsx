import React from 'react';
import { BarChart2, Clock, CheckSquare, Calendar } from 'lucide-react';
import type { TimeLog, Task } from '../types';

interface AnalyticsProps {
  logs: TimeLog[];
  tasks: Task[];
}

export function Analytics({ logs, tasks }: AnalyticsProps) {
  const today = new Date().toISOString().split('T')[0];
  const todayLogs = logs.filter(log => 
    log.startTime.toISOString().startsWith(today)
  );

  const totalWorkMinutes = logs
    .filter(log => log.type === 'work')
    .reduce((acc, log) => acc + log.duration / 60, 0);

  const weeklyData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    const dayLogs = logs.filter(log => 
      log.startTime.toISOString().startsWith(dateStr) &&
      log.type === 'work'
    );
    
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      count: dayLogs.length,
      minutes: dayLogs.reduce((acc, log) => acc + log.duration / 60, 0)
    };
  }).reverse();

  const taskStats = tasks.map(task => ({
    title: task.title,
    completed: task.completedPomodoros,
    total: task.pomodoros
  }));

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <BarChart2 className="text-blue-500" />
          <h2 className="text-xl font-semibold">Today's Progress</h2>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="text-blue-500" size={20} />
              <div className="text-sm text-gray-600">Focus Time</div>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(todayLogs.filter(log => log.type === 'work')
                .reduce((acc, log) => acc + log.duration / 60, 0))} min
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <CheckSquare className="text-green-500" size={20} />
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="text-2xl font-bold text-green-600">
              {todayLogs.filter(log => log.type === 'work').length}
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="text-purple-500" size={20} />
              <div className="text-sm text-gray-600">Total Hours</div>
            </div>
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(totalWorkMinutes / 60)}h
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Weekly Overview</h3>
        <div className="h-48 flex items-end space-x-2">
          {weeklyData.map((data, i) => (
            <div key={i} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-blue-500 rounded-t"
                style={{ height: `${(data.minutes / 60) * 20}%` }}
              />
              <div className="text-sm text-gray-600 mt-2">{data.day}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Task Progress</h3>
        <div className="space-y-4">
          {taskStats.map((stat, i) => (
            <div key={i}>
              <div className="flex justify-between text-sm mb-1">
                <span>{stat.title}</span>
                <span>{stat.completed}/{stat.total}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${(stat.completed / stat.total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}