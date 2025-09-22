import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from 'recharts';

export default function CoinDetail() {
    const { id } = useParams();
    const [coin, setCoin] = useState(null)
    const [loading, setLoading] = useState(true)
    const [history, setHistory] = useState([]);         // array of { time, price }
    const [historyLoading, setHistoryLoading] = useState(true);
    const [days, setDays] = useState(7);                // optional: 1, 7, 30, 90...

    const navigate = useNavigate()


    // fetching coin deitals
    useEffect(() => {
        const fetchCoin = async () => {

            const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
            const data = await res.json()
            setCoin(data)
            setLoading(false)

        }
        fetchCoin()
    }, [id])

    //fetching charts
    useEffect(() => {
        const fetchGraph = async () => {
            const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`)
            const data = await res.json()
            console.log(data);
            setHistory(data)

        }
        fetchGraph()
    }, [id])

    function formatNumber(num) {
        if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
        if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
        if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
        return num.toLocaleString("en-US");
    }



    useEffect(() => {
        if (!id) return;

        const controller = new AbortController();
        setHistoryLoading(true);

        (async () => {
            try {
                const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`;
                const res = await fetch(url, { signal: controller.signal });
                const data = await res.json();

                // map to { time, price }
                const mapped = (data.prices || []).map(([ts, price]) => {
                    const date = new Date(ts);
                    // for days === 1 we show hour:minute, otherwise show short date
                    const timeLabel = days === 1
                        ? date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })
                        : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

                    return { time: timeLabel, price: Number(price.toFixed(2)) };
                });

                setHistory(mapped);
                setHistoryLoading(false);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error('History fetch error', err);
                    setHistory([]); // safe fallback
                    setHistoryLoading(false);
                }
            }
        })();

        return () => controller.abort();
    }, [id, days]);



    return (
        loading ? (
            <div className="bg-gray-900 text-white min-h-screen p-16">
                <div className="max-w-3xl mx-auto p-4">
                    {/* Header skeleton: logo + name/symbol */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-30 h-30 rounded-full bg-gray-800 animate-bounce" />
                        <div className="space-y-2">
                            <div className="h-5 w-40 bg-gray-800 rounded animate-pulse" />
                            <div className="h-4 w-24 bg-gray-800 rounded animate-pulse" />
                        </div>
                    </div>
                    <div className="p-4 rounded-lg border mb-8 border-gray-800">
                        <div className="h-4 w-24 bg-gray-800 rounded mb-3 animate-pulse" />
                        <div className="h-7 w-32 bg-gray-800 rounded animate-pulse" />
                    </div>

                    {/* Stats grid skeleton */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-4 rounded-lg border border-gray-800">
                            <div className="h-4 w-20 bg-gray-800 rounded mb-3 animate-pulse" />
                            <div className="h-7 w-36 bg-gray-800 rounded animate-pulse" />
                        </div>

                        <div className="p-4 rounded-lg border border-gray-800">
                            <div className="h-4 w-24 bg-gray-800 rounded mb-3 animate-pulse" />
                            <div className="h-7 w-32 bg-gray-800 rounded animate-pulse" />
                        </div>

                        <div className="p-4 rounded-lg border border-gray-800">
                            <div className="h-4 w-24 bg-gray-800 rounded mb-3 animate-pulse" />
                            <div className="h-7 w-32 bg-gray-800 rounded animate-pulse" />
                        </div>

                        <div className="p-4 rounded-lg border border-gray-800">
                            <div className="h-4 w-20 bg-gray-800 rounded mb-3 animate-pulse" />
                            <div className="h-7 w-28 bg-gray-800 rounded animate-pulse" />
                        </div>
                        <div className="p-4 rounded-lg border border-gray-800">
                            <div className="h-4 w-24 bg-gray-800 rounded mb-3 animate-pulse" />
                            <div className="h-7 w-32 bg-gray-800 rounded animate-pulse" />
                        </div>
                        <div className="p-4 rounded-lg border border-gray-800">
                            <div className="h-4 w-24 bg-gray-800 rounded mb-3 animate-pulse" />
                            <div className="h-7 w-32 bg-gray-800 rounded animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div className="bg-gray-900 text-white min-h-screen p-8">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-4 px-6 py-3 bg-gray-700 rounded-2xl hover:bg-gray-600 hover:scale-105 transition duration-200"
                >
                    ← Back
                </button>
                <div className="max-w-4xl mx-auto p-4">
                    {/* Header: logo, name, symbol */}
                    <div className="flex items-center gap-3 mb-12">
                        <img
                            src={coin.image.large}
                            alt={`${coin.name} logo`}
                            className="w-30 h-30"
                        />
                        <h1 className="text-3xl font-semibold">
                            {coin.name}{" "}
                            <span className="uppercase text-gray-400">({coin.symbol})</span>
                        </h1>
                    </div>

                    <div className="p-4 mb-8 h-25 text-center rounded-lg border border-gray-800">
                        <div className="text-md text-gray-400">Price</div>
                        <div className="text-3xl font-semibold">
                            ${coin.market_data.current_price.usd.toLocaleString("en-US")}
                            <span
                                className={`ml-3 text-base ${coin.market_data.price_change_percentage_24h >= 0
                                    ? "text-green-400"
                                    : "text-red-500"
                                    }`}
                            >
                                {coin.market_data.price_change_percentage_24h.toFixed(2) >= 0
                                    ? `${coin.market_data.price_change_percentage_24h.toFixed(2)}% 📈`
                                    : `${coin.market_data.price_change_percentage_24h.toFixed(2)}% 📉`}
                            </span>
                        </div>
                    </div>


                    {/* Stats grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 shadow-md mb-12">

                        <div className="p-4 rounded-lg border text-amber-400 border-gray-800">
                            <div className="text-sm text-gray-400">Market cap rank</div>
                            <div className="text-xl font-medium">
                                {coin.market_cap_rank}
                            </div>
                        </div>

                        <div className="p-4 rounded-lg border border-gray-800">
                            <div className="text-sm text-gray-400">Market Cap</div>
                            <div className="text-xl font-medium">
                                ${formatNumber(coin.market_data.market_cap.usd)}
                            </div>
                        </div>

                        <div className="p-4 rounded-lg border border-gray-800">
                            <div className="text-sm text-gray-400">Total Volume</div>
                            <div className="text-xl font-medium">
                                {formatNumber(coin.market_data.total_volume.usd)}
                            </div>
                        </div>

                        <div className="p-4 rounded-lg border border-gray-800">
                            <div className="text-sm text-green-500">24h High</div>
                            <div className="text-xl font-medium">
                                ${coin.market_data.high_24h.usd.toLocaleString("en-US")}
                            </div>
                        </div>

                        <div className="p-4 rounded-lg border border-gray-800">
                            <div className="text-sm text-red-400">24h Low</div>
                            <div className="text-xl font-medium">
                                ${coin.market_data.low_24h.usd.toLocaleString("en-US")}
                            </div>
                        </div>

                        <div className="p-4 rounded-lg border border-gray-800">
                            <div className="text-sm text-gray-400">Circulating Supply</div>
                            <div className="text-xl font-medium">
                                {formatNumber(coin.market_data.circulating_supply)}
                            </div>
                        </div>

                    </div>

                    <div className="flex gap-2 my-3">
                        {[1, 7, 30, 90].map(d => (
                            <button
                                key={d}
                                onClick={() => setDays(d)}
                                className={`px-3 py-1 rounded ${days === d ? 'bg-blue-600' : 'bg-gray-700'}`}
                            >
                                {d}d
                            </button>
                        ))}
                    </div>


                    {historyLoading ? (
                        <div className="w-full h-64 bg-gray-800 rounded animate-pulse" />
                    ) : (
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={history}>
                                <CartesianGrid stroke="#222" strokeDasharray="3 3" />
                                <XAxis dataKey="time" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                                <YAxis tickFormatter={(v) => `$${v >= 1000 ? v.toLocaleString() : v}`} tick={{ fill: '#9CA3AF' }} />
                                <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} labelStyle={{ color: '#9CA3AF' }} />
                                <Line type="monotone" dataKey="price" stroke="#60A5FA" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    )}


                </div>
            </div>
        )
    );



}