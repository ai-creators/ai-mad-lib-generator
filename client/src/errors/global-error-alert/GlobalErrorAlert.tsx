import { ErrorModel } from "@/models/ErrorModel";
import ErrorAlertFixed from "../error-alert-fixed/ErrorAlertFixed";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { voidGlobalError } from "@/slices/globalErrorSlice";

type Props = {
  error: ErrorModel | null;
};

const GlobalErrorAlert = ({ error }: Props) => {
  const dispatch = useAppDispatch();
  const setError = () => {
    dispatch(voidGlobalError());
  };
  return <ErrorAlertFixed error={error} setError={setError} showClose />;
};

export default GlobalErrorAlert;
