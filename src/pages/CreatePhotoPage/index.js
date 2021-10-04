import CreatePhotoForm from "../../components/CreatePhotoForm";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import { Redirect } from "react-router";

const CreatePhotoPage = () => {
  const [token] = useUserTokenContext();

  if (!token) {
    return <Redirect to="/login" />;
  }

  return (
    <main className="flex-col vhMax">
      <div className="boxData">
        <h2>Sube tú foto</h2>
        <CreatePhotoForm />
      </div>
    </main>
  );
};

export default CreatePhotoPage;
