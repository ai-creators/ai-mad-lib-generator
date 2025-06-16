"use client";

import { useEffect } from 'react';
import * as CookieConsent from 'vanilla-cookieconsent';
import pluginConfig from './cookie-consent-config';

const CookieConsentComponent = () => {
  useEffect(() => {
    void CookieConsent.run(pluginConfig);
  }, []);

  return null;
};

export default CookieConsentComponent;
