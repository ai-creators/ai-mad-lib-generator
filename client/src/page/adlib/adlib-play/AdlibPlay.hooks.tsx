import { AdlibModel } from "@/models/AdlibModel";
import { ErrorModel } from "@/models/ErrorModel";
import AdlibService from "@/services/AdlibService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const useAdlibPlay = () => {
  const { adlibId } = useParams();
  const [adlib, setAdlib] = useState<AdlibModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorModel | null>(null);

  useEffect(() => {
    (async () => {
      setError(null);
      setIsLoading(true);
      if (!adlibId) {
        setError({ message: "An adlib id is required." });
        return;
      }
      const [data, apiError] = await AdlibService.findAdlibById(+adlibId);
      if (data) {
        setAdlib(data);
      }

      if (apiError) {
        setError(apiError);
      }
      setIsLoading(false);
    })();
  }, [adlibId]);

  return { adlib, isLoading, error };
};
