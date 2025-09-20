import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import CoinDetail from "./pages/CoinDetail"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/coin/:id" element={<CoinDetail />} />
    </Routes>
  )
}

export default App
