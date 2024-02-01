import { AdlibResponseModel } from "@/models/AdlibResponseModel";
import { ErrorModel } from "@/models/ErrorModel";
import { adlibResponseService } from "@/services/AdlibResponseService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const useAdlibView = () => {
  const { adlibResponseId } = useParams();
  const [response, setResponse] = useState<AdlibResponseModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorModel | null>(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (adlibResponseId) {
        const [data, apiError] = await adlibResponseService.findById(
          +adlibResponseId
        );

        if (data) {
          setResponse(data);
        }

        if (apiError) {
          setError(apiError);
        }
      }
      setIsLoading(false);
    })();
  }, []);

  return { response, isLoading, error };
};
