import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Input = () => {
    const [amount, setAmount] = useState<number>(0);
    const [description, setDescription] = useState<string | "">();
    const [date, setDate] = useState<string>();
    const navigate = useNavigate();


    const handleSubmit = async () => {
        if(!amount || !date){
            alert("Please fill the required fields");
            return;
        }
        try{
            await axios.post("http://localhost:3000/expenses", {
                amount,
                description,
                date,
            });
            setAmount(0);
            setDescription("");
            setDate("");
            navigate(0);
        }
        catch(error){
            console.log(error);
            alert("Failed to add expense")
        }
    };
    return (
        
        <div className="p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto mt-4 transition-transform transform hover:scale-105 hover:shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                Enter your Transactions:
            </h3>
            <div className="flex flex-col space-y-3">
                <input
                    type="text"
                    placeholder="Enter amount"
                    className="p-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow hover:shadow-md"
                    onChange={(e) => setAmount(Number(e.target.value))}
                />
                <input
                    type="text"
                    placeholder="Enter description"
                    className="p-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow hover:shadow-md"
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="date"
                    className="p-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow hover:shadow-md"
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 shadow-md transition-all transform hover:scale-105" onClick={handleSubmit}>
                Submit
            </button>
            <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 shadow-md transition-all transform hover:scale-105">
                View Monthly Expenses Bar Chart
            </button>
        </div>
    );
};

export default Input;
