import { useState } from "react";
import { useTransactions } from "../Context/TransactionContext";
import { CATEGORIES } from "../Utils/Helpers";
export default function TransactionForm() {
  const { addTransaction } = useTransactions();
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  function handleSubmit(e) {
    e.preventDefault(); // stops the page from reloading (default form behavior)
    if (!amount || Number(amount) <= 0) return; // basic validation
    addTransaction({
      type,
      amount: Number(amount),       category,
      description,
      date,
    });
    // reset form
    setAmount("");
    setDescription("");   
}

 return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-4 space-y-3">       <h2 className="text-lg font-semibold">Add Transaction</h2>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setType("income")}
          className={`flex-1 py-2 rounded ${type === "income" ? "bg-green-600 text-white" : "bg-gray-100"}`}         >
          Income
        </button>
        <button
          type="button"
          onClick={() => setType("expense")}
          className={`flex-1 py-2 rounded ${type === "expense" ? "bg-red-600 text-white" : "bg-gray-100"}`}
        >
          Expense
        </button>
      </div>
      <input
        type="number"
        step="0.01"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}         className="w-full border rounded p-2"
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full border rounded p-2"
      >
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>         ))}
      </select>
      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}         className="w-full border rounded p-2"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}         className="w-full border rounded p-2"
      />
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-medium">         Add
      </button>
    </form>
  );
}