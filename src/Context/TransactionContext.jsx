import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../Hooks/UselocalStorage";

const TransactionContext = createContext();

export function TransactionProvider({ children }) {
    const [transactions, setTransactions] = useLocalStorage("transactions", []);
    const [budgets, setBudgets] = useLocalStorage("budgets", {});

    function addTransaction(transaction) {
        setTransactions((prev) => [
            { ...transaction, id: Date.now().toString() },
            ...prev,
        ]);
    }

    function deleteTransaction(id) {
        setTransactions((prev) => prev.filter((transaction) => transaction.id !== id));
    }

    function setBudgetForCategory(category, amount) {
        setBudgets((prev) => ({ ...prev, [category]: amount }));
    }

    const value = useMemo(() => ({
        transactions,
        budgets,
        addTransaction,
        deleteTransaction,
        setBudgetForCategory,
        setBudgetsForCategory: setBudgetForCategory,
    }), [transactions, budgets]);

    return (
        <TransactionContext.Provider value={value}>
            {children}
        </TransactionContext.Provider>
    );
}

export function useTransactions() {
    return useContext(TransactionContext);
}

export const useTransaction = useTransactions;
