import React from "react";

const Logout = ({ onLogout }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");  // Elimina token
    onLogout();                       
  };

  return (
    <button onClick={handleLogout}>
      Cerrar sesión
    </button>
  );
};

export default Logout;
