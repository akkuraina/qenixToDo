"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Task Dashboard</h1>
        <TaskForm />
        <TaskList />
      </div>
    </ProtectedRoute>
  );
}