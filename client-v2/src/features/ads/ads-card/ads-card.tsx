"use client";

import { env } from "@/config/env";
import React, { useEffect } from "react";

const AdsCard = (
  props: React.DetailedHTMLProps<
    React.InsHTMLAttributes<HTMLModElement>,
    HTMLModElement
  >
) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle adbanner-customize"
      style={{
        display: "block",
        overflow: "hidden",
      }}
      data-ad-client={env.GA_ID}
      {...props}
    />
  );
};

export default AdsCard;
