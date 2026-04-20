import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Service from './pages/Service';
import Gallery from './pages/Gallery';
import Quote from './pages/Quote';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp'
import ForgotPassword from './components/auth/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import Jobs from './pages/Jobs';
import Workers from './pages/Workers';
import Quotes from './pages/Quotes';
import Invoices from './pages/Invoices';
import Setting from './pages/Setting';
import InvoiceView from './components/invoice/InvoiceView';
import InvoiceEdit from './components/invoice/InvoiceEdit';
import InvoiceCreate from './components/invoice/InvoiceCreate';

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
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/workers" element={<Workers />} />
                    <Route path="/quotes" element={<Quotes />} />
                    <Route path="/invoices" element={<Invoices />} />
                    <Route path="/invoices/create" element={<InvoiceCreate />} />
                    <Route path="/invoices/view/:id" element={<InvoiceView />} />
                    <Route path="/invoices/edit/:id" element={<InvoiceEdit />} />
                    <Route path="/settings" element={<Setting />} />
                </Routes>
            </Router>
        </>
    )
}