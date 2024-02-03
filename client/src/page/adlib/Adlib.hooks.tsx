import { AdlibModel } from "@/models/AdlibModel";
import { ErrorModel } from "@/models/ErrorModel";
import AdlibService from "@/services/AdlibService";
import storage from "@/utils/Storage";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const useAdlib = () => {
  const { adlibId } = useParams();
  const [adlib, setAdlib] = useState<AdlibModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorModel | null>(null);
  const [hasSaved, setHasSaved] = useState<boolean>(false);

  useEffect(() => {
    const fetchAdlib = async () => {
      setError(null);
      setIsLoading(true);
      if (!adlibId) {
        setError({ message: "An adlib id is required." });
        setIsLoading(false);
        return;
      }
      const [data, apiError] = await AdlibService.findAdlibById(+adlibId);
      if (data) {
        setAdlib(data);
        checkIfAdlibIsSaved(data.id);
      }
      if (apiError) {
        setError(apiError);
      }
      setIsLoading(false);
    };

    fetchAdlib();
  }, [adlibId]);

  const checkIfAdlibIsSaved = (id: number) => {
    const foundAdlibs = storage.get("bookmarks") ?? [];
    const isSaved = foundAdlibs.some((adlib: AdlibModel) => adlib.id === id);
    setHasSaved(isSaved);
  };

  const saveAdlib = () => {
    let adlibs = storage.get("bookmarks") ?? [];
    if (hasSaved) {
      adlibs = adlibs.filter((adlib: AdlibModel) => adlib.id !== adlib?.id);
      setHasSaved(false);
    } else {
      if (adlib) {
        adlibs.push(adlib);
        setHasSaved(true);
      }
    }
    storage.set("bookmarks", adlibs);
  };

  return { adlib, isLoading, error, hasSaved, saveAdlib };
};
