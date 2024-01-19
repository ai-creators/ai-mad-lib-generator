import ButtonLight from "../../button/button-light/ButtonLight";
import Loader from "../../loader/Loader";
import { useAdlibReactions } from "./AdlibReactions.hooks";

type Props = {
  adlibId?: string;
};

const AdlibReactions = ({ adlibId }: Props) => {
  const { reactions, reactAdlib, userReactions, isLoading } =
    useAdlibReactions(adlibId);
  return (
    <ul>
      <li>
        <ButtonLight
          className="flex gap-2 items-center"
          hideUnerline
          onClick={reactAdlib}
        >
          {isLoading ? (
            <Loader size="w-4 h-4" border="border-2" />
          ) : (
            <i
              className={`fa-${
                userReactions.length ? "solid" : "regular"
              } fa-heart`}
            ></i>
          )}{" "}
          <span>{reactions.length ? reactions[0].count : 0} Likes</span>
        </ButtonLight>
      </li>
    </ul>
  );
};

export default AdlibReactions;
