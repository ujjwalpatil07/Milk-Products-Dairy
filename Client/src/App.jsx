
import { useContext } from "react";
import Routers from "./routes/Routers"
import "./index.css";
import { SnackbarProvider } from 'notistack';
import { ThemeContext } from "./context/ThemeProvider";
import { ToastContainer } from "react-toastify";

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        autoHideDuration={2000}
      >
        <Routers />
      </SnackbarProvider>

      <ToastContainer position="bottom-right" autoClose={3000} theme={theme} />
    </>
  )
}

export default App
