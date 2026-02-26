"use client";

import { useState } from "react";
import { useTasks } from "@/context/TaskContext";

export default function TaskForm() {
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask({
      title,
      description: "",
      status: status as any,
      priority: priority as any,
    });
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-4">
      <input
        className="w-full border p-2"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <div className="flex gap-2">
        <select
          className="border p-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <select
          className="border p-2"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button className="bg-black text-white px-4">Add</button>
      </div>
    </form>
  );
}