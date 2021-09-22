import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const register = async (e) => {
    e.preventDefault();

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name, username }),
    });

    if (res.ok) {
      toast.success("Te has registrado correctamente");
      history.push(`/login`);
    } else {
      const error = await res.json();
      toast.error(error.message);
    }
  };

  return (
    <main className="centered-container">
      <div className="boxAccount">
        <h1 className="f-s-l">Regístrate</h1>
        <form onSubmit={register}>
          <label className="form-control">
            Nombre
            <input
              required
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </label>
          <label className="form-control">
            Usuario
            <input
              required
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </label>

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
          <div className="btn-container">
            <button type="submit" className="m-t-md btn">
              Enviar
            </button>
            <div className="m-t-md btn-container">
              <Link to="/login">¡Inicia sesión!</Link>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default RegisterForm;
