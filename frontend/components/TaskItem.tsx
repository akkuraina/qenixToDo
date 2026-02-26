"use client";

import { useState } from "react";
import { Task } from "@/types/task";
import { useTasks } from "@/context/TaskContext";

interface Props {
  task: Task;
}

export default function TaskItem({ task }: Props) {
  const { updateTask, deleteTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState(task.status);
  const [priority, setPriority] = useState(task.priority);

  const handleUpdate = () => {
    updateTask({
      ...task,
      title,
      status,
      priority,
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="border p-4 mb-3 rounded space-y-2">
        <input
          className="w-full border p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="flex gap-2">
          <select
            className="border p-2"
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <select
            className="border p-2"
            value={priority}
            onChange={(e) => setPriority(e.target.value as any)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleUpdate}
            className="bg-black text-white px-3 py-1"
          >
            Save
          </button>

          <button
            onClick={() => setIsEditing(false)}
            className="border px-3 py-1"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border p-4 mb-3 rounded flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{task.title}</h3>
        <p className="text-sm text-gray-500">
          Status: {task.status} | Priority: {task.priority}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="border px-3 py-1"
        >
          Edit
        </button>

        <button
          onClick={() => deleteTask(task.id)}
          className="bg-red-500 text-white px-3 py-1"
        >
          Delete
        </button>
      </div>
    </div>
  );
}