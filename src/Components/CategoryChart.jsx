import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useTransactions } from "../Context/TransactionContext";
import { CATEGORIES } from "../Utils/Helpers";
const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316", "#6b7280"];
export default function CategoryChart() {
  const { transactions } = useTransactions();
  const data = CATEGORIES.map((cat) => ({
    name: cat,
    value: transactions
      .filter((t) => t.type === "expense" && t.category === cat)       .reduce((sum, t) => sum + t.amount, 0),
  })).filter((d) => d.value > 0);
  if (data.length === 0) {
    return <p className="text-gray-500 text-center py-6">No expenses to chart yet.</p>;   }
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2">Expenses by Category</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={90} label>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}