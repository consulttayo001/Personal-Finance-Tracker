import { useState } from "react";
import { useTransactions } from "../Context/TransactionContext";
import { filterByMonth, formatCurrency } from "../Utils/Helpers";
export default function MonthlyReport() {
  const { transactions } = useTransactions();
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const monthly = filterByMonth(transactions, month);
  const income = monthly.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const expense = monthly.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  return (
    <div className="bg-white shadow rounded-lg p-4 space-y-2">
      <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} className="border rounded p-2" />       <p>Income: {formatCurrency(income)}</p>
      <p>Expenses: {formatCurrency(expense)}</p>
      <p className="font-bold">Net: {formatCurrency(income - expense)}</p>
    </div>
  );
}