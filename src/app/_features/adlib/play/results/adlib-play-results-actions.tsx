"use client";

import React from "react";
import { Copy, Ellipsis, Link, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

interface AdlibPlayResultsActionsProps {
  resultText: string;
  title: string;
}

export default function AdlibPlayResultsActions({
  resultText,
  title,
}: AdlibPlayResultsActionsProps) {
  const formatText = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, (_, match) => `"${match}"`);
  };

  const handleCopyText = async () => {
    try {
      const formattedText = formatText(resultText);
      await navigator.clipboard.writeText(formattedText);
      toast.success("Story copied to clipboard!");
    } catch {
      toast.error("Failed to copy story");
    }
  };

  const handleCopyLink = async () => {
    try {
      const url = window.location.href;
      const shareText = `Check out my Mad Lib story: "${title}"\n\nRead it here: ${url}`;
      await navigator.clipboard.writeText(shareText);
      toast.success("Share link copied to clipboard!");
    } catch {
      toast.error("Failed to copy share link");
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        const formattedText = formatText(resultText);
        await navigator.share({
          title: `Mad Lib: ${title}`,
          text: `Check out my Mad Lib story!\n\n${formattedText}`,
          url: window.location.href,
        });
      } else {
        throw new Error("Share not supported");
      }
    } catch {
      toast.error("Failed to share");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 items-center justify-center p-0"
          aria-label="Share"
        >
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[10rem]">
        <DropdownMenuLabel>Share</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleCopyText} className="flex gap-2">
          <Copy className="h-4 w-4" />
          Copy Story
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyLink} className="flex gap-2">
          <Link className="h-4 w-4" />
          Copy Link
        </DropdownMenuItem>
        {typeof navigator.share === "function" && (
          <DropdownMenuItem onClick={handleShare} className="flex gap-2">
            <Share2 className="h-4 w-4" />
            Share Story
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
