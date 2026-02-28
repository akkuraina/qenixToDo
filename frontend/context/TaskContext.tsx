"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Task } from "@/types/task";

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, "_id">) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  fetchTasks: () => Promise<void>;
}

const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setTasks(data);
  };

  const addTask = async (task: Omit<Task, "_id">) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    });

    const newTask = await res.json();
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = async (updated: Task) => {
    const res = await fetch(
      `http://localhost:5000/tasks/${updated._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updated),
      }
    );

    const data = await res.json();
    setTasks((prev) =>
      prev.map((t) => (t._id === data._id ? data : t))
    );
  };

  const deleteTask = async (id: string) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  useEffect(() => {
    if (token) fetchTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, deleteTask, fetchTasks }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error("useTasks must be used within TaskProvider");
  return context;
};