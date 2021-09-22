import { useUserTokenContext } from "../../contexts/UserTokenContext";
import useUserProfile from "../../hooks/useUserProfile";
import EditUserForm from "../../components/EditUserForm";
import { Redirect } from "react-router";

const ProfilePage = () => {
  const [token] = useUserTokenContext();
  const [user] = useUserProfile(token);

  if (!token) {
    return <Redirect to="/login" />;
  }

  return (
    <main className="centered-container">
      <div className="boxAccount">
        <h2 className="f-s-l">Profile</h2>
        {Object.values(user).length > 0 && (
          <EditUserForm
            userId={user.id}
            userAvatar={user.avatar}
            oldEmail={user.email}
            oldName={user.name}
            oldUserName={user.username}
          />
        )}
      </div>
    </main>
  );
};

export default ProfilePage;
