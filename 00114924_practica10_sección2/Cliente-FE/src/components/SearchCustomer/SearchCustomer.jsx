import { useState } from "react";
import "./SearchCustomer.css";

function SearchCustomer() {
    const [code, setCode] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        if (!code.trim()) {
            setError("Please enter a customer code.");
            return;
        }
        try {
            const response = await fetch(`http://localhost:3000/api/customers/search?code=${code}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            if (response.status === 404) {
                setError("Customer not found.");
                setResult(null);
                return;
            }
            if (!response.ok) {
                setError("Server error.");
                return;
            }
            const data = await response.json();
            setResult(data);
            setError("");
        } catch (error) {
            console.error(error);
            setError("Cannot connect to the server.");
        }
    };


    return (
        <div className="search-container">
            <h2>Search Customer by Code</h2>

            <div className="search-box">
                <input
                    type="text"
                    placeholder="Enter customer code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {error && <p className="error">{error}</p>}

            {result && (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{result.id}</td>
                            <td>{result.name}</td>
                            <td>{result.address}</td>
                            <td>{result.phone}</td>
                            <td>{result.code}</td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default SearchCustomer;