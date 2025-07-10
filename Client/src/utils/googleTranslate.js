export function openTranslateModal() {
  const modal = document.getElementById("google_translate_modal");
  const translateWidget = document.getElementById("google_translate_element");

  if (!modal || !translateWidget) return;
  modal.innerHTML = "";
  const heading = document.createElement("h3");
  heading.textContent = "Select Language";
  heading.style.marginBottom = "10px";
  modal.appendChild(heading);
  modal.appendChild(translateWidget);

  translateWidget.style.display = "block";
  modal.style.display = "block";
}

export function setupOutsideClickClose() {
  const handler = (e) => {
    const modal = document.getElementById("google_translate_modal");
    if (
      modal &&
      !modal.contains(e.target) &&
      !e.target.closest("#language-button")
    ) {
      modal.style.display = "none";
    }
  };

  document.addEventListener("click", handler);
  return () => document.removeEventListener("click", handler);
}
