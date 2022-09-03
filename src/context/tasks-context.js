import { createContext, useContext, useState } from "react";

const TaskContext = createContext([]);

const TaskProvider = ({ children }) => {
  const val = [
    { id: "1", title: "Gym", description: "gymmer", duration: "5", break: "4" },
    { id: "2", title: "Gym", description: "gymmer", duration: "5", break: "4" },
    { id: "3", title: "Gym", description: "gymmer", duration: "5", break: "4" },
    { id: "4", title: "Gym", description: "gymmer", duration: "5", break: "4" },
    { id: "5", title: "Gym", description: "gymmer", duration: "5", break: "4" },
  ];

  const [tasksDB, setTasksDB] = useState(val);
  console.log(tasksDB);
  return (
    <TaskContext.Provider value={{ tasksDB, setTasksDB }}>
      {children}
    </TaskContext.Provider>
  );
};

const useTask = () => useContext(TaskContext);

export { useTask, TaskProvider };
