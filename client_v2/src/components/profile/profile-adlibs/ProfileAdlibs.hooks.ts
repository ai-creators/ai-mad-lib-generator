import { useEffect, useState } from "react";
import { AdlibModel } from "../../../models/AdlibModel";
import { ErrorModel } from "../../../models/ErrorModel";
import AdlibService from "../../../services/AdlibService";

export const useProfileAdlibs = (username: string) => {
  const [adlibs, setAdlibs] = useState<AdlibModel[]>([]);
  const [error, setError] = useState<ErrorModel | null>(null);
  const [timestamp] = useState<Date>(new Date());

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      const { data, error } = await AdlibService.getAdlibsByUsername(
        username,
        timestamp,
        controller
      );
      if (data) {
        setAdlibs(data.results);
      }

      if (error) {
        setError(error);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [timestamp, username]);
  return { adlibs, error };
};
