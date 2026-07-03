import { useTransactions } from "../Context/TransactionContext";
import { CATEGORIES, formatCurrency, filterByMonth, getCurrentMonthString } from "../Utils/Helpers";
export default function BudgetTracker() {
  const { transactions, budgets, setBudgetForCategory } = useTransactions();   const currentMonth = getCurrentMonthString();
  const monthTransactions = filterByMonth(transactions, currentMonth);
  return (
    <div className="bg-white shadow rounded-lg p-4 space-y-3">
      <h2 className="text-lg font-semibold">Monthly Budgets</h2>
      {CATEGORIES.map((cat) => {
        const spent = monthTransactions
          .filter((t) => t.type === "expense" && t.category === cat)
          .reduce((sum, t) => sum + t.amount, 0);
        const budget = budgets[cat] || 0;
        const percent = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;         const overBudget = budget > 0 && spent > budget;
        return (
          <div key={cat}>
            <div className="flex justify-between text-sm mb-1">
              <span>{cat}</span>
              <span className={overBudget ? "text-red-600 font-medium" : "text-gray-500"}>                 {formatCurrency(spent)} /
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudgetForCategory(cat, Number(e.target.value))}
                  className="w-16 border rounded ml-1 px-1"
                />
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded h-2">
              <div
                className={`h-2 rounded ${overBudget ? "bg-red-500" : "bg-blue-500"}`}
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}