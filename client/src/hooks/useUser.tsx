import { useEffect, useState } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import { userService } from "@/services/UserService";
import { setUser } from "@/slices/userSlice";
import { setGlobalError } from "@/slices/globalErrorSlice";

export const useUser = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);

    if (user?.id) {
      (async () => {
        const [data, error] = await userService.findUserById(user.id);

        if (data && !ignore) {
          dispatch(setUser(data));
        }

        if (error && !ignore) {
          dispatch(setGlobalError(error));
        }
      })();
    }
    setIsLoading(false);

    return () => {
      ignore = true;
    };
  }, [dispatch, user.id]);

  return { isLoading };
};
