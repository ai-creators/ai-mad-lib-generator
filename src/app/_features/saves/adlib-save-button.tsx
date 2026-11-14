"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { useSavedAdlibs } from "~/hooks/use-saved-adlibs";
import { cn } from "~/lib/utils";

interface AdlibSaveButtonProps {
  adlibId: string;
  className?: string;
}

export default function AdlibSaveButton({
  adlibId,
  className,
}: AdlibSaveButtonProps) {
  const { isSaved, toggleSaved } = useSavedAdlibs();
  const saved = isSaved(adlibId);

  const handleClick = () => {
    toggleSaved(adlibId);
    toast.success(saved ? "Removed from saves" : "Adlib saved");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("h-8 w-8", className)}
      aria-label={saved ? "Unsave adlib" : "Save adlib"}
      data-cy="save-adlib-btn"
      onClick={handleClick}
    >
      {saved ? <BookmarkCheck /> : <Bookmark />}
    </Button>
  );
}
