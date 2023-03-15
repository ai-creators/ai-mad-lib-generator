import { useState } from "react";
import Layout from "./Layout/Layout";
import PageRoutes from "./pages/PageRoutes";
function App() {
  const [count, setCount] = useState(0);

  return <PageRoutes />;
}

export default App;
