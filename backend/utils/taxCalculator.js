// Core tax logic: India FY 2024-25 (Assessment Year 2025-26)
export function calculateTax(payload) {
  const {
    salary = 0,
    bankInterest = 0,
    otherIncome = 0,
    homeLoanInterest = 0, // Sec 24(b) cap 2L (self-occupied)
    section80C = 0,       // cap 1.5L
    section80D = 0        // cap 25k (non-senior)
  } = sanitize(payload);

  const grossIncome = toNumber(salary) + toNumber(bankInterest) + toNumber(otherIncome);

  // ----- OLD REGIME -----
  const dedOld =
    Math.min(toNumber(section80C), 150000) +
    Math.min(toNumber(section80D), 25000) +
    Math.min(toNumber(homeLoanInterest), 200000);

  const taxableOld = Math.max(grossIncome - dedOld, 0);
  const taxOldBasic = oldRegimeSlabTax(taxableOld);
  const taxOldWithCess = addHealthEducationCess(taxOldBasic);

  // ----- NEW REGIME -----
  const taxableNew = Math.max(grossIncome, 0); // minimal deductions allowed
  const taxNewBasic = newRegimeSlabTax(taxableNew);
  const taxNewWithCess = addHealthEducationCess(taxNewBasic);

  // ----- Suggestion -----
  const better =
    taxOldWithCess < taxNewWithCess
      ? "Old Regime"
      : taxNewWithCess < taxOldWithCess
      ? "New Regime"
      : "Both equal";

  return {
    inputs: {
      salary: toNumber(salary),
      bankInterest: toNumber(bankInterest),
      otherIncome: toNumber(otherIncome),
      homeLoanInterest: toNumber(homeLoanInterest),
      section80C: toNumber(section80C),
      section80D: toNumber(section80D)
    },
    grossIncome,
    oldRegime: {
      taxable: taxableOld,
      tax: round2(taxOldWithCess),
      totalTax: round2(taxOldWithCess) // explicit total field
    },
    newRegime: {
      taxable: taxableNew,
      tax: round2(taxNewWithCess),
      totalTax: round2(taxNewWithCess) // explicit total field
    },
    suggestion: better,
    savings: round2(Math.abs(taxOldWithCess - taxNewWithCess))
  };
}

/* ---------- Helpers ---------- */
function sanitize(obj) {
  const clean = {};
  for (const k in obj) clean[k] = toNumber(obj[k]);
  return clean;
}
function toNumber(x) {
  const n = Number(x);
  return Number.isFinite(n) ? n : 0;
}
function round2(n) {
  return Math.round(n * 100) / 100;
}
function addHealthEducationCess(tax) {
  return tax + tax * 0.04; // 4% cess
}

/* ---------- Slabs ---------- */
// Old Regime slabs
function oldRegimeSlabTax(income) {
  let tax = 0;
  if (income <= 250000) tax = 0;
  else if (income <= 500000) tax = (income - 250000) * 0.05;
  else if (income <= 1000000) tax = 12500 + (income - 500000) * 0.2;
  else tax = 112500 + (income - 1000000) * 0.3;
  return tax;
}

// New Regime slabs (Budget 2023 revised, FY 2024-25)
function newRegimeSlabTax(income) {
  let tax = 0;
  if (income <= 300000) tax = 0;
  else if (income <= 700000) tax = (income - 300000) * 0.05;
  else if (income <= 1000000) tax = 20000 + (income - 700000) * 0.1;
  else if (income <= 1200000) tax = 50000 + (income - 1000000) * 0.15;
  else if (income <= 1500000) tax = 80000 + (income - 1200000) * 0.2;
  else tax = 140000 + (income - 1500000) * 0.3;
  return tax;
}
