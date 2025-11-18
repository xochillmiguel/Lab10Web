import { useState } from "react";
import "./SalesList.css";

function SalesList() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSales = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:3000/api/sales", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      const data = await response.json();
      setSales(data);
    } catch (error) {
      console.error("Error al cargar las ventas:", error);
      setError("Error al cargar las ventas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sales-list-container">
      <h2>Listado de Ventas</h2>
      <button onClick={fetchSales}>Cargar Ventas</button>
      {loading && <p>Cargando...</p>}
      {error && <p className="error">{error}</p>}
      <table className="sales-list-table">
        <thead>
          <tr>
            <th>ID Venta</th>
            <th>Monto</th>
            <th>Fecha</th>
            <th>Cliente</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale, index) => (
            <tr key={index}>
              <td>{sale.id}</td>
              <td>{sale.amount}</td>
              <td>{sale.created_at}</td>
              <td>{sale.customer_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesList;
