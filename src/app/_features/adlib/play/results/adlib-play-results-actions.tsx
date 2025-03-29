"use client";

import React from "react";
import { Copy, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

interface AdlibPlayResultsActionsProps {
  resultText: string;
  title: string;
}

export default function AdlibPlayResultsActions({
  resultText,
  title,
}: AdlibPlayResultsActionsProps) {
  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(resultText);
      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Failed to copy text");
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: title,
          text: resultText,
        });
      } else {
        throw new Error("Share not supported");
      }
    } catch {
      toast.error("Failed to share");
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              onClick={handleCopyText}
              className="flex gap-2"
            >
              <Copy className="h-4 w-4" />
              Copy Story
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Copy story to clipboard</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              onClick={handleShare}
              className="flex gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share Story
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share story with others</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
