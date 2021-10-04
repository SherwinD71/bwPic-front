import { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useUserTokenContext();

  const login = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (res.ok) {
      const body = await res.json();
      setToken(body.data.token);
    } else {
      const error = await res.json();
      toast.error(error.message);
    }
  };

  if (token) {
    return <Redirect to="/photos" />;
  }

  return (
    <form onSubmit={login}>
      <div className="flex-col">
        <label>
          <input
            required
            id="email"
            name="email"
            type="email"
            value={email}
            placeholder="E-mail"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
      </div>
      <div className="flex-col">
        <label>
          <input
            required
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
      </div>
      <div className="flex-col">
        <button className="buttonform" type="submit">
          Inicia sesión
        </button>
      </div>
      <div className="text-align-center text-bold">
        <Link to="/register">¡Regístrate!</Link>
      </div>
    </form>
  );
};

export default LoginForm;
