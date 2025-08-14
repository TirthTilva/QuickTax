import { useState } from "react";
import IncomeForm from "../components/IncomeForm";
import TaxComparison from "../components/TaxComparison";
import { calculateTax } from "../services/api";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const onCalculate = async (payload) => {
    try {
      setLoading(true);
      setError("");
      setResult(null);
      const { data } = await calculateTax(payload);
      setResult(data);
    } catch (e) {
      setError(e?.response?.data?.error || "Failed to calculate tax");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <IncomeForm onCalculate={onCalculate} loading={loading} />
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <TaxComparison data={result} />
    </div>
  );
}
