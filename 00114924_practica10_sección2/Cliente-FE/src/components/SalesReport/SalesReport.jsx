import { useState } from "react";
import "./SalesReport.css";

function SalesReport() {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchReport = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:3000/api/sales/report", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      const data = await response.json();
      setReport(data);
    } catch (error) {
      console.error("Error al cargar el reporte:", error);
      setError("Error al cargar el reporte");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sales-report-container">
      <h2>Reporte de Ventas por Cliente</h2>
      <button onClick={fetchReport}>Cargar Reporte</button>
      {loading && <p>Cargando...</p>}
      {error && <p className="error">{error}</p>}
      <table className="sales-report-table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Total Ventas</th>
          </tr>
        </thead>
        <tbody>
          {report.map((row, index) => (
            <tr key={index}>
              <td>{row.customer_name}</td>
              <td>{row.total_sales}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesReport;
