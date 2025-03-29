"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export enum ContentRating {
  PG = "PG",
  NSFW = "NSFW",
}

interface ContentRatingContextType {
  contentRating: ContentRating;
  updateContentRating: (rating: ContentRating) => void;
}

const LOCAL_STORAGE_KEY = "contentRating";

const ContentRatingContext = createContext<
  ContentRatingContextType | undefined
>(undefined);

export function ContentRatingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [contentRating, setContentRating] = useState<ContentRating>(
    ContentRating.PG,
  );

  useEffect(() => {
    const savedRating = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (
      savedRating &&
      Object.values(ContentRating).includes(savedRating as ContentRating)
    ) {
      setContentRating(savedRating as ContentRating);
    }
  }, []);

  const updateContentRating = (rating: ContentRating) => {
    setContentRating(rating);
    localStorage.setItem(LOCAL_STORAGE_KEY, rating);
  };

  return (
    <ContentRatingContext.Provider
      value={{ contentRating, updateContentRating }}
    >
      {children}
    </ContentRatingContext.Provider>
  );
}

export function useContentRating() {
  const context = useContext(ContentRatingContext);
  if (context === undefined) {
    throw new Error(
      "useContentRating must be used within a ContentRatingProvider",
    );
  }
  return context;
}
