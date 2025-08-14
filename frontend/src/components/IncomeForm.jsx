import { useState } from "react";

const init = {
  salary: "",
  bankInterest: "",
  otherIncome: "",
  homeLoanInterest: "",
  section80C: "",
  section80D: ""
};

export default function IncomeForm({ onCalculate, loading }) {
  const [form, setForm] = useState(init);

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate({
      salary: +form.salary || 0,
      bankInterest: +form.bankInterest || 0,
      otherIncome: +form.otherIncome || 0,
      homeLoanInterest: +form.homeLoanInterest || 0,
      section80C: +form.section80C || 0,
      section80D: +form.section80D || 0
    });
  };

  const input = (name, label, placeholder = "0") => (
    <div className="flex flex-col">
      <label className="text-sm text-gray-600 mb-1">{label}</label>
      <input
        type="number"
        inputMode="decimal"
        className="rounded-lg border px-3 py-2 focus:outline-none focus:ring"
        value={form[name]}
        onChange={(e) => set(name, e.target.value)}
        placeholder={placeholder}
        min="0"
      />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-xl shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {input("salary", "Salary Income (₹)")}
        {input("bankInterest", "Bank Interest (₹)")}
        {input("otherIncome", "Other Income (₹)")}
        {input("homeLoanInterest", "Home Loan Interest (₹)")}
        {input("section80C", "Section 80C (₹)")}
        {input("section80D", "Section 80D (₹)")}
      </div>

      <div className="flex items-center gap-2">
        <button
          disabled={loading}
          className="rounded-lg bg-black text-white px-4 py-2 disabled:opacity-60"
        >
          {loading ? "Calculating..." : "Calculate Tax"}
        </button>
        <button
          type="button"
          onClick={() => setForm(init)}
          className="rounded-lg border px-4 py-2"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
