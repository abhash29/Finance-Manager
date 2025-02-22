import Card from "./Card";
import Input from "./Input";

const Landing = () => {
    return (
        <div className="p-6 bg-gradient-to-r from-blue-400 to-purple-500 min-h-screen flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6 text-neutral-950">Transactions</h2>
            <div className="w-full max-w-5xl flex flex-col md:flex-row gap-6">
                {/* Card Section on the Left */}
                <div className="w-full md:w-1/2">
                    <Card />
                </div>
                {/* Input Section on the Right */}
                <div className="w-full md:w-1/2">
                    <Input />
                </div>
            </div>
        </div>
    );
};

export default Landing;
