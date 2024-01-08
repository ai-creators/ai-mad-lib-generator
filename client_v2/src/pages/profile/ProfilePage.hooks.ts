import { useEffect, useState } from "react";
import { AccountModel } from "../../models/AccountModel";
import { ErrorModel } from "../../models/ErrorModel";
import AccountService from "../../services/AccountService";

export const useProfilePage = (username: string | undefined) => {
  const [account, setAccount] = useState<AccountModel | null>(null);

  const [adlibTotal, setAdlibTotal] = useState<number>(0);
  const [responseTotal, setResponseTotal] = useState<number>(0);
  const [bookmarkTotal, setBookmarkTotal] = useState<number>(0);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorModel | null>(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (!username) {
        setError({ message: "Username is required" });
        return;
      }
      const { data, error } = await AccountService.getAccountByUsername(
        username
      );
      if (data) {
        const { account, adlibs, responses, bookmarks } = data;
        if (account) {
          setAccount(account);
        }
        if (adlibs) {
          setAdlibTotal(adlibs);
        }
        if (responses) {
          setResponseTotal(responses);
        }
        if (bookmarks) {
          setBookmarkTotal(bookmarks);
        }
      }

      if (error) {
        setError(error);
      }
      setIsLoading(false);
    })();
  }, [username]);

  return {
    account,
    adlibTotal,
    isLoading,
    error,
    responseTotal,
    bookmarkTotal,
  };
};
