import Container from "../../components/Container/Container";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Card from "../../components/Card/Card";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  if (!user) {
    navigate("/");
  }
  console.log("USER: ", user);
  return (
    <Container className="grid-aside py-12 gap-12">
      <Card useForSmall>
        <div>
          <h4 className="text-2xl font-semibold capitalize">{user.name}</h4>
          <p className="text-zinc-400">Welcome Back,</p>
        </div>
      </Card>
      <Card useForSmall>
        <div>
          <h4 className="text-2xl font-semibold capitalize">Your Ad-Libs</h4>
          <p className="text-zinc-400">Recently Created Ad-Libs</p>
        </div>
      </Card>
    </Container>
  );
};

export default Profile;
