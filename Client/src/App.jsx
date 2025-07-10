import { useEffect } from "react";
import Routers from "./routes/Routers";
import "./index.css";
import { SnackbarProvider } from "notistack";
import { setupOutsideClickClose } from "./utils/googleTranslate";

function App() {

  useEffect(() => {
    if (window.googleTranslateElementInit) return;

    window.googleTranslateElementInit = () => {
      if (
        typeof window.google !== "undefined" &&
        typeof window.google.translate !== "undefined"
      ) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            layout: window.google.translate.TranslateElement.InlineLayout.VERTICAL,
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };

    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    const cleanup = setupOutsideClickClose();
    return cleanup;
  }, []);

  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      autoHideDuration={2000}
    >
      <Routers />

      {/* Hidden modal for language widget */}
      <div
        id="google_translate_modal"
        style={{
          position: "fixed",
          top: "100px",
          right: "20px",
          background: "#fff",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          display: "none",
          zIndex: 9999,
        }}
      />

      {/* Actual widget container (to be injected inside modal) */}
      <div id="google_translate_element" style={{ display: "none" }} />
    </SnackbarProvider>
  );
}

export default App;
