import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"

export default function CoinDetail() {
    const { id } = useParams();
    const [coin, setCoin] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        const fetchCoin = async () => {

            const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
            const data = await res.json()
            setCoin(data)
            setLoading(false)

        }
        fetchCoin()
    }, [id])

    function formatNumber(num) {
        if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
        if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
        if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
        return num.toLocaleString("en-US");
    }



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

                    {/* Stats grid skeleton */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <div className="max-w-3xl mx-auto p-4">
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

                    {/* Stats grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg border border-gray-800">
                            <div className="text-sm text-gray-400">Price</div>
                            <div className="text-2xl font-semibold">
                                ${coin.market_data.current_price.usd.toLocaleString("en-US")}
                                <span
                                    className={`ml-3 text-base ${coin.market_data.price_change_percentage_24h >= 0
                                        ? "text-green-400"
                                        : "text-red-400"
                                        }`}
                                >
                                    {coin.market_data.price_change_percentage_24h.toFixed(2)}%
                                </span>
                            </div>
                        </div>

                        <div className="p-4 rounded-lg border border-gray-800">
                            <div className="text-sm text-gray-400">Market Cap</div>
                            <div className="text-xl font-medium">
                                ${formatNumber(coin.market_data.market_cap.usd)}
                            </div>
                        </div>

                        <div className="p-4 rounded-lg border border-gray-800">
                            <div className="text-sm text-gray-400">24h High</div>
                            <div className="text-xl font-medium">
                                ${coin.market_data.high_24h.usd.toLocaleString("en-US")}
                            </div>
                        </div>

                        <div className="p-4 rounded-lg border border-gray-800">
                            <div className="text-sm text-gray-400">24h Low</div>
                            <div className="text-xl font-medium">
                                ${coin.market_data.low_24h.usd.toLocaleString("en-US")}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );



}