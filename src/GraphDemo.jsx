import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const GraphDemo = () => {
    const [range, setRange] = useState("7");
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${range}`);

            const data = await res.json()
            setData(formatData(data))
        }
        fetchData()
    }, [range])

    const formatData = (data, range) => {
        return data.prices.map(([timestamp, price]) => {
            const date = new Date(timestamp);
            return {
                time:
                    range === "1"
                        ? date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
                        : date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
                price: price.toFixed(2)
            };
        });
    };




    return (
        <div className="w-full h-96 p-20">
            <div className="flex gap-2 mb-4">
                <button onClick={() => setRange("1")} className="px-3 py-1 rounded bg-violet-600 text-white">1D</button>
                <button onClick={() => setRange("7")} className="px-3 py-1 rounded bg-violet-600 text-white">7D</button>
                <button onClick={() => setRange("30")} className="px-3 py-1 rounded bg-violet-600 text-white">30D</button>
                <button onClick={() => setRange("100")} className="px-3 py-1 rounded bg-violet-600 text-white">100D</button>
            </div>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
                    <Tooltip
                        formatter={(value) => [`$${parseFloat(value).toLocaleString()}`, "Price"]}
                        labelFormatter={(label) => `Time: ${label}`}
                    />
                    <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false}></Line>

                </LineChart>

            </ResponsiveContainer>
        </div>



    )

}



export default GraphDemo;
