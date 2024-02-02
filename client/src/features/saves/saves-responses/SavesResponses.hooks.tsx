import { AdlibResponseModel } from "@/models/AdlibResponseModel";
import storage from "@/utils/Storage";
import { useEffect, useState } from "react";

export const useSavesResponses = () => {
  const [responses, setResponses] = useState<AdlibResponseModel[]>([]);

  useEffect(() => {
    const adlibResponses = storage.get("adlib-responses") ?? [];

    if (adlibResponses.length) {
      setResponses(adlibResponses);
    }
  }, []);

  return { responses };
};
