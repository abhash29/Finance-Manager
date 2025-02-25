import { useEffect, useState } from "react";

import axios from "axios";

const DashBoard = () => {
    interface Expense {
        amount: number;
        description: string;
        date: string;
        category: "food" | "living" | "travel";
    }

    const [totalExpenses, setTotalExpenses] = useState<number>(0);
    const [recent, setRecent] = useState<Expense | null>(null);
    const [categoriesExpense, setCategoriesExpense] = useState<number[]>([0, 0, 0]); // [Food, Living, Travel]

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await axios.get<Expense[]>('http://localhost:3000/expenses/');
                const expenses = response.data;
                console.log("Fetched Expenses:", expenses); // Debugging Log

                if (expenses.length === 0) return;

                setRecent(expenses[0]);

                let total = 0;
                let categoryTotals = [0, 0, 0];

                expenses.forEach((expense) => {
                    total += expense.amount;

                    switch (expense.category) {
                        case "food":
                            categoryTotals[0] += expense.amount;
                            console.log(categoryTotals[0]);
                            break;
                        case "living":
                            categoryTotals[1] += expense.amount;
                            console.log(categoryTotals[1]);
                            break;
                        case "travel":
                            categoryTotals[2] += expense.amount;
                            console.log(categoryTotals[2]);
                            break;
                        default:
                            break;
                    }
                });

                setTotalExpenses(total);
                setCategoriesExpense([...categoryTotals]); // Ensure state update
            }
            catch (err) {
                console.error("Error fetching expenses:", err);
            }
        };

        fetchExpenses();
    }, []);

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 Dashboard</h2>

            {/* Total Expenses */}
            <div className="bg-blue-100 p-4 rounded-lg shadow-md mb-6">
                <h4 className="text-lg font-semibold text-blue-700">Total Expenses</h4>
                <p className="text-xl font-bold text-blue-900">₹{totalExpenses}</p>
            </div>

            {/* Recent Transaction */}
            <div className="bg-green-100 p-4 rounded-lg shadow-md mb-6">
                <h4 className="text-lg font-semibold text-green-700">💰 Most Recent Transaction</h4>
                {recent ? (
                    <div className="mt-2 space-y-1 text-green-900">
                        <p><strong>Amount:</strong> ₹{recent.amount}</p>
                        <p><strong>Description:</strong> {recent.description}</p>
                        <p><strong>Date:</strong> {new Date(recent.date).toISOString().split('T')[0]}</p>
                        <p><strong>Category:</strong> {recent.category}</p>
                    </div>
                ) : (
                    <p className="text-gray-600">No recent transactions found.</p>
                )}
            </div>

            {/* Category Breakdown */}
            <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
                <h4 className="text-lg font-semibold text-yellow-700">📂 Categories</h4>
                <div className="mt-2 space-y-1 text-yellow-900">
                    <p><strong>🍽️ Food:</strong> ₹{categoriesExpense[0]}</p>
                    <p><strong>🏠 Living:</strong> ₹{categoriesExpense[1]}</p>
                    <p><strong>✈️ Travel:</strong> ₹{categoriesExpense[2]}</p>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
