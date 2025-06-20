import { env } from "~/env";
import GoogleAdsense from "./_features/google-ads/google-adsense";
import CookieConsent from "./_features/compliance/cookie-consent";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <CookieConsent />
      <GoogleAdsense pId={env.GOOGLE_ADSENSE_ID ?? ""} />
    </div>
  );
}
