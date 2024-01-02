import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { ApiResponse } from "../../../models/ApiResponseModel";
import { BookmarkModel } from "../../../models/BookmarkModel";
import { PaginationResponse } from "../../../models/PaginationResponse";
import ReactionService from "../../../services/ReactionService";
import { FeedTypes } from "../../feed/FeedTypes";

export const useAdlibBookmarks = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { account } = useAppSelector((state) => state.account);

  const [feedType, setFeedType] = useState<FeedTypes>(FeedTypes.LATEST);

  const getBookmarks = async (
    page: number,
    size: number,
    timestamp: Date,
    abortController?: AbortController
  ): Promise<ApiResponse<PaginationResponse<BookmarkModel>>> => {
    if (!account?.id) {
      return { data: null, error: { message: "Account is required" } };
    }
    const accessToken = await getAccessTokenSilently();
    return ReactionService.getBookmarks(
      account?.id,
      feedType,
      page,
      size,
      timestamp,
      accessToken,
      abortController
    );
  };

  return { feedType, setFeedType, getBookmarks };
};
