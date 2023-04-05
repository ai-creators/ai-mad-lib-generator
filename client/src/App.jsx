import { useState } from "react";
import Layout from "./Layout/Layout";
import PageRoutes from "./pages/PageRoutes";
import ButtonGenerateRandomLib from "./Components/Button/ButtonGenerateRandomLib/ButtonGenerateRandomLib"; // The component is imported here

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ButtonGenerateRandomLib /> {/* The component is added here */}
      <PageRoutes />
    </>
  );
}

export default App;
