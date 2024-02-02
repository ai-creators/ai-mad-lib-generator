import { AdlibModel } from "@/models/AdlibModel";
import storage from "@/utils/Storage";
import { useEffect, useState } from "react";

export const useSavesPrompts = () => {
  const [adlibs, setAdlibs] = useState<AdlibModel[]>([]);

  useEffect(() => {
    const adlibs = storage.get("bookmarks") ?? [];

    if (adlibs.length) {
      setAdlibs(adlibs);
    }
  }, []);

  return { adlibs };
};
