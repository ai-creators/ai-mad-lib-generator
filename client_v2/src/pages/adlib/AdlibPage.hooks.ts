import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import { ErrorModel } from "../../models/ErrorModel";
import { useQuery } from "@tanstack/react-query";
import AdlibService from "../../services/AdlibService";
import ReactionService from "../../services/ReactionService";
import storage from "../../utils/Storage";
import { BookmarkModel } from "../../models/BookmarkModel";
import { useAuth0 } from "@auth0/auth0-react";

export const useAdlibPage = () => {
  const { adlibId } = useParams();
  const { getAccessTokenSilently } = useAuth0();
  const { account } = useAppSelector((state) => state.account);

  const [hasBookmarked, setHasBookmarked] = useState<boolean>(false);
  const [error, setError] = useState<ErrorModel | null>(null);

  const fetchAdlib = async () => {
    if (!adlibId) {
      throw new Error("No adlib id has been provided");
    }
    const { data, error } = await AdlibService.findAdlibById(adlibId);
    if (error) {
      throw new Error(error.message);
    }
    if (data) {
      return data;
    }
  };

  const { data: adlib, isLoading } = useQuery({
    queryKey: ["adlib"],
    queryFn: fetchAdlib,
  });

  const bookmarkAdlib = async () => {
    if (adlib?.id && account?.id) {
      const accessToken = await getAccessTokenSilently();
      const { data, error: apiError } = await ReactionService.bookmarkAdlib(
        adlib.id,
        account.id,
        accessToken
      );
      if (data) {
        setHasBookmarked(data.hasBookmarked);
      }
      if (apiError) {
        setError(apiError);
      }
    }
  };

  const bookmarkAdlibLocally = () => {
    try {
      if (adlibId && adlib?.id) {
        const newBookmark: BookmarkModel = {
          accountId: account?.id || "",
          adlibId: adlibId,
          adlib,
          account: account,
          hasBookmarked: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const bookmarks: BookmarkModel[] = storage.get("bookmarks") || [];

        const foundBookmarkIndex = bookmarks.findIndex(
          (b) => b.adlib.id === adlib.id
        );
        if (foundBookmarkIndex >= 0) {
          bookmarks.splice(foundBookmarkIndex, 1);
        } else {
          bookmarks.push(newBookmark);
        }

        storage.set("bookmarks", bookmarks);
        isBookmarkedLocally(newBookmark);
      }
    } catch (error: unknown) {
      setError({ message: "Unable to save adlib." });
    }
  };

  const isBookmarkedLocally = (bookmark: BookmarkModel) => {
    const bookmarks: BookmarkModel[] = storage.get("bookmarks") || [];

    const foundBookmarkIndex = bookmarks.findIndex(
      (b) => b.adlib.id === bookmark.adlib.id
    );
    if (foundBookmarkIndex >= 0) {
      setHasBookmarked(true);
    } else {
      setHasBookmarked(false);
    }
  };

  const getBookmark = async () => {
    if (account?.id && adlibId) {
      const accessToken = await getAccessTokenSilently();
      const { data: bookmark, error: apiError } =
        await ReactionService.getBookmark(adlibId, account.id, accessToken);
      if (bookmark) {
        setHasBookmarked(bookmark.hasBookmarked);
      }
      if (apiError) {
        setError(apiError);
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (!account?.id && adlibId && adlib?.id) {
        // check locally
        const newBookmark: BookmarkModel = {
          accountId: account?.id || "",
          adlibId: adlibId,
          adlib,
          account: account,
          hasBookmarked: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        isBookmarkedLocally(newBookmark);
      } else {
        // get bookmark from account
        getBookmark();
      }
    })();
  }, [account, adlib, adlibId]);

  return {
    adlib,
    isLoading,
    hasBookmarked,
    error,
    bookmarkAdlib,
    bookmarkAdlibLocally,
    isBookmarkedLocally,
    adlibId,
  };
};
