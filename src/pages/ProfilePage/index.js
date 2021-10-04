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
    <main className="flex-col vhMax">
      <div className="boxData">
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
