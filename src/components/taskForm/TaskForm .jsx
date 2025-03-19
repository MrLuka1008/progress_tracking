import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useEffect, useState } from "react";

const TaskForm = () => {
  const [departments, setDepartments] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [managers, setManagers] = useState([]);
  const token = import.meta.env.VITE_API_TOKEN;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [deptRes, statusRes, priorityRes, empRes] = await Promise.all([
          axios.get("https://momentum.redberryinternship.ge/api/departments"),
          axios.get("https://momentum.redberryinternship.ge/api/statuses"),
          axios.get("https://momentum.redberryinternship.ge/api/priorities"),
          axios.get("https://momentum.redberryinternship.ge/api/employees", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setDepartments(deptRes.data);
        setStatuses(statusRes.data);
        setPriorities(priorityRes.data);
        setManagers(empRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      department: "",
      status: "",
      priority: "",
      manager: "",
      date: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("სათაური აუცილებელია"),
      department: Yup.string().required("დეპარტამენტის არჩევა აუცილებელია"),
      status: Yup.string().required("სტატუსის არჩევა აუცილებელია"),
      priority: Yup.string().required("პრიორიტეტის არჩევა აუცილებელია"),
      manager: Yup.string().required("პასუხისმგებელი მენეჯერის მითითება აუცილებელია"),
      date: Yup.date().required("დადებული ვადის მითითება აუცილებელია"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post(
          "https://momentum.redberryinternship.ge/api/tasks",
          {
            name: values.title,
            description: values.description,
            due_date: values.date,
            department_id: parseInt(values.department),
            employee_id: parseInt(values.manager),
            status_id: parseInt(values.status),
            priority_id: parseInt(values.priority),
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        alert("დავალება წარმატებით შეიქმნა!");
        resetForm();
      } catch (error) {
        console.error("Error creating task:", error.response?.data || error.message);
        alert("შეცდომა! სცადეთ თავიდან.");
      }
    },
  });

  return (
    <div className="w-full flex-col bg-white flex justify-center">
      <h1 className="text-2xl font-bold mb-6">შექმენი ახალი დავალება</h1>
      <div className="flex mt-10 flex-col items-center bg-[#F8F5FC] p-10  bg m-auto w-[70%]">
        <form onSubmit={formik.handleSubmit} className=" p-6 w-full flex flex-col gap-20">
          <div className="flex w-full justify-between">
            <div className="w-[45%]">
              <label className="block text-sm font-medium">სათაური*</label>
              <input type="text" className="border rounded w-full p-3 bg-white" {...formik.getFieldProps("title")} />
            </div>

            <div className="w-[45%]">
              <label className="block text-sm font-medium">დეპარტამენტი*</label>
              <select className="border rounded w-full p-3 bg-white" {...formik.getFieldProps("department")}>
                <option value="">აირჩიეთ</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex w-full justify-between">
            <div className="flex flex-col w-[45%]">
              <label className="text-sm font-medium">აღწერა</label>
              <textarea className="border rounded p-3 bg-white resize-none" {...formik.getFieldProps("description")} />
            </div>

            <div className="w-[45%]">
              <label className="block text-sm font-medium">პასუხისმგებელი თანამშრომელი*</label>
              <select className="border rounded w-full p-3 bg-white" {...formik.getFieldProps("manager")}>
                <option value="">აირჩიეთ</option>
                {managers.map((manager) => (
                  <option key={manager.id} value={manager.id}>
                    {manager.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex w-full justify-between">
            <div className="w-[30%]">
              <label className="block text-sm font-medium">პრიორიტეტი*</label>
              <select className="border rounded w-full p-3 bg-white" {...formik.getFieldProps("priority")}>
                <option value="">აირჩიეთ</option>
                {priorities.map((priority) => (
                  <option key={priority.id} value={priority.id}>
                    {priority.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-[30%]">
              <label className="block text-sm font-medium">სტატუსი*</label>
              <select className="border rounded w-full p-3 bg-white" {...formik.getFieldProps("status")}>
                <option value="">აირჩიეთ</option>
                {statuses.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-[30%]">
              <label className="block text-sm font-medium">დედლაინი*</label>
              <input type="date" className="border rounded w-full p-3 bg-white" {...formik.getFieldProps("date")} />
            </div>
          </div>
          <div className=" flex justify-end">
            <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded">
              დავალების შექმნა
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
