import { Routes, Route } from 'react-router-dom'
import Terms from './pages/Terms'
import Pricelist from './pages/Pricelist'
import './assets/css/App.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Terms />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/pricelist" element={<Pricelist />} />
      </Routes>
    </div>
  )
}

export default App