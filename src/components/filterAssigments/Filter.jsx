import { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import axios from "axios";

// const departments = ["მარკეტინგი", "დიზაინი", "ლოგისტიკა", "IT"];
//
// const priorities = ["დაბალი", "საშუალო", "მაღალი", "კრიტიკული"];
//

const employees = ["გიორგი", "ნინო", "ლევანი", "მარიამი"];

export default function SelectionDropdown() {
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedPriorities, setSelectedPriorities] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [priorities, setPriorities] = useState([]);
  const [departments, setDepartments] = useState([]);

  const toggleSelection = (option, setSelected, selected) => {
    setSelected((prev) => (prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]));
  };

  const removeFilter = (option, setSelected) => {
    setSelected((prev) => prev.filter((item) => item !== option));
  };

  useEffect(() => {
    axios.get("https://momentum.redberryinternship.ge/api/priorities").then((response) => {
      setPriorities(
        response.data.map((item) => {
          return item.name;
        })
      );
    });
  }, []);

  useEffect(() => {
    axios.get("https://momentum.redberryinternship.ge/api/departments").then((response) => {
      setDepartments(
        response.data.map((item) => {
          return item.name;
        })
      );
    });
  }, []);

  return (
    <div className="flex flex-col gap-4 w-auto  mx-auto ">
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

      {/* არჩეული ფილტრები */}
      <div className="mt-4 flex flex-wrap gap-2">
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
      </div>
    </div>
  );
}
