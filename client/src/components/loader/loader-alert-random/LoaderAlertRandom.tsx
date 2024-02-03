import { useEffect, useState } from "react";
import LoaderAlert from "../loader-alert/LoaderAlert";

const LoaderAlertRandom = () => {
  const [body, setBody] = useState<string>("Loading...");
  useEffect(() => {
    (async () => {
      if (body === "Loading...") {
        const response = await fetch("/random-quotes.json");
        const quotes: { body: string; author: string }[] =
          await response.json();
        if (quotes.length > 0) {
          const randomIndex = Math.floor(Math.random() * quotes.length);
          const quote = quotes[randomIndex];
          if (quote?.body) {
            setBody(`${quote.body} -${quote.author}`);
          }
        }
      }
    })();
  }, []);
  return <LoaderAlert title="Loading" description={body} />;
};

export default LoaderAlertRandom;
