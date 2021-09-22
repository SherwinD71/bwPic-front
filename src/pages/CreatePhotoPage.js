import CreatePhotoForm from "../components/CreatePhotoForm";
import { useUserTokenContext } from "../contexts/UserTokenContext";
import { Redirect } from "react-router";

const CreatePhotoPage = () => {
  const [token] = useUserTokenContext();

  if (!token) {
    return <Redirect to="/login" />;
  }

  return (
    <main className="centered-container p-r-md p-l-md m-b-lg">
      <div className="boxAccount">
        <h2 className="f-s-l m-t-lg m-b-lg">Crea tu recuerdo</h2>
        <CreatePhotoForm />
      </div>
    </main>
  );
};

export default CreatePhotoPage;
