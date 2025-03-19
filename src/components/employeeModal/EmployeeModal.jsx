import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import axios from "axios";

const EmployeeModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [department, setDepartment] = useState("");
  const [employees, setEmployees] = useState([]);
  const [errors, setErrors] = useState({});

  const token = import.meta.env.VITE_API_TOKEN;
  const [departmentsApi, setDepartmentsApi] = useState([]);

  useEffect(() => {
    fetch("https://momentum.redberryinternship.ge/api/9e6bfc4a-3b61-48b3-bcc4-35a0967ef379/employees")
      .then((res) => res.json())
      .then((data) => setDepartments(data))
      .catch((err) => console.error("Error fetching departments:", err));
  }, []);

  useEffect(() => {
    axios.get("https://momentum.redberryinternship.ge/api/departments").then((response) => {
      setDepartmentsApi(
        response.data.map((item) => {
          return item;
        })
      );
    });
  }, []);

  console.log(departmentsApi);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 600 * 1024 && file.type.startsWith("image")) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!name.match(/^[a-zA-Zა-ჰ]{2,255}$/)) newErrors.name = "შეიყვანეთ სწორი სახელი";
    if (!surname.match(/^[a-zA-Zა-ჰ]{2,255}$/)) newErrors.surname = "შეიყვანეთ სწორი გვარი";
    if (!avatar) newErrors.avatar = "ატვირთეთ ავატარი";
    if (!department) newErrors.department = "აირჩიეთ დეპარტამენტი";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("avatar", avatar);
    formData.append("department_id", department);

    try {
      const response = await axios.post("https://momentum.redberryinternship.ge/api/employees", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ თანამშრომელი წარმატებით დაემატა:", response.data);
      setEmployees([...employees, response.data]);
      onClose();
    } catch (error) {
      console.error("❌ თანამშრომლის დამატების შეცდომა:", error.response?.data || error.message);
    }
  };

  ///////////

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-opacity-50 backdrop-blur-xs  " onClick={onClose}></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative bg-white rounded-2xl shadow-lg p-10 w-4xl "
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>
        <h2 className="text-4xl font-semibold text-center  font-firaGo mb-11 mt-32">თანამშრომლის დამატება</h2>
        <div className="space-y-4 pr-30 pl-30 pb-16">
          <div className="flex gap-4">
            <div className="w-full">
              <h2 className="mb-2">სახელი</h2>
              <input
                type="text"
                className={`w-full p-3 border rounded-lg focus:ring-2 outline-none ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div className="w-full">
              <h2 className="mb-2">გვარი</h2>
              <input
                type="text"
                className={`w-full p-3 border rounded-lg focus:ring-2 outline-none ${
                  errors.surname ? "border-red-500" : "border-gray-300"
                }`}
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
              {errors.surname && <p className="text-red-500 text-sm mt-1">{errors.surname}</p>}
            </div>
          </div>

          <h1 className="font-firaGo text-lx mb-2">ავატარი</h1>
          <div className="flex items-center gap-4 border border-dotted pt-4 pb-4">
            <label className="w-24 h-24 rounded-full overflow-hidden border flex items-center justify-center cursor-pointer bg-gray-100 m-auto ">
              {preview ? (
                <img src={preview} alt="Avatar Preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400">+</span>
              )}
              <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
            </label>
            {errors.avatar && <p className="text-red-500 text-sm">{errors.avatar}</p>}
          </div>
          <div>
            <h2 className="mb-2">დეპარტამენტი</h2>
            <select
              className={`w-1/2 p-3 border rounded-lg focus:ring-2 outline-none ${
                errors.department ? "border-red-500" : "border-gray-300"
              }`}
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="">აირჩიეთ</option>
              {departmentsApi.map((dep) => (
                <option key={dep.id} value={dep.id}>
                  {dep.name}
                </option>
              ))}
            </select>
            {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
          </div>
          <div className="flex justify-end space-x-3">
            <button onClick={onClose} className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100">
              გაუქმება
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
            >
              დაამატე თანამშრომელი
            </button>
          </div>
        </div>
      </motion.div>
    </Dialog>
  );
};

export default EmployeeModal;
