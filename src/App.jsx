import { useState } from 'react'

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyeLu6XxEiOTNj2xvNHj5PLGsRLMxOF_T0bRhVu9P14q_lbRzQ8Uk-AOSGrCZ9OOcpJ/exec";

function App() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "",
    street: "",
    houseNumber: "",
    serial: "",
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      if (result.success) setSuccess(true);
      else alert("שליחה נכשלה.");
    } catch {
      alert("שגיאה בשליחה");
    }
    setLoading(false);
  };

  if (success) {
    return <div className="min-h-screen flex items-center justify-center text-center bg-green-100 text-green-800 text-xl font-bold rtl">✔️ הטופס נשלח בהצלחה!</div>
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full space-y-4">
        <h2 className="text-2xl font-bold text-center">טופס אחריות</h2>
        <input name="firstName" onChange={handleChange} placeholder="שם פרטי" required className="input" />
        <input name="lastName" onChange={handleChange} placeholder="שם משפחה" required className="input" />
        <input name="phone" onChange={handleChange} placeholder="טלפון" required className="input" />
        <input name="email" onChange={handleChange} placeholder="מייל (לא חובה)" className="input" />
        <input name="city" onChange={handleChange} placeholder="עיר" required className="input" />
        <input name="street" onChange={handleChange} placeholder="רחוב" required className="input" />
        <input name="houseNumber" onChange={handleChange} placeholder="מספר בית" required className="input" />
        <input name="serial" onChange={handleChange} placeholder="מספר סיריאלי" required className="input" />
        <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition">
          {loading ? "שולח..." : "שלח"}
        </button>
        <style>
          {`.input { width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 0.5rem; font-size: 1rem; }`}
        </style>
      </form>
    </div>
  );
}

export default App;
