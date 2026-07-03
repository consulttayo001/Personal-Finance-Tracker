export const CATEGORIES = [
  "Food",
  "Transport",
  "Housing",
  "Entertainment",
  "Utilities",
  "Health",
  "Shopping",
  "Other",
  
];
export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
}

// Returns transactions that fall within the given month (format: "2026-07")
export function filterByMonth(transactions, monthString) {
  return transactions.filter((t) => t.date.startsWith(monthString));
}

export function getCurrentMonthString() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${now.getFullYear()}-${month}`;
}