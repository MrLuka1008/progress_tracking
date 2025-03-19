import axios from "axios";
import React, { useEffect, useState } from "react";

const colors = ["rgba(247, 188, 48, 1)", "rgba(251, 86, 7, 1)", "rgba(255, 0, 110, 1)", "rgba(58, 134, 255, 1)"];

const getRandomColor = () => {
  return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, 1)`;
};

const TaskProgress = () => {
  const [process, setProcess] = useState([]);

  useEffect(() => {
    axios
      .get("https://momentum.redberryinternship.ge/api/statuses")
      .then((response) => {
        setProcess(response.data);
      })
      .catch((error) => console.error("Error fetching statuses:", error));
  }, []);

  return (
    <div className="flex gap-14 justify-between">
      {process.map((item, index) => (
        <div
          key={item.id}
          className="w-[25%] pt-4 pb-4"
          style={{ backgroundColor: index < colors.length ? colors[index] : getRandomColor() }}
        >
          <h1 className="font-firaGo text-[20px] text-center text-white">{item.name}</h1>
        </div>
      ))}
    </div>
  );
};

export default TaskProgress;
