import Container from "../../components/Container/Container";
import { useAuth0 } from "@auth0/auth0-react";
import Card from "../../components/Card/Card";
import ProfileAdlibs from "../../components/Profile/ProfileAdlibs/ProfileAdlibs";

const Profile = () => {
  const { user } = useAuth0();

  return (
    <Container className="grid-aside py-12 gap-12">
      <Card useForSmall>
        <div>
          <h4 className="text-2xl font-semibold lowercase">{user?.name}</h4>
          <p className="text-zinc-400">Welcome Back,</p>
        </div>
      </Card>
      <ProfileAdlibs />
    </Container>
  );
};

export default Profile;
