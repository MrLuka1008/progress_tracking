import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

const EmployeeModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetch("https://momentum.redberryinternship.ge/api/9e6bfc4a-3b61-48b3-bcc4-35a0967ef379/employees")
      .then((res) => res.json())
      .then((data) => setDepartments(data))
      .catch((err) => console.error("Error fetching departments:", err));
  }, []);

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

  const handleSubmit = () => {
    if (!validate()) return;
    console.log({ name, surname, avatar, department });
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-opacity-50 backdrop-blur-xs" onClick={onClose}></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative bg-white rounded-2xl shadow-lg p-10 w-[600px]"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-semibold text-center mb-6">თანამშრომლის დამატება</h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-full">
              <input
                type="text"
                className={`w-full p-3 border rounded-lg focus:ring-2 outline-none ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="სახელი"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div className="w-full">
              <input
                type="text"
                className={`w-full p-3 border rounded-lg focus:ring-2 outline-none ${
                  errors.surname ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="გვარი"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
              {errors.surname && <p className="text-red-500 text-sm mt-1">{errors.surname}</p>}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <label className="w-24 h-24 rounded-full overflow-hidden border flex items-center justify-center cursor-pointer bg-gray-100">
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
            <select
              className={`w-full p-3 border rounded-lg focus:ring-2 outline-none ${
                errors.department ? "border-red-500" : "border-gray-300"
              }`}
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="">აირჩიეთ დეპარტამენტი</option>
              {departments.map((dep) => (
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
