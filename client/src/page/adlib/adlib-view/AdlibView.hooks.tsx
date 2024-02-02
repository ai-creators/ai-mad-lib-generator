import { AdlibResponseModel } from "@/models/AdlibResponseModel";
import { ErrorModel } from "@/models/ErrorModel";
import { adlibResponseService } from "@/services/AdlibResponseService";
import storage from "@/utils/Storage";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const useAdlibView = () => {
  const { adlibResponseId } = useParams();
  const [response, setResponse] = useState<AdlibResponseModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorModel | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    const fetchResponse = async () => {
      setIsLoading(true);
      setError(null);
      if (!adlibResponseId) {
        setError({ message: "An adlib response id is required." });
        setIsLoading(false);
        return;
      }
      const [data, apiError] = await adlibResponseService.findById(
        +adlibResponseId
      );
      if (data) {
        setResponse(data);
        if (data.id) {
          checkIfResponseIsSaved(data.id);
        }
      }
      if (apiError) {
        setError(apiError);
      }
      setIsLoading(false);
    };

    fetchResponse();
  }, [adlibResponseId]);

  const checkIfResponseIsSaved = (id: number) => {
    const savedResponses = storage.get("adlib-responses") ?? [];
    const isSaved = savedResponses.some(
      (response: AdlibResponseModel) => response.id === id
    );
    setIsSaved(isSaved);
  };

  const toggleSaveResponse = () => {
    let savedResponses = storage.get("adlib-responses") ?? [];
    if (isSaved) {
      savedResponses = savedResponses.filter(
        (response: AdlibResponseModel) => response.id !== response?.id
      );
      setIsSaved(false);
    } else {
      if (response) {
        savedResponses.push(response);
        setIsSaved(true);
      }
    }
    storage.set("adlib-responses", savedResponses);
  };

  return { response, isLoading, error, isSaved, toggleSaveResponse };
};
