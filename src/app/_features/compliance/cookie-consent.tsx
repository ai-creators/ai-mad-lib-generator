"use client";

import React, { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const COOKIE_CONSENT_KEY = "cookie-consent";

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!hasConsented) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    setShowConsent(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "false");
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-xl">
      <Card className="fixed bottom-4 left-4 z-50 max-w-2xl">
        <CardHeader>
          <CardTitle>Cookie Consent</CardTitle>
          <CardDescription>
            We use cookies to enhance your experience and analyze our website
            traffic. By clicking &apos;Accept&apos;, you agree to our use of
            cookies.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            We use essential cookies to ensure the basic functionality of our
            website and analytical cookies to understand how you interact with
            our website. You can customize your preferences at any time.
          </p>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleDecline}>
            Decline
          </Button>
          <Button onClick={handleAccept}>Accept</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
