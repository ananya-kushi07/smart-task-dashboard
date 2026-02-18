import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import DashboardSummary from "./components/DashboardSummary";

function App() {


  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("None");

  
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
  };

  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  const updateTaskStatus = (id, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const filteredTasks = tasks
    .filter((task) =>
      statusFilter === "All" ? true : task.status === statusFilter
    )
    .filter((task) =>
      priorityFilter === "All" ? true : task.priority === priorityFilter
    )
    .sort((a, b) => {
      if (sortOrder === "Ascending") {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      if (sortOrder === "Descending") {
        return new Date(b.dueDate) - new Date(a.dueDate);
      }
      return 0;
    });

  return (
    <div style={{
  maxWidth: "900px",
  margin: "auto",
  padding: "30px",
  backgroundColor: "#F8C8DC",
  minHeight: "100vh",
  borderRadius: "20px"
}}>
      <h1>Smart Task Management Dashboard</h1>

      <TaskForm addTask={addTask} />

<DashboardSummary tasks={tasks} />
      <h3>Filters</h3>

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="All">All Status</option>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <select
        value={priorityFilter}
        onChange={(e) => setPriorityFilter(e.target.value)}
        style={{ marginLeft: "10px" }}
      >
        <option value="All">All Priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        style={{ marginLeft: "10px" }}
      >
        <option value="None">Sort by Due Date</option>
        <option value="Ascending">Ascending</option>
        <option value="Descending">Descending</option>
      </select>

      <TaskList
        tasks={filteredTasks}
        deleteTask={deleteTask}
        updateTask={updateTask}
        updateTaskStatus={updateTaskStatus}
      />
    </div>
  );
}

export default App;