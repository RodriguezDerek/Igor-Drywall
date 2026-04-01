import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Service from './pages/Service';
import Gallery from './pages/Gallery';
import Quote from './pages/Quote';

export default function App() {
  return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Service />} />
                    <Route path="/quote" element={<Quote />} />
                    <Route path="/gallery" element={<Gallery />} />
                </Routes>
            </Router>
        </>
    )
}