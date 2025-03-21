import React, { useState, useEffect } from "react";
import axios from "axios";
import { MessageCircle } from "lucide-react";
import { X } from "lucide-react";
import { Menu } from "@headlessui/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import TaskInfo from "../taskInfo/TaskInfo";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [priorities, setPriorities] = useState([]);

  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedPriorities, setSelectedPriorities] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const [openDropdown, setOpenDropdown] = useState(null);

  const token = import.meta.env.VITE_API_TOKEN;

  const toggleSelection = (option, setSelected, selected) => {
    setSelected((prev) => (prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]));
  };

  const removeFilter = (option, setSelected) => {
    setSelected((prev) => prev.filter((item) => item !== option));
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("https://momentum.redberryinternship.ge/api/employees", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      console.error("❌ Error fetching employees:", error);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("https://momentum.redberryinternship.ge/api/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setTasks(response.data);
      } catch (error) {
        console.error("❌ Error fetching tasks:", error);
      }
    };

    const fetchStatuses = async () => {
      try {
        const response = await axios.get("https://momentum.redberryinternship.ge/api/statuses");
        setStatuses(response.data);
      } catch (error) {
        console.error("❌ Error fetching statuses:", error);
      }
    };

    const fetchDepartments = async () => {
      try {
        const response = await axios.get("https://momentum.redberryinternship.ge/api/departments");
        setDepartments(response.data.map((item) => item.name));
      } catch (error) {
        console.error("❌ Error fetching departments:", error);
      }
    };

    const fetchPriorities = async () => {
      try {
        const response = await axios.get("https://momentum.redberryinternship.ge/api/priorities");
        setPriorities(response.data.map((item) => item.name));
      } catch (error) {
        console.error("❌ Error fetching priorities:", error);
      }
    };

    fetchTasks();
    fetchStatuses();
    fetchDepartments();
    fetchPriorities();
    fetchData().then((data) => {
      if (data) {
        setEmployees(data.map((item) => item.name));
      }
    });
  }, []);

  const resetFilters = () => {
    setSelectedDepartments("");
    setSelectedEmployees("");
    setSelectedPriorities("");
  };

  const filterTasks = (tasks) => {
    let filtered = tasks;

    if (selectedDepartments.length > 0) {
      filtered = filtered.filter((task) => selectedDepartments.includes(task.department.name));
    }

    if (selectedPriorities.length > 0) {
      filtered = filtered.filter((task) => selectedPriorities.includes(task.priority.name));
    }

    if (selectedEmployees.length > 0) {
      filtered = filtered.filter((task) => selectedEmployees.includes(task.employee.name));
    }

    return filtered;
  };

  const getRandomColor = () => {
    return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, 1)`;
  };

  const colors = ["rgba(247, 188, 48, 1)", "rgba(251, 86, 7, 1)", "rgba(255, 0, 110, 1)", "rgba(58, 134, 255, 1)"];

  const click = (task) => {
    console.log(task);
  };
  return (
    <div className="flex flex-col gap-4 w-auto mx-auto">
      {/* Filters */}

      <div className="flex gap-11 border p-2 rounded-sm border-first w-fit">
        {[
          { label: "დეპარტამენტი", options: departments, state: selectedDepartments, setState: setSelectedDepartments },
          { label: "პრიორიტეტი", options: priorities, state: selectedPriorities, setState: setSelectedPriorities },
          { label: "თანამშრომელი", options: employees, state: selectedEmployees, setState: setSelectedEmployees },
        ].map(({ label, options, state, setState }, index) => (
          <Menu key={label} as="div" className="relative">
            <Menu.Button
              onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
              className="flex items-center gap-2 px-4 py-2 "
            >
              {label} {openDropdown === index ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </Menu.Button>
            <Menu.Items className="absolute left-0 mt-5 w-96 bg-white border rounded-md shadow-md p-2 border-first ">
              {options.map((option) => (
                <div
                  key={option}
                  className="flex items-center gap-2 py-1 px-2 cursor-pointer hover:bg-gray-100 rounded-md "
                  onClick={() => toggleSelection(option, setState, state)}
                >
                  <input type="checkbox" checked={state.includes(option)} readOnly className="w-4 h-4" />
                  <span>{option}</span>
                </div>
              ))}
            </Menu.Items>
          </Menu>
        ))}
      </div>

      {/* Selected Filters */}
      <div className="mb-4 flex flex-wrap gap-2">
        {[...selectedDepartments, ...selectedPriorities, ...selectedEmployees].map((filter) => (
          <span key={filter} className="flex items-center gap-2 px-3 py-1 bg-gray-200 rounded-full text-sm">
            {filter}{" "}
            <X
              size={14}
              className="cursor-pointer"
              onClick={() => {
                removeFilter(filter, setSelectedDepartments);
                removeFilter(filter, setSelectedPriorities);
                removeFilter(filter, setSelectedEmployees);
              }}
            />
          </span>
        ))}
        <button onClick={resetFilters} className="flex items-center gap-2 px-3 py-1 bg-gray-200 rounded-full text-sm">
          გასუფთავება
        </button>
      </div>

      {/* Filtered Tasks */}
      <div className="flex gap-14 justify-between">
        {statuses.map((status, index) => (
          <div key={status.id} className="w-[25%] pt-4 pb-4">
            <h1
              className="font-firaGo text-[20px] text-center text-white p-4"
              style={{
                backgroundColor: index < colors.length ? colors[index] : getRandomColor(),
              }}
            >
              {status.name}
            </h1>
            {filterTasks(tasks)
              .filter((task) => task.status.id === status.id)
              .map((task, index) => (
                <div
                  key={task.id}
                  style={{
                    borderColor: index < colors.length ? colors[task.status.id - 1] : getRandomColor(),
                  }}
                  className="p-2 border rounded-lg shadow-md bg-white mb-4 mt-4 cursor-pointer "
                  onClick={() => click(task.id)}
                >
                  {/* Tags */}
                  <div className="flex items-start gap-2 mb-2 flex-col">
                    <span className="text-yellow-900 text-sm px-3 py-1 rounded-full flex items-center gap-1">
                      <img src={task.priority.icon} alt="" />
                      {task.priority.name}
                    </span>
                    <span
                      className="text-white text-sm px-3 py-1 rounded-full"
                      style={{
                        background: index < colors.length ? colors[task.status.id - 1] : getRandomColor(),
                      }}
                    >
                      {task.department.name}
                    </span>
                  </div>

                  {/* Date */}
                  <p className="text-gray-500 text-sm absolute top-4 right-4 ">
                    {new Date(task.due_date).toLocaleDateString("ka-GE")}
                  </p>

                  {/* Title */}
                  <h2 className="text-lg font-bold text-gray-800">{task.name}</h2>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mt-1">{task.description || "No description available"}</p>

                  {/* Profile & Comments */}
                  <div className="flex items-center justify-between mt-4">
                    <img src={task.employee.avatar} alt="User Profile" className="w-10 h-10 rounded-full" />

                    <div className="flex items-center gap-1 text-gray-600">
                      <MessageCircle size={20} />
                      <span className="text-sm">{task.total_comments}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>

      <TaskInfo />
    </div>
  );
};

export default Tasks;
