"use client";

import { useState } from "react";
import { useTasks } from "@/context/TaskContext";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const { tasks } = useTasks();
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered =
    filterStatus === "all"
      ? tasks
      : tasks.filter((t) => t.status === filterStatus);

  return (
    <div>
      <select
        className="border p-2 mb-4"
        onChange={(e) => setFilterStatus(e.target.value)}
      >
        <option value="all">All</option>
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      {filtered.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}