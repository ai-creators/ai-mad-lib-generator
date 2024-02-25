import { AdlibModel } from "@/models/AdlibModel";
import { storage } from "@/utils/Storage";
import { useEffect, useState } from "react";

export const useSavesPrompts = () => {
  const [adlibs, setAdlibs] = useState<AdlibModel[]>([]);

  useEffect(() => {
    const adlibs = storage.get("bookmarks") ?? [];

    if (adlibs.length) {
      setAdlibs(adlibs);
    }
  }, []);

  const deleteAdlib = (adlib: AdlibModel) => {
    let adlibs = storage.get("bookmarks") ?? [];
    adlibs = adlibs.filter((a: AdlibModel) => a.id !== adlib.id);
    storage.set("bookmarks", adlibs);
    setAdlibs(adlibs);
  };

  return { adlibs, deleteAdlib };
};
