import { LanguagesIcon } from "lucide-react";
import { useEffect } from "react";

export default function LanguageModalSidebar() {
  const openTranslateModal = () => {
    const modal = document.getElementById("google_translate_modal");
    const translateWidget = document.getElementById("google_translate_element");

    if (modal && translateWidget) {
      // Re-insert the translate widget into the modal every time
      modal.innerHTML = `
        <h3 style="margin-bottom: 10px;">Select Language</h3>
      `;
      modal.appendChild(translateWidget);
      translateWidget.style.display = "block";

      // Show modal
      modal.style.display = "block";
    }
  };

  const closeOnOutsideClick = (e) => {
    const modal = document.getElementById("google_translate_modal");
    if (
      modal &&
      !modal.contains(e.target) &&
      e.target.innerText !== "Language"

    ) {
      modal.style.display = "none";
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeOnOutsideClick);
    return () => document.removeEventListener("click", closeOnOutsideClick);
  }, []);

  return (
    <button
      onClick={openTranslateModal}
      className="w-full flex items-center gap-2 px-4 py-2 text-left rounded text-black transition duration-300 cursor-pointer"
    >
      <LanguagesIcon /> Language
    </button>
  );
}
