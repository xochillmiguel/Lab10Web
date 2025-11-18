import { useState } from "react";
import "./SalesForm.css";

function SalesForm() {
  const [amount, setAmount] = useState("");
  const [idCustomer, setIdCustomer] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const saleData = { amount, id_customer: idCustomer };

    try {
      const response = await fetch("http://localhost:3000/api/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(saleData),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage("La venta fue registrada con éxito ");
        setAmount("");
        setIdCustomer("");
      } else {
        setMessage(data.message || "Error al registrar la venta");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error en la conexión con el servidor");
    }
  };

  return (
    <div className="sales-form-container">
      <h2>Registrar Venta</h2>
      <form className="sales-form" onSubmit={handleSubmit}>
        <label>Monto:</label>
        <input 
          type="number"
          value={amount}
          onChange={(e) => {
            const value = e.target.value;
            if (Number(value) >= 0) {
              setAmount(value);
            }
          }}
          min="0"
          step="0.01"
          required
        />


        <label>ID del Cliente:</label>
        <input
          type="number"
          value={idCustomer}
          onChange={(e) => setIdCustomer(e.target.value)}
          required
        />

        <button type="submit">Registrar</button>
      </form>

      {message && <p className="sales-message">{message}</p>}
    </div>
  );
}

export default SalesForm;
