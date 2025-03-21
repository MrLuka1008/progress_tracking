import axios from "axios";
import React, { useEffect, useState } from "react";

const TaskInfo = () => {
  const token = import.meta.env.VITE_API_TOKEN;
  const [taskDetails, setTaskDetails] = useState(null);
  const taskId = 1455;

  const fetchTaskDetails = async (taskId) => {
    try {
      const response = await axios.get(`https://momentum.redberryinternship.ge/api/tasks/${taskId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      setTaskDetails(response.data);
    } catch (error) {
      console.error("❌ Error fetching task details:", error);
      if (error.response) {
        console.error("Server Response:", error.response.data);
      }
    }
  };

  console.log(taskDetails);

  useEffect(() => {
    fetchTaskDetails(taskId);
  }, [taskId]);

  if (!taskDetails) {
    return <div>Loading task details...</div>;
  }

  return (
    <div>
      <h2>{taskDetails.name}</h2>
      <p>{taskDetails.description}</p>
      <p>Priority: {taskDetails.priority.name}</p>
      <p>Department: {taskDetails.department.name}</p>
      <p>Status: {taskDetails.status.name}</p>
    </div>
  );
};

export default TaskInfo;
