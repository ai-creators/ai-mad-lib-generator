import React, { useEffect, useState } from "react";
import ButtonOutline from "../Button/ButtonOutline/ButtonOutline";
import { MadLibApi } from "../../api/madLibApi";
import { storage } from "../../utils/Storage";
const MadLibReactions = ({ lib }) => {
  const { text, prompt } = lib;
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const likeLib = async () => {
    setIsLiked((c) => !c);
    const api = new MadLibApi();
    const response = await api.likeLib();
  };
  const saveLib = async () => {
    setIsSaved((c) => !c);
    if (isSaved) {
      const saves = JSON.parse(storage.local.get("saves")) || [];
      if (Array.isArray(saves)) {
        const deletedSaves = saves.filter(
          (save) => save.prompt !== prompt && save.text !== text
        );
        storage.local.set("saves", JSON.stringify(deletedSaves));
      }
    } else {
      const saves = JSON.parse(storage.local.get("saves")) || [];
      saves.push(lib);
      storage.local.set("saves", JSON.stringify(saves));
    }
  };
  const dislikeLib = async () => {
    const api = new MadLibApi();
    const response = await api.dislikeLib();
  };

  useEffect(() => {
    const savedLibs = JSON.parse(storage.local.get("saves")) || [];
    if (Array.isArray(savedLibs)) {
      const foundLib = savedLibs.find(
        (el) => el.prompt === prompt && el.text === text
      );
      if (foundLib) {
        setIsSaved(true);
      }
    }
  }, []);

  return (
    <div className="flex gap-2">
      {/* <button
        onClick={likeLib}
        className={`py-2 px-3 border rounded hover:brightness-80 ease-out duration-300 outline-offset-4 ${
          isLiked && "text-white bg-gray-900 border-gray-900"
        }`}
      >
        Like ad-lib <i className="fa-regular fa-thumbs-up ml-1"></i>
      </button>
      <button
        onClick={dislikeLib}
        className={`py-2 px-3 border rounded hover:brightness-80 ease-out duration-300 outline-offset-4 ${
          isDisliked && "text-white bg-gray-900 border-gray-900"
        }`}
      >
        Dislike ad-lib <i className="fa-regular fa-thumbs-down ml-1"></i>
      </button> */}
      <button
        onClick={saveLib}
        className={`py-2 px-3 border rounded hover:brightness-80 ease-out duration-300 outline-offset-4 ${
          isSaved && "text-white bg-gray-900 border-gray-900"
        }`}
      >
        {isSaved ? "Saved" : "Save"} ad-lib{" "}
        <i className="fa-regular fa-heart ml-1"></i>
      </button>
    </div>
  );
};

export default MadLibReactions;
