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

  const deleteResponse = (response: AdlibResponseModel) => {
    let responses = storage.get("adlib-responses") ?? [];
    responses = responses.filter(
      (r: AdlibResponseModel) => r.id !== response.id
    );
    storage.set("adlib-responses", responses);
    setResponses(responses);
  };

  return { responses, deleteResponse };
};
