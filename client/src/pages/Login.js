import { useState } from "react";
import "../style/style.scss";
import { useAuthContext } from "../hooks/useAuthContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [emptyLoginFields, setEmptyLoginFields] = useState([]);
  const { dispatch } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const login = { email, password };

    const res = await fetch("api/user/login", {
      method: "POST",
      body: JSON.stringify(login),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();

    if (!res.ok) {
      setError(json.error);
      console.log("empty fields: ", json.emptyLoginFields);
      console.log("error : ", json.error);

      setEmptyLoginFields(json.emptyLoginFields || []);
    }
    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setEmail("");
      setPassword("");
      setError(null);
      setEmptyLoginFields([]);
      console.log("Login", json);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="signupH2">Login</h2>
      <p className="signupP">
        <label className="floatLabel">Email</label>
        <input
          name="Email"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className={emptyLoginFields.includes("email") ? "error" : " "}
        />
      </p>
      <p className="signupP">
        <label className="floatLabel">Password</label>
        <input
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className={emptyLoginFields.includes("password") ? "error" : " "}
        />
      </p>

      <button> Login</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
