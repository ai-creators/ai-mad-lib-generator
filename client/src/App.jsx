import { useState } from "react";
import Layout from "./Layout/Layout";
import PageRoutes from "./pages/pageRoutes";
import ButtonGenerateRandomLib from "./Components/Button/ButtonGenerateRandomLib/ButtonGenerateRandomLib"; // The component is imported here

function App() {
  console.log("RE RENDER");
  return <PageRoutes />;
}

export default App;
