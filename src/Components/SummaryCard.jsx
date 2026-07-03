import { useTransactions } from "../Context/TransactionContext";
import { formatCurrency } from "../Utils/Helpers";
export default function SummaryCards() {
  const { transactions } = useTransactions();
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expenses;
  const cards = [
    { label: "Income", value: income, color: "text-green-600" },
    { label: "Expenses", value: expenses, color: "text-red-600" },
    { label: "Balance", value: balance, color: balance >= 0 ? "text-green-600" : "text-red-600" },   ];
  return (
    <div className="grid grid-cols-3 gap-4">
      {cards.map((card) => (
        <div key={card.label} className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">{card.label}</p>
          <p className={`text-xl font-bold ${card.color}`}>{formatCurrency(card.value)}</p>         </div>
      ))}
    </div>
  );
}