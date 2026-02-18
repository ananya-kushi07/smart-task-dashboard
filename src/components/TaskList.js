import React from "react";
import TaskCard from "./TaskCard";

function TaskList({ tasks, deleteTask, updateTask, updateTaskStatus }) {
  return (
    <div>
      <h2>Task List</h2>

      {tasks.length === 0 ? (
        <p>No tasks added yet.</p>
      ) : (
        tasks.map((task) => (
        <TaskCard
  key={task.id}
  task={task}
  deleteTask={deleteTask}
  updateTask={updateTask}
  updateTaskStatus={updateTaskStatus}
/>
        ))
      )}
    </div>
  );
}

export default TaskList;