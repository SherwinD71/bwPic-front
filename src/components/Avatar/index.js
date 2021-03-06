import "./style.css";
const Avatar = ({ avatar, username }) => {
  return (
    <img
      className="user_avatar"
      src={`${process.env.REACT_APP_BACKEND_URL}/${
        avatar || "defaultAvatar.jpg"
      }`}
      alt={`Avatar de ${username}`}
    />
  );
};

export default Avatar;
