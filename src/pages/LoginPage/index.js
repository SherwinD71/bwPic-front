import LoginForm from "../../components/LoginForm";

const LoginPage = () => {
  return (
    <main className="centered-container">
      <div className="boxAccount">
        <h2 className="f-s-l">Inicia sesión</h2>
        <LoginForm />
      </div>
    </main>
  );
};

export default LoginPage;
