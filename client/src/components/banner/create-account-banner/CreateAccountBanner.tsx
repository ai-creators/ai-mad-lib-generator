import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAuth0 } from "@auth0/auth0-react";
import { X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  isLoading: boolean;
};

const CreateAccountBanner = ({ isLoading }: Props) => {
  const { account } = useAppSelector((state) => state.account);
  const { isLoading: isAuthLoading, isAuthenticated } = useAuth0();
  const [isClosed, setIsClosed] = useState<boolean>(false);

  return !isAuthLoading &&
    !isLoading &&
    isAuthenticated &&
    !account.id &&
    !isClosed ? (
    <Alert className="fixed top-5 left-1/2 -translate-x-1/2 z-[55] w-fit rounded flex gap-10">
      <div>
        <AlertTitle>Finish Setting up your account!</AlertTitle>
        <AlertDescription>
          Your account is not finished being setup.{" "}
          <Link
            to="/account/setup"
            className="underline underline-offset-2"
            onClick={() => setIsClosed(true)}
          >
            Click here to finish
          </Link>
        </AlertDescription>
      </div>

      <Button
        variant="ghost"
        className="p-2 h-8 my-auto"
        onClick={() => setIsClosed(true)}
      >
        <X size={16} />
      </Button>
    </Alert>
  ) : null;
};

export default CreateAccountBanner;
