import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import "./styles/global.css";

import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/LogIn.jsx";
import CustomerList from "./components/CustomerList/CustomerList.jsx";
import SalesForm from "./components/SalesForm/SalesForm.jsx";
import SalesList from "./components/SalesList/SalesList.jsx";
import SalesReport from "./components/SalesReport/SalesReport.jsx";
import SearchCustomer from "./components/SearchCustomer/SearchCustomer.jsx"; 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  const handleLogin = () => setIsAuthenticated(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />} />
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
        <Route path="api/customers" element={isAuthenticated ? <CustomerList /> : <Navigate to="/" />} />
        <Route path="/sales/create" element={isAuthenticated ? <SalesForm /> : <Navigate to="/" />} />
        <Route path="/sales" element={isAuthenticated ? <SalesList /> : <Navigate to="/" />} />
        <Route path="/sales/report" element={isAuthenticated ? <SalesReport /> : <Navigate to="/" />} />
        <Route path="/customers/search" element={isAuthenticated ? <SearchCustomer /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;