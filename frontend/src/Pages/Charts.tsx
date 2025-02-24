import { useEffect, useState } from 'react';

import ReactECharts from 'echarts-for-react';
import axios from 'axios';

interface Expense{
    _id: string;
    amount: number;
    description: string;
    date: string;
}

//2d array store -> month and amount
const Charts = () => {
    const [monthlyExpense, setMonthlyExpense] = useState<number[][]>(new Array(12).fill(0));
    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await axios.get<Expense[]>('http://localhost:3000/expenses/');
                const monthData = new Array(12).fill(0);

                response.data.forEach((expense) => {
                    const monthIdx = new Date(expense.date).getMonth();
                    monthData[monthIdx]+=Number(expense.amount);
                });
                
                console.log(monthData);
                setMonthlyExpense(monthData);
            }
            catch (err) {
                console.error(err);
            }
        };
        fetchExpenses();
    }, []);
    
    
    const Option = {
        xAxis: {
            type: 'category',
            data: ['Jan', 'Feb', 'Mar', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: monthlyExpense,
                type: 'bar'
            }
        ]
    };


    return <div>
        <h1 className="text-3xl font-bold mb-6 text-gray-800 mt-4">Montly expense Bar chart </h1>
        <div>
            <ReactECharts option={Option} />
        </div>
    </div>
}
export default Charts;