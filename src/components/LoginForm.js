import { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useUserTokenContext } from "../contexts/UserTokenContext";
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
    <>
      <form onSubmit={login}>
        <div>
          <label className="form-control">
            Email
            <input
              required
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
        </div>
        <div>
          <label className="form-control">
            Password
            <input
              required
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
        </div>
        <div className="btn-container">
          <button type="submit" className="m-t-md btn">
            Iniciar sesión
          </button>
          <div className="m-t-md btn-container">
            <Link to="/register">¡Regístrate!</Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
