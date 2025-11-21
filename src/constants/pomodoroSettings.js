// Pomodoro Timer Settings
export const POMODORO_SETTINGS = {
  FOCUS_DURATION: 25, // minutes
  SHORT_BREAK: 5, // minutes
  LONG_BREAK: 15, // minutes
  POMODOROS_UNTIL_LONG_BREAK: 4,
};

// Timer States
export const TIMER_MODES = {
  FOCUS: "focus",
  SHORT_BREAK: "short_break",
  LONG_BREAK: "long_break",
};

// Timer Status
export const TIMER_STATUS = {
  IDLE: "idle",
  RUNNING: "running",
  PAUSED: "paused",
  COMPLETED: "completed",
};

// Storage Keys
export const STORAGE_KEYS = {
  TASKS: "pomodoro_tasks",
  SETTINGS: "pomodoro_settings",
};
