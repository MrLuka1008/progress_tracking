import React from "react";
import Tasks from "../components/Tasks/Tasks";

const Assignment = () => {
  return (
    <div className="pr-[120px] pl-[120px] pt-[40px] ">
      <div>
        <h1 className="font-firaGo text-4xl font-semibold pb-[52px] ">დავალებების გვერდი</h1>
      </div>

      {/* 
      <div className="z-10">
        <DepartmentDropdown />
      </div> */}

      <div className="z-0">
        <Tasks />
      </div>
    </div>
  );
};

export default Assignment;
