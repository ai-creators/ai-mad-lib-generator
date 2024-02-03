import { FormEvent, useState } from "react";
import ButtonPrimary from "../../../components/button/button-primary/ButtonPrimary";
import Layout from "../../../layout/Layout";
import { useAuth0 } from "@auth0/auth0-react";
import { ErrorModel } from "../../../models/ErrorModel";
import ErrorAlert from "../../../components/errors/ErrorAlert";
import AccountService from "../../../services/AccountService";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { setAccount } from "../../../slices/accountSlice";

const AccountSetupPage = () => {
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<ErrorModel | null>(null);

  const { user } = useAuth0();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const changeUsername = (event: FormEvent<HTMLInputElement>) => {
    setUsername(event.currentTarget.value);
  };

  const saveAccount = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    if (user?.sub) {
      const { data, error } = await AccountService.setupAccount(
        username,
        user?.sub
      );
      if (data) {
        dispatch(setAccount(data));
        navigate("/");
      }
      if (error) {
        setError(error);
      }
    } else {
      setError({ message: "Error gathering user information." });
    }
  };

  return (
    <Layout bgColor="bg-zinc-200">
      <div className="container mx-auto flex justify-center items-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-5 py-5">
          <ErrorAlert
            error={error}
            setError={setError}
            className="w-full text-center"
          />
          <div className="border rounded border-zinc-300 bg-white p-5 flex flex-col gap-5 w-[25rem]">
            <header className="text-center flex flex-col gap-2">
              <h4 className="text-xl font-semibold">Account Setup</h4>
              <p className="text-zinc-500">Finish Setting up your account</p>
            </header>
            <form className="flex flex-col gap-5" onSubmit={saveAccount}>
              <div className="flex flex-col gap-1">
                <label>Username</label>
                <input
                  className="p-3 border rounded border-zinc-300"
                  placeholder="Username"
                  value={username}
                  onChange={changeUsername}
                />
              </div>
              <div>
                <ButtonPrimary className="w-full">Finish</ButtonPrimary>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AccountSetupPage;
