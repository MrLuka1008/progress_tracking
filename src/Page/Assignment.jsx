import React from "react";
import DepartmentDropdown from "../components/filterAssigments/Filter";
import Test from "./test";

const Assignment = () => {
  return (
    <div className="pr-[120px] pl-[120px] pt-[40px] ">
      <div>
        <h1 className="font-firaGo text-4xl font-semibold pb-[52px] ">დავალებების გვერდი</h1>
      </div>

      <div className="">
        <DepartmentDropdown />
      </div>

      {/* <Test /> */}
    </div>
  );
};

export default Assignment;
