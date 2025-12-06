import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [editId, setEditId] = useState(null);

  const API = "http://localhost:9090/api/students";

  // Load all data
  const loadData = async () => {
    const res = await axios.get(API);
    setStudents(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Add or Update
  const handleSubmit = async () => {
    if (!form.name || !form.email) return alert("Fill all fields");

    if (editId === null) {
      await axios.post(API, form);
    } else {
      await axios.put(`${API}/${editId}`, form);
      setEditId(null);
    }

    setForm({ name: "", email: "" });
    loadData();
  };

  // Delete
  const deleteStudent = async (id) => {
  if (!id) {
    console.error("Delete failed: id is undefined");
    return;
  }
  await axios.delete(`${API}/${id}`);
  loadData();
};

  // Edit
  const editStudent = (s) => {
    setForm({ name: s.name, email: s.email });
    setEditId(s.id);
    console.log(s);

  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Student Cards UI</h1>

      {/* Form Card */}
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-5 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {editId === null ? "Add New Student" : "Update Student"}
        </h2>

        <input
          className="border p-2 w-full rounded mb-3"
          placeholder="Enter Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="border p-2 w-full rounded mb-3"
          placeholder="Enter Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 w-full text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {editId === null ? "Add Student" : "Update Student"}
        </button>
      </div>

      {/* Student Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((s) => (
          

          <div
            key={s.id}
            className="bg-white shadow-md rounded-2xl p-5 hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold mb-1">{s.name}</h3>
            <p className="text-gray-600 mb-4">{s.email}</p>

            <div className="flex justify-between">
              <button
                onClick={() => editStudent(s)}
                className="bg-yellow-500 text-white px-4 py-1 rounded-lg hover:bg-yellow-600 transition"
              >
                Edit
              </button>

              <button
                onClick={() => deleteStudent(s.id) }
                className="bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
              
            </div>
          </div>
          
        ))
        }
      </div>
    </div>
  );
}
