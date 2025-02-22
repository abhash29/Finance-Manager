import { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Expense {
    _id: string,
    amount: number,
    description: string,
    date: string,
    category: string
}
const Card = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExpenses = async () => {
            try{
                const response = await axios.get('http://localhost:3000/expenses/');
                setExpenses(response.data);
            }
            catch(err){
                console.error(err);
            }
        };
        fetchExpenses();
    }, []);
    
    const handleEdit = (_id: string) => {
        navigate(`/edit/${_id}`);
    }

    const handleDelete = async (_id: string): Promise<void> => {
        try {
            await axios.delete(`http://localhost:3000/expenses/${_id}`);
            setExpenses((prevExpenses) => prevExpenses.filter((item) => item._id!==_id));
        }
        catch(err){
            console.log(err);
        }
        navigate('/');
    };
    
    return (
        <div className="p-4 flex flex-col items-center space-y-4 bg-gradient-to-r from-blue-400 to-purple-500 min-h-screen">
            {expenses.map((item, index) => (
                <div
                    key={index}
                    className="w-full max-w-md p-4 bg-white shadow-lg rounded-lg flex flex-row justify-between items-center border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-2xl"
                >
                    <div className="flex flex-col">
                        <span className="text-lg font-semibold text-gray-800">Amount: ${item.amount}</span>
                        <span className="text-gray-600">Description: {item.description}</span>
                        <span className="text-gray-500 text-sm">Date: {item.date}</span>
                    </div>
                    <div className="flex space-x-2">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md" onClick={() => handleEdit(item._id)}>Edit</button>
                        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-md" onClick={() => handleDelete(item._id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Card;
