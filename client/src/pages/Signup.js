import { useState } from "react";
import "../style/style.scss";
import { useAuthContext } from "../hooks/useAuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { dispatch } = useAuthContext();
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const signup = { email, password, repeatPassword };

    const res = await fetch("api/user/signup", {
      method: "POST",
      body: JSON.stringify(signup),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();

    if (!res.ok) {
      setError(json.error);
      console.log("empty fields: ", json.emptyFields);
      console.log("error : ", json.error);

      setEmptyFields(json.emptyFields || []);
    }
    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "signup", payload: json });
      setEmail("");
      setPassword("");
      setRepeatPassword("");
      setError(null);
      setEmptyFields([]);
      console.log("new user added", json);
      setSuccessMessage("User added successfullyyyyyyy!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="signupH2">Sign Up</h2>
      {successMessage && <div></div>}

      <p className="signupP">
        <label className="floatLabel">Email</label>
        <input
          name="Email"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className={emptyFields.includes("email") ? "error" : " "}
        />
      </p>
      <p className="signupP">
        <label className="floatLabel">Password</label>
        <input
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className={emptyFields.includes("password") ? "error" : " "}
        />
      </p>
      <p className="signupP">
        <label className="floatLabel">Repeat Password</label>
        <input
          name="Repeatpassword"
          type="password"
          onChange={(e) => setRepeatPassword(e.target.value)}
          value={repeatPassword}
          className={emptyFields.includes("repeatPassword") ? "error" : " "}
        />
      </p>
      <button> Create Account</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
