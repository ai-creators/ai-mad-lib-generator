import Container from "../../components/Container/Container";
import { removeAll } from "../../slices/savesSlice";
import {
  removeResponse,
  removeAllResponses,
} from "../../slices/responsesSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import SavesCard from "../../components/Saves/SavesCard/SavesCard";
import SavesResponses from "../../components/Saves/SavesResponses/SavesResponses";

const Saves = () => {
  const { saves } = useAppSelector((state) => state.saves);
  const { responses } = useAppSelector((state) => state.responses);
  const dispatch = useAppDispatch();
  const removeAllLibs = () => {
    dispatch(removeAll());
  };

  const removeAllAdLibResponses = () => {
    dispatch(removeAllResponses());
  };

  const removeAdLibResponse = ({ target }) => {
    const id = target.getAttribute("data-responseid");
    if (id) {
      dispatch(removeResponse({ _id: id }));
    }
  };

  return (
    <Container className="grid-aside py-12 gap-12">
      <SavesCard saves={saves} removeAllLibs={removeAllLibs} />
      <SavesResponses
        responses={responses}
        removeResponse={removeAdLibResponse}
        removeAllResponses={removeAllAdLibResponses}
      />
    </Container>
  );
};

export default Saves;
