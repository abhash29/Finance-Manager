"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send("Backend for Finance app");
});
//Define Schema
const expenseSchema = new mongoose_1.default.Schema({
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
        required: false,
    }
});
//List
app.get('/expenses', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expenses = yield Expense.find();
        res.json(expenses);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
//Food, travel, bill, education
//Add
app.post('/expenses', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount, description, date, category } = req.body;
        const newExpenses = new Expense({
            amount,
            description,
            date,
            category
        });
        yield newExpenses.save();
        res.status(201).json({ message: "Expense added" });
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
//Edit
app.put('/expenses/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount, description, date, category } = req.body;
        const { id } = req.params;
        const updateExpenses = yield Expense.findByIdAndUpdate(id, {
            amount,
            description,
            date,
            category
        }, { new: true, runValidators: true });
        if (!updateExpenses) {
            res.status(404).json({ message: "Expense not found" });
        }
        res.status(200).json({ message: "Expense updated successfully" });
    }
    catch (err) {
        res.status(500).json({ err: "Error" });
    }
}));
//Delete
app.delete('/expenses/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: "Invalid ID format" });
            return;
        }
        const deletedExpense = yield Expense.findByIdAndDelete(id);
        if (!deletedExpense) {
            res.status(404).json({ message: "Expense not found" });
            return;
        }
        res.status(200).json({ message: "Expense deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ err: "Error" });
    }
}));
const Expense = mongoose_1.default.model('Express', expenseSchema);
mongoose_1.default.connect('mongodb+srv://abhashkumardas29:Abhash29@authentication.1vp14.mongodb.net/Expenses')
    .then(() => console.log("connected to mongoDb"));
app.listen(port, () => {
    console.log(`port running at: ${port}`);
});
