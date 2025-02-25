import express, {Request, Response} from 'express';
import mongoose, {Document, Model, Schema} from 'mongoose';

import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("Backend for Finance app");
});

//Interface
interface IExpense extends Document{
    amount: number;
    description?: string;
    date: Date;
    category: "food" | "living" | "travel";
}
//Define Schema
const expenseSchema: Schema<IExpense> = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['food', 'living', 'travel'],
    }
});

//List
app.get('/expenses', async (req, res) => {
    try{
        const expenses = await Expense.find();
        res.json(expenses);
    }
    catch(err){
        res.status(500).json(err);
    }
})

//Add
app.post('/expenses', async (req, res) => {
    try{
        const {amount, description, date, category} = req.body;
        const newExpenses = new Expense({
            amount,
            description,
            date,
            category
        });
        await newExpenses.save();
        res.status(201).json({message: "Expense added"})
    }
    catch(error){
        res.status(500).json(error);
    }
});
//Edit
app.put('/expenses/:id', async (req:Request, res:Response):Promise<void> => {
    try {
        const { amount, description, date, category } = req.body;
        const {id} = req.params;
        
        const updateExpenses = await Expense.findByIdAndUpdate(
            id,
            {
            amount,
            description,
            date,
            category
        },
        {new: true, runValidators: true}
    );
    if(!updateExpenses){
        res.status(404).json({message: "Expense not found"});
    }
    res.status(200).json({message: "Expense updated successfully"})
}
    catch (err) {
        res.status(500).json({ err: "Error" });
    }
});
//Delete
app.delete('/expenses/:id', async (req: Request, res: Response):Promise<void> => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: "Invalid ID format" });
            return;
        }
        const deletedExpense = await Expense.findByIdAndDelete(id);
        if (!deletedExpense) {
            res.status(404).json({ message: "Expense not found" });
            return;
        }
        res.status(200).json({ message: "Expense deleted successfully" })
    }
    catch (err) {
        res.status(500).json({ err: "Error" });
    }
});


const Expense = mongoose.model('Express', expenseSchema);
mongoose.connect('mongodb+srv://abhashkumardas29:Abhash29@authentication.1vp14.mongodb.net/Expenses')
    .then(() => console.log("connected to mongoDb"));

app.listen(port, () => {
    console.log(`port running at: ${port}`)
});