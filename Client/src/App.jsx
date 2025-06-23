import { ToastContainer } from "react-toastify"
import Routers from "./routes/Routers"
import "./index.css";
import { useContext } from "react";
import { ThemeContext } from "./context/ThemeProvider";

function App() {

  const { theme } = useContext(ThemeContext);


  return (
    <>
      <Routers />

      <ToastContainer position="top-right" autoClose={3000} theme={theme}  />
    </>
  )
}

export default App
