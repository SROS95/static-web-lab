(function () {
  const key = "preferred_lang";
  const dismissedKey = "lang_hint_dismissed";

  // Si ya eligió idioma o cerró el aviso, no molestamos.
  if (localStorage.getItem(key) || localStorage.getItem(dismissedKey)) return;

  // Solo en la home ES (raíz)
  if (location.pathname !== "/") return;

  const langs = (navigator.languages && navigator.languages.length)
    ? navigator.languages
    : [navigator.language || ""];

  const prefersEN = langs.some(l => String(l).toLowerCase().startsWith("en"));
  if (!prefersEN) return;

  const hint = document.getElementById("langhint");
  const closeBtn = document.getElementById("closeHint");
  const goEN = document.getElementById("goEN");

  if (!hint || !closeBtn || !goEN) return;

  hint.hidden = false;

  closeBtn.addEventListener("click", () => {
    localStorage.setItem(dismissedKey, "1");
    hint.hidden = true;
  });

  goEN.addEventListener("click", () => {
    localStorage.setItem(key, "en");
  });
})();