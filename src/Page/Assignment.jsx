import React from "react";
import DepartmentDropdown from "../components/filterAssigments/Filter";
import TaskProgress from "../components/taskProgress/TaskProgress";
import JobForm from "../components/taskForm/TaskForm ";
import Tasks from "../components/Tasks/Tasks";
import TaskForm from "../components/taskForm/TaskForm ";
// import Test from "./test";

const Assignment = () => {
  return (
    <div className="pr-[120px] pl-[120px] pt-[40px] ">
      <div>
        <h1 className="font-firaGo text-4xl font-semibold pb-[52px] ">დავალებების გვერდი</h1>
      </div>

      <div className="">
        <DepartmentDropdown />
      </div>

      <div>
        <TaskProgress />
        <Tasks />
      </div>
    </div>
  );
};

export default Assignment;
