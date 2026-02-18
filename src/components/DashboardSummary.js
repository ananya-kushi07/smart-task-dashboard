import React from "react";

function DashboardSummary({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter(task => task.status === "Completed").length;
  const pending = total - completed;

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "20px"
    }}>
      <div style={cardStyle}>
        <h3>Total Tasks</h3>
        <p>{total}</p>
      </div>

      <div style={cardStyle}>
        <h3>Completed</h3>
        <p>{completed}</p>
      </div>

      <div style={cardStyle}>
        <h3>Pending</h3>
        <p>{pending}</p>
      </div>
    </div>
  );
}

const cardStyle = {
  backgroundColor: "#ffffff",
  padding: "20px",
  borderRadius: "12px",
  width: "30%",
  textAlign: "center",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  color: "#722F37"
};

export default DashboardSummary;