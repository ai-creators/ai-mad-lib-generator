import { useLocation } from "react-router-dom";

const LibsPlay = () => {
  const { state } = useLocation();
  return <div>{JSON.stringify(state)}</div>;
};

export default LibsPlay;
