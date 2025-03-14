import React, { useState } from "react";
import Hourglass from "../header/Hourglass.png";
import EmployeeModal from "../employeeModal/EmployeeModal";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex h-[100px] items-center justify-between pr-[120px] pl-[120px]">
      <div className="flex a">
        <h1 className="font-fredoka text-first text-logo">Momentum</h1>
        <img src={Hourglass} className="h-[38px]" />
      </div>

      <div>
        <nav className="flex no-underline list-none gap-10">
          <li>
            <button
              onClick={() => setIsModalOpen(true)}
              className="py-[9px] px-[19px] border-[1px] text-black no-underline rounded-[5px] font-firaGo"
            >
              თანამშრომლის შექმნა
            </button>
          </li>
          <li>
            <a href="#" className="py-[10px] px-[20px] bg-first text-white no-underline rounded-[5px] font-firaGo">
              + შექმენი ახალი დავალება
            </a>
          </li>
        </nav>
      </div>

      <EmployeeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Header;
