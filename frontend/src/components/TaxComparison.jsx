export default function TaxComparison({ data }) {
  if (!data) return null;

  const r = data;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="text-lg font-semibold mb-2">Old Regime</h3>
        <p className="text-sm text-gray-600 mb-1">Taxable Income: ₹{fmt(r.oldRegime.taxable)}</p>
        <p className="text-sm text-gray-600">Tax (incl. 4% cess): ₹{fmt(r.oldRegime.tax)}</p>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="text-lg font-semibold mb-2">New Regime</h3>
        <p className="text-sm text-gray-600 mb-1">Taxable Income: ₹{fmt(r.newRegime.taxable)}</p>
        <p className="text-sm text-gray-600">Tax (incl. 4% cess): ₹{fmt(r.newRegime.tax)}</p>
      </div>

      <div className="md:col-span-2 bg-white rounded-xl shadow p-4">
        <h3 className="text-lg font-semibold mb-2">Suggestion</h3>
        <p className="text-gray-800">
          <span className="font-medium">{r.suggestion}</span> is better by{" "}
          <span className="font-medium">₹{fmt(r.savings)}</span>.
        </p>
        <div className="mt-3 text-xs text-gray-500">
          Gross Income: ₹{fmt(r.grossIncome)}
        </div>
      </div>
    </div>
  );
}

function fmt(n) {
  if (n === 0) return "0";
  return n.toLocaleString("en-IN", { maximumFractionDigits: 2 });
}
