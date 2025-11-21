import { createContext, useContext, useReducer, useEffect } from "react";
import { STORAGE_KEYS } from "../constants/pomodoroSettings";
import { generateId } from "../utils/helpers";

// Action types
const ACTIONS = {
  SET_TASKS: "SET_TASKS",
  ADD_TASK: "ADD_TASK",
  UPDATE_TASK: "UPDATE_TASK",
  DELETE_TASK: "DELETE_TASK",
  CLEAR_TASKS: "CLEAR_TASKS",
};

// Initial state
const initialState = {
  tasks: [],
};

// Load tasks from localStorage
const loadTasksFromStorage = () => {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEYS.TASKS);
    return savedTasks ? JSON.parse(savedTasks) : [];
  } catch (error) {
    console.error("Error loading tasks from storage:", error);
    return [];
  }
};

// Save tasks to localStorage
const saveTasksToStorage = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving tasks to storage:", error);
  }
};

// Reducer function
const tasksReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };

    case ACTIONS.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, { ...action.payload, id: generateId() }],
      };

    case ACTIONS.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, ...action.payload.updates }
            : task
        ),
      };

    case ACTIONS.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    case ACTIONS.CLEAR_TASKS:
      return {
        ...state,
        tasks: [],
      };

    default:
      return state;
  }
};

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, initialState);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = loadTasksFromStorage();
    if (savedTasks.length > 0) {
      dispatch({ type: ACTIONS.SET_TASKS, payload: savedTasks });
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (state.tasks.length >= 0) {
      saveTasksToStorage(state.tasks);
    }
  }, [state.tasks]);

  // Action creators
  const addTask = (taskData) => {
    dispatch({ type: ACTIONS.ADD_TASK, payload: taskData });
  };

  const updateTask = (id, updates) => {
    dispatch({ type: ACTIONS.UPDATE_TASK, payload: { id, updates } });
  };

  const deleteTask = (id) => {
    dispatch({ type: ACTIONS.DELETE_TASK, payload: id });
  };

  const clearTasks = () => {
    dispatch({ type: ACTIONS.CLEAR_TASKS });
  };

  const getTaskById = (id) => {
    return state.tasks.find((task) => task.id === id);
  };

  const value = {
    tasks: state.tasks,
    addTask,
    updateTask,
    deleteTask,
    clearTasks,
    getTaskById,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};

export { useTask, TaskProvider };
