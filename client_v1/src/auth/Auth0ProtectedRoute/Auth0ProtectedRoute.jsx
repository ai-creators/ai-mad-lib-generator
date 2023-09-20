import { useAuth0 } from "@auth0/auth0-react";

const Auth0ProtectedRoute = ({ children }) => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    loginWithRedirect();
  }
  return children;
};

export default Auth0ProtectedRoute;
