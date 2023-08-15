import Container from "../../components/Container/Container";
import { removeAll } from "../../slices/savesSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import SavesCard from "../../components/Saves/SavesCard/SavesCard";

const Saves = () => {
  const { saves } = useAppSelector((state) => state.saves);
  const dispatch = useAppDispatch();
  const removeAllLibs = () => {
    dispatch(removeAll());
  };

  return (
    <Container className="grid-aside py-12 gap-12">
      <SavesCard saves={saves} removeAllLibs={removeAllLibs} />
    </Container>
  );
};

export default Saves;
