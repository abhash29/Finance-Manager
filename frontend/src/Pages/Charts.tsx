import { useEffect, useState } from 'react';

import ReactECharts from 'echarts-for-react';
import axios from 'axios';

interface Expense {
    _id: string;
    amount: number;
    description: string;
    date: string;
    category: "food" | "living" | "travel";  // Ensure category matches database
}

const Charts = () => {
    const [categoriesExpense, setCategoriesExpense] = useState<number[]>([0, 0, 0]);
    const [monthlyExpense, setMonthlyExpense] = useState<number[]>(Array(12).fill(0));

    // Budget for each category
    const categoryBudget = [5000, 5000, 5000]; // Food, Living, Travel

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await axios.get<Expense[]>('http://localhost:3000/expenses/');
                const expenses = response.data;

                // Monthly expenses
                const monthData = Array(12).fill(0);
                // Category-wise expenses
                const categoryTotals = [0, 0, 0]; // [Food, Living, Travel]

                expenses.forEach((expense) => {
                    const monthIdx = new Date(expense.date).getMonth();
                    monthData[monthIdx] += Number(expense.amount);

                    switch (expense.category) {
                        case "food":
                            categoryTotals[0] += expense.amount;
                            break;
                        case "living":
                            categoryTotals[1] += expense.amount;
                            break;
                        case "travel":
                            categoryTotals[2] += expense.amount;
                            break;
                        default:
                            break;
                    }
                });

                setMonthlyExpense(monthData);
                setCategoriesExpense(categoryTotals);
            } catch (err) {
                console.error("Error fetching expenses:", err);
            }
        };

        fetchExpenses();
    }, []);

    // Monthly Expense Chart
    const Option1 = {
        xAxis: {
            type: 'category',
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'Expenses',
                data: monthlyExpense,
                type: 'bar'
            }
        ]
    };

    // Category-Wise Expense Chart
    const Option2 = {
        xAxis: {
            type: 'category',
            data: ['Food', 'Living', 'Travel']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'Expenses',
                data: categoriesExpense,
                type: 'bar'
            }
        ]
    };

    // Expense vs Budget Chart
    const Option3 = {
        legend: {
            data: ['Actual Expense', 'Budget'],
        },
        xAxis: {
            type: 'category',
            data: ['Food', 'Living', 'Travel']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'Actual Expense',
                data: categoriesExpense,
                type: 'bar'
            },
            {
                name: 'Budget',
                data: categoryBudget,
                type: 'bar'
            }
        ]
    };

    return (
        <div>
            <div>
                <h1 className="text-3xl font-bold mb-6 text-gray-800 mt-4">📊 Monthly Expense Bar Chart</h1>
                <ReactECharts option={Option1} />
            </div>

            <div>
                <h1 className="text-3xl font-bold mb-6 text-gray-800 mt-4">💰 Spending Insights (Category-wise)</h1>
                <ReactECharts option={Option2} />

                {/* Conditional rendering for budget warning */}
                {categoriesExpense[0] > 5000 && (
                    <div className="text-red-600 font-bold">⚠️ Food expenses exceed budget: ₹5000</div>
                )}
                {categoriesExpense[1] > 5000 && (
                    <div className="text-red-600 font-bold">⚠️ Living expenses exceed budget: ₹5000</div>
                )}
                {categoriesExpense[2] > 5000 && (
                    <div className="text-red-600 font-bold">⚠️ Travel expenses exceed budget: ₹5000</div>
                )}

                <div>
                    <h1 className="text-3xl font-bold mb-6 text-gray-800 mt-4">📈 Expense vs Budget</h1>
                    <ReactECharts option={Option3} />
                </div>
            </div>
        </div>
    );
};

export default Charts;
