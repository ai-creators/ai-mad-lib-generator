import defaultAvatar from "./default_avatar.jpg";

type Props = {
  avatarUrl?: string;
  width?: string;
  height?: string;
  id?: string;
};

const Avatar = ({
  avatarUrl = defaultAvatar,
  width = "w-12",
  height = "h-12",
  id,
}: Props) => {
  return (
    <span className={`${width} ${height} rounded-full relative block`} id={id}>
      <img
        src={avatarUrl}
        alt="avatar"
        className="inline-block h-full w-full rounded-full object-cover"
        id={id}
      />
    </span>
  );
};

export default Avatar;
