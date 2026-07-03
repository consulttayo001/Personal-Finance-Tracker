import { useTransactions } from "../Context/TransactionContext";
import { formatCurrency } from "../Utils/Helpers";
export default function TransactionList() {
  const { transactions, deleteTransaction } = useTransactions();
  if (transactions.length === 0) {
    return <p className="text-gray-500 text-center py-6">No transactions yet.</p>;   }
  return (
    <div className="bg-white shadow rounded-lg divide-y">
      {transactions.map((t) => (
        <div key={t.id} className="flex justify-between items-center p-3">
          <div>
            <p className="font-medium">{t.description || t.category}</p>
            <p className="text-sm text-gray-500">{t.category} • {t.date}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={t.type === "income" ? "text-green-600" : "text-red-600"}>
              {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
            </span>
            <button
              onClick={() => deleteTransaction(t.id)}
              className="text-gray-400 hover:text-red-600 text-sm"
            >
✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}