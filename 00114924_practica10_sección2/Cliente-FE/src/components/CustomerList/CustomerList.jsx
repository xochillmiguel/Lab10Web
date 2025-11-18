import { useState } from "react";
import API from "../../utils/api";
import "./CustomerList.css";

 function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCustomers = async () => {
    setLoading(true);
    setError("");
    
    try {
      const response = await API.get("/api/customers");
      setCustomers(response.data);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los clientes. Verifica tu sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="customer-list">
      <h2>Listado de Clientes</h2>
      
      <button onClick={fetchCustomers}>
        Cargar Clientes
      </button>

      {loading && <p>Cargando...</p>}
      {error && <p className="error">{error}</p>}

      <table className="customers-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Código</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.address}</td>
              <td>{c.phone}</td>
              <td>{c.code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerList