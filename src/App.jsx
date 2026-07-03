import SummaryCards from "./Components/SummaryCard";
import TransactionForm from "./Components/TransactionForm";
import TransactionList from "./Components/TransactionList";
import BudgetTracker from "./Components/BudgetTracter";
import CategoryChart from "./Components/CategoryChart";
import MonthlyChart from "./Components/MonthlyChart";
import MonthlyReport from "./Components/MonthlyReport";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Personal Finance Tracker</h1>
        <SummaryCards />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TransactionForm />
          <BudgetTracker />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CategoryChart />
          <MonthlyChart />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MonthlyReport />
          <div>
            <h2 className="text-lg font-semibold mb-2">Transaction History</h2>
            <TransactionList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

