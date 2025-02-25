import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

const EditExpense = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [amount, setAmount] = useState<number>(0);
    const [description, setDescription] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [category, setCategory] = useState<"food" | "living" | "travel">("food");


    useEffect(() => {
        const fetchExpense = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/expenses/${id}`);
                const { amount, description, date } = response.data;
                setAmount(amount);
                setDescription(description);
                setDate(date);
                setCategory(category);
            } catch (err) {
                console.error(err);
            }
        };
        fetchExpense();
    }, [id]);

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:3000/expenses/${id}`, {
                amount,
                description,
                date,
                category
            });
            navigate("/"); // Redirect back after update
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto mt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Edit Transaction</h3>
            <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="p-2 border rounded-lg w-full"
                placeholder="Enter amount"
            />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="p-2 border rounded-lg w-full mt-2"
                placeholder="Enter description"
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="p-2 border rounded-lg w-full mt-2"
            />
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value as "food" | "living" | "travel")}
                className="p-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow hover:shadow-md"
            >
                <option value="">Select Category</option>
                <option value="food">Food</option>
                <option value="living">Living</option>
                <option value="travel">Travel</option>
            </select>
            <button onClick={handleUpdate} className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg">
                Update Expense
            </button>
        </div>
    );
};

export default EditExpense;
