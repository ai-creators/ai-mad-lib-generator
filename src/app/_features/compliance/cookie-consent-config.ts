import type { CookieConsentConfig } from "vanilla-cookieconsent";

const pluginConfig: CookieConsentConfig = {
  guiOptions: {
    consentModal: {
      layout: "box",
      position: "bottom left",
      equalWeightButtons: true,
      flipButtons: false,
    },
    preferencesModal: {
      layout: "box",
      position: "left",
      equalWeightButtons: true,
      flipButtons: false,
    },
  },

  categories: {
    necessary: {
      readOnly: true,
      enabled: true,
    },
    analytics: {
      autoClear: {
        cookies: [
          {
            name: /^(_ga|_gid)/,
          },
        ],
      },
    },
  },

  language: {
    default: "en",

    translations: {
      en: {
        consentModal: {
          title: "Hello traveller, it's cookie time!",
          description:
            'Our website uses tracking cookies to understand how you interact with it. The tracking will be enabled only if you accept explicitly. <a href="#privacy-policy" data-cc="show-preferencesModal" class="cc__link">Manage preferences</a>',
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Reject all",
          showPreferencesBtn: "Manage preferences",
          //closeIconLabel: 'Close',
          footer: `
            <a href="/privacy-policy">Privacy Policy</a>
          `,
        },
        preferencesModal: {
          title: "Cookie preferences",
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Reject all",
          savePreferencesBtn: "Save preferences",
          closeIconLabel: "Close",
          sections: [
            {
              title: "Cookie Usage",
              description:
                'We use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in/out whenever you want. For more details, please read the full <a href="/privacy-policy" class="cc__link">cookie policy</a>.',
            },
            {
              title: "Strictly necessary cookies",
              description:
                "These cookies are required for the site to function properly (e.g. remembering your cookie preferences) and cannot be disabled.",
              linkedCategory: "necessary",
              cookieTable: {
                headers: {
                  name: "Name",
                  domain: "Service",
                  description: "Description",
                  expiration: "Expiration",
                },
                body: [
                  {
                    name: "cc_cookie",
                    domain: "AiAdlibs",
                    description: "Remembers your cookie consent choices.",
                    expiration: "6 months",
                  },
                ],
              },
            },
            {
              title: "Performance and Analytics cookies",
              linkedCategory: "analytics",
              cookieTable: {
                headers: {
                  name: "Name",
                  domain: "Service",
                  description: "Description",
                  expiration: "Expiration",
                },
                body: [
                  {
                    name: "_ga",
                    domain: "Google Analytics",
                    description: "Used to distinguish unique visitors.",
                    expiration: "Expires after 12 days",
                  },
                  {
                    name: "_gid",
                    domain: "Google Analytics",
                    description: "Used to distinguish unique visitors.",
                    expiration: "Session",
                  },
                ],
              },
            },
            {
              title: "More information",
              description:
                'For any questions about our use of cookies, please see our <a class="cc__link" href="/privacy-policy">cookie policy</a>.',
            },
          ],
        },
      },
    },
  },
};

export default pluginConfig;
