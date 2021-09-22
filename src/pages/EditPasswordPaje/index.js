import EditPasswordForm from "../../components/EditPasswordForm";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import decodeTokenData from "../../helpers/decodeTokenData";

const EditPasswordPage = () => {
  const [token] = useUserTokenContext();
  const { id } = decodeTokenData(token);

  return (
    <main className="centered-container">
      <div className="boxAccount">
        <h2 className="f-s-l">Cambiar contraseña</h2>
        <EditPasswordForm userId={id} />
      </div>
    </main>
  );
};

export default EditPasswordPage;
