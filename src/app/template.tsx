import { env } from "~/env";
import GoogleAdsense from "./_features/google-ads/google-adsense";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <GoogleAdsense pId={env.GOOGLE_ADSENSE_ID ?? ""} />
    </div>
  );
}
