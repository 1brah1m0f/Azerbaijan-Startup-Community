/**
 * Runs before first paint so the saved (or system) theme is applied without a
 * light-mode flash. Keep this a plain IIFE string — it is inlined into <head>.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");var d=t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;
