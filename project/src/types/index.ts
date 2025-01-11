export interface Task {
  id: string;
  title: string;
  completed: boolean;
  pomodoros: number;
  completedPomodoros: number;
  createdAt: Date;
}

export interface TimerSettings {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number;
}

export interface TimeLog {
  id: string;
  taskId: string;
  startTime: Date;
  duration: number;
  type: 'work' | 'shortBreak' | 'longBreak';
}