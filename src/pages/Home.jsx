import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Home() {

    const [loading, setLoading] = useState(true)
    const [coins, setCoins] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false")

                const data = await res.json()
                setCoins(data)
                setLoading(false)

            } catch (err) {
                console.error("Error fetching data:", err)
            }
        }
        fetchData()
    }, [])


    const filterCoins = coins.filter(
        (coin) =>
            coin.name.toLowerCase().includes(search.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(search.toLowerCase())
    )


    function formatMarketCap(num) {
        if (num >= 1e12) return (num / 1e12).toFixed(3) + " T"; // Trillion
        if (num >= 1e9) return (num / 1e9).toFixed(3) + " B";  // Billion
        if (num >= 1e6) return (num / 1e6).toFixed(3) + " M";  // Million
        return num.toLocaleString("en-US"); // fallback
    }


    return (
        <div className="bg-gray-900 min-h-screen p-8 text-white">
            <h1 className="text-3xl text-center mb-12 font-bold">Bhadwa Tracker</h1>
            <div className="flex justify-center mb-12">
                <input type="text"
                    className="px-8 py-2 bg-gray-800 rounded-lg mb-6 border w-300"
                    placeholder="Search coin..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 gap-8">
                {loading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 col-span-full">
                        {Array.from({ length: 8 }).map((_, id) => (
                            <div key={id} className="bg-gray-800 h-70 rounded-2xl p-6 animate-pulse">
                                <div className="flex justify-center mb-4">
                                    <div className="h-26 w-26 mb-2 bg-gray-700 rounded-full"></div>
                                </div>
                                <div className="h-5 bg-gray-700 rounded w-3/4 mx-auto mb-2"></div>
                                <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto mb-3"></div>
                                <div className="h-4 bg-gray-700 rounded w-1/3 mx-auto"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    filterCoins.map((coin) => (
                        <Link
                            key={coin.id}
                            to={`/coin/${coin.id}`}
                            className="bg-gray-800 hover:scale-105 transition-transform duration-200 rounded-2xl shadow-md shadow-gray-700 p-8">
                            <div className="flex justify-center mb-2">
                                <img src={
                                    coin.image !== "N/A"
                                        ? coin.image
                                        : "https://via.placeholder.com/300x450?text=No+Image"
                                }
                                    alt={coin.name}
                                    className="rounded-md w-25 h-25 mb-2" />
                            </div>
                            <h2 className="text-lg font-semibold text-center">{coin.name}</h2>
                            <p className={`text-lg text-center italic mb-2 ${coin.ath_change_percentage
                                > 0 ? "text-green-400" : "text-red-400"}`}>{coin.ath_change_percentage.toFixed(2)}%
                            </p>
                            <p className="text-md font-bold text-gray-300 text-center">{formatMarketCap(coin.market_cap)}</p>
                        </Link>
                    )
                    )
                )}
            </div>
        </div>
    )
}

export default Home