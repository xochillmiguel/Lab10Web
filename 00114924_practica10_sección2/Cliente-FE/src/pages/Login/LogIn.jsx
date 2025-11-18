import React, { useState } from "react";
import API from "../../utils/api";
import "./LogIn.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/signIn", { email, password });
      localStorage.setItem("token", response.data.token);
      onLogin();
    } catch (err) {
      setError(err.response?.data?.message || "Error en login");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;