import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <h1>Mini Proyecto - Guía X</h1>
      <ul className="menu">
        <li><Link to="/api/customers">Ver Clientes</Link></li>
        <li><Link to="/sales/create">Registrar Venta</Link></li>
        <li><Link to="/sales">Listado de Ventas</Link></li>
        <li><Link to="/sales/report">Reporte por Cliente</Link></li>
        <li><Link to="/customers/search">Buscar Cliente por Código</Link></li>
      </ul>
    </div>
  );
}