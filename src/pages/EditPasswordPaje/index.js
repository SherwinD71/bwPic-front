import EditPasswordForm from "../../components/EditPasswordForm";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import decodeTokenData from "../../helpers/decodeTokenData";

const EditPasswordPage = () => {
  const [token] = useUserTokenContext();
  const { id } = decodeTokenData(token);

  return (
    <main className="flex-col vhMax">
      <div className="boxData">
        <EditPasswordForm userId={id} />
      </div>
    </main>
  );
};

export default EditPasswordPage;
