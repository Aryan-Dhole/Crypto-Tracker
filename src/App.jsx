import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import CoinDetail from "./pages/CoinDetail"
import GraphDemo from "./graphDemo";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/coin/:id" element={<CoinDetail />} />
    </Routes>
  )
  // return (
  // <div>
  //  <GraphDemo />
  //  </div>
  // )
}

export default App
