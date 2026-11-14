"use client";

import { useEffect, useRef } from "react";
import * as CookieConsent from "vanilla-cookieconsent";
import pluginConfig from "./cookie-consent-config";

const CookieConsentComponent = () => {
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    void CookieConsent.run(pluginConfig);
  }, []);

  return null;
};

export default CookieConsentComponent;
