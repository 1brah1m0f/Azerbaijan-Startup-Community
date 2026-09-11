/** Smooth-scrolls to an element id, clearing the fixed header. */
export function scrollToId(id: string) {
  const target = document.getElementById(id.replace(/^#/, ""));
  if (!target) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  target.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "start",
  });

  // Keep the hash in sync without the browser's instant jump.
  if (history.replaceState) {
    history.replaceState(null, "", `#${id.replace(/^#/, "")}`);
  }
}

/** Click handler for in-page anchors. */
export function anchorClick(id: string) {
  return (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToId(id);
  };
}
