import React, { useState } from "react";

function TaskCard({ task, deleteTask, updateTask, updateTaskStatus }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedPriority, setEditedPriority] = useState(task.priority);
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate);


  const getStatusColor = () => {
    if (task.status === "To Do") return "#f8d7da";        
    if (task.status === "In Progress") return "#fff3cd";  
    if (task.status === "Completed") return "#d4edda";   
    return "white";
  };

  const handleUpdate = () => {
    const updatedTask = {
      ...task,
      title: editedTitle,
      description: editedDescription,
      priority: editedPriority,
      dueDate: editedDueDate,
    };

    updateTask(updatedTask);
    setIsEditing(false);
  };

  return (
    <div
      style={{
        border: "2px solid #722F37",
borderRadius: "12px",
boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        padding: "15px",
        marginBottom: "15px",
        borderRadius: "8px",
        backgroundColor: getStatusColor(),
      }}
    >
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <br /><br />

          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <br /><br />

          <select
            value={editedPriority}
            onChange={(e) => setEditedPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <br /><br />

          <input
            type="date"
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
          />
          <br /><br />

          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p><strong>Priority:</strong> {task.priority}</p>
          <p><strong>Due Date:</strong> {task.dueDate}</p>

         
          <p>
            <strong>Status:</strong>{" "}
            <select
              value={task.status}
              onChange={(e) =>
                updateTaskStatus(task.id, e.target.value)
              }
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </p>

          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </>
      )}
    </div>
  );
}

export default TaskCard;