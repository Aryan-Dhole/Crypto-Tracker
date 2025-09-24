import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const data = [
    { time: "1", price: 100 },
    { time: "2", price: 200 },
    { time: "3", price: 300 },
    { time: "4", price: 150 },
    { time: "5", price: 700 }
];


export default function GraphDemo() {

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4"> Recharts Demo</h1>

            <LineChart
                width={700}
                height={400}
                data={data}
                margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
            >
                <CartesianGrid stroke="#ccc"
                    strokeDasharray="5 6" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="blue" />
            </LineChart>
        </div>
    )


}
