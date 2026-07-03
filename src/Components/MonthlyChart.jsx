import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useTransactions } from "../Context/TransactionContext";
export default function MonthlyChart() {
  const { transactions } = useTransactions();
  // Group transactions by month (YYYY-MM)
  const monthMap = {};
  transactions.forEach((t) => {
    const month = t.date.slice(0, 7);
    if (!monthMap[month]) monthMap[month] = { month, income: 0, expense: 0 };     monthMap[month][t.type] += t.amount;
  });
  const data = Object.values(monthMap).sort((a, b) => a.month.localeCompare(b.month));
  if (data.length === 0) {
    return <p className="text-gray-500 text-center py-6">No data to chart yet.</p>;   }
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2">Monthly Overview</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#10b981" />
          <Bar dataKey="expense" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}