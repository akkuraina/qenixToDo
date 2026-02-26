"use client";

import { createContext, useContext, useState } from "react";
import { Task } from "@/types/task";
import { v4 as uuidv4 } from "uuid";

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Omit<Task, "id">) => {
    setTasks([...tasks, { ...task, id: uuidv4() }]);
  };

  const updateTask = (updated: Task) => {
    setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within TaskProvider");
  return context;
};