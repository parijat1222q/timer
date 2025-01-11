import React, { useState, useCallback } from 'react';
import { Timer } from './components/Timer';
import { TaskList } from './components/TaskList';
import { AddTask } from './components/AddTask';
import { Settings } from './components/Settings';
import { Analytics } from './components/Analytics';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Task, TimerSettings, TimeLog } from './types';
import { Clock, BarChart2, Settings as SettingsIcon } from 'lucide-react';

const DEFAULT_SETTINGS: TimerSettings = {
  workDuration: 25 * 60,
  shortBreakDuration: 5 * 60,
  longBreakDuration: 15 * 60,
  longBreakInterval: 4
};

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('pomodoro-tasks', []);
  const [logs, setLogs] = useLocalStorage<TimeLog[]>('pomodoro-logs', []);
  const [settings, setSettings] = useLocalStorage<TimerSettings>('pomodoro-settings', DEFAULT_SETTINGS);
  const [selectedTaskId, setSelectedTaskId] = useState<string>();
  const [isBreak, setIsBreak] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  const handleAddTask = useCallback((title: string, pomodoros: number) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      pomodoros,
      completedPomodoros: 0,
      createdAt: new Date()
    };
    setTasks(prev => [...prev, newTask]);
  }, [setTasks]);

  const handleTaskComplete = useCallback((taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  }, [setTasks]);

  const handleTaskDelete = useCallback((taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    if (selectedTaskId === taskId) {
      setSelectedTaskId(undefined);
    }
  }, [selectedTaskId, setTasks]);

  const handleTimerComplete = useCallback(() => {
    const now = new Date();
    const duration = isBreak ? settings.shortBreakDuration : settings.workDuration;
    
    setLogs(prev => [...prev, {
      id: now.getTime().toString(),
      taskId: selectedTaskId || '',
      startTime: new Date(now.getTime() - duration * 1000),
      duration,
      type: isBreak ? 'shortBreak' : 'work'
    }]);

    if (!isBreak && selectedTaskId) {
      setTasks(prev => prev.map(task =>
        task.id === selectedTaskId
          ? { ...task, completedPomodoros: task.completedPomodoros + 1 }
          : task
      ));
      setCompletedPomodoros(prev => prev + 1);
    }
    
    setIsBreak(prev => !prev);
  }, [isBreak, selectedTaskId, settings, setLogs, setTasks]);

  const currentTask = tasks.find(task => task.id === selectedTaskId);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Pomodoro Timer</h1>
          <p className="text-gray-600">Stay focused and productive</p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Clock className="text-blue-500" />
                  <h2 className="text-xl font-semibold">Timer</h2>
                </div>
                {currentTask && (
                  <div className="text-sm text-gray-600">
                    Current Task: {currentTask.title}
                  </div>
                )}
              </div>
              
              <Timer
                duration={isBreak ? settings.shortBreakDuration : settings.workDuration}
                onComplete={handleTimerComplete}
                isBreak={isBreak}
              />
              
              <div className="mt-4 text-center text-sm text-gray-600">
                {isBreak ? 'Time for a break!' : 'Focus time'}
              </div>
            </div>

            <Settings settings={settings} onUpdate={setSettings} />
          </div>

          <div className="space-y-6">
            <AddTask onAdd={handleAddTask} />
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Tasks</h2>
              <TaskList
                tasks={tasks}
                onTaskComplete={handleTaskComplete}
                onTaskDelete={handleTaskDelete}
                onTaskSelect={setSelectedTaskId}
                selectedTaskId={selectedTaskId}
              />
              {tasks.length === 0 && (
                <div className="text-center text-gray-500 py-4">
                  No tasks yet. Add one to get started!
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Analytics logs={logs} tasks={tasks} />
        </div>
      </div>
    </div>
  );
}

export default App;