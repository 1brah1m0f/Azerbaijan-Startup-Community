"use client";

import { useEffect } from "react";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Runs `fn` at most once per frame, however often it is called. */
function throttleToFrame(fn: () => void) {
  let queued = false;
  return () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      fn();
    });
  };
}

const STAGGER_MS = 70;
/** Past a handful of items the ripple stops reading as one movement. */
const MAX_STAGGER_STEPS = 5;

/**
 * How far behind its neighbours an item should start.
 *
 * Counted from its position among the revealing elements beside it, so a row
 * of four cards and a grid of thirteen both ripple correctly without anything
 * in the markup saying so.
 */
function staggerFor(element: HTMLElement): number {
  const parent = element.parentElement;
  if (!parent) return 0;

  let index = 0;
  for (const child of Array.from(parent.children)) {
    if (child === element) break;
    if (child.classList.contains("reveal")) index += 1;
  }

  return Math.min(index, MAX_STAGGER_STEPS) * STAGGER_MS;
}

/**
 * Reveals elements as they scroll into view.
 *
 * Watches the document for new `.reveal` elements rather than only the ones
 * present at mount. Sections that render their contents from state — the
 * startup grid redrawing when a filter chip is pressed — hand back brand new
 * DOM nodes, and those nodes start invisible. Before this watched for them,
 * filtering and then clearing the filter left permanent blank gaps.
 */
export function useReveal() {
  useEffect(() => {
    const show = (element: HTMLElement) => element.classList.add("active");

    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      const showAll = () =>
        document
          .querySelectorAll<HTMLElement>(".reveal:not(.active)")
          .forEach(show);

      showAll();
      const mutations = new MutationObserver(throttleToFrame(showAll));
      mutations.observe(document.body, { childList: true, subtree: true });
      return () => mutations.disconnect();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          element.style.transitionDelay = `${staggerFor(element)}ms`;
          show(element);
          observer.unobserve(element);
        });
      },
      // Held back slightly, so an element animates as it clears the fold
      // rather than the instant its first pixel appears.
      { rootMargin: "0px 0px -12% 0px", threshold: 0 },
    );

    const watched = new WeakSet<Element>();

    const observeNew = () => {
      document.querySelectorAll<HTMLElement>(".reveal").forEach((element) => {
        if (watched.has(element) || element.classList.contains("active")) {
          return;
        }
        watched.add(element);
        observer.observe(element);
      });
    };

    observeNew();
    const mutations = new MutationObserver(throttleToFrame(observeNew));
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);
}

/** Drives the gradient progress bar pinned to the top of the viewport. */
export function useScrollProgress(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const update = throttleToFrame(() => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      if (ref.current) ref.current.style.width = `${progress}%`;
    });

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ref]);
}

/**
 * Parallax for the blurred background orbs.
 *
 * They drift with the pointer and, more noticeably, with the scroll position,
 * which keeps the backdrop from feeling like a flat sheet behind the page.
 */
export function useOrbParallax() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    let pointerX = 0;
    let pointerY = 0;

    // Offsets go on the margins, not on `transform`. The orbs run the `blob`
    // keyframes, and a running animation overrides an inline transform, so a
    // transform here would simply be ignored.
    const apply = throttleToFrame(() => {
      const drift = window.scrollY * 0.04;
      document.querySelectorAll<HTMLElement>(".orb").forEach((orb, index) => {
        const depth = (index + 1) * 12;
        const direction = index % 2 === 0 ? 1 : -1;
        orb.style.marginLeft = `${pointerX * depth}px`;
        orb.style.marginTop = `${pointerY * depth + drift * direction}px`;
      });
    });

    const onMove = (event: MouseEvent) => {
      pointerX = event.clientX / window.innerWidth - 0.5;
      pointerY = event.clientY / window.innerHeight - 0.5;
      apply();
    };

    apply();
    document.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", apply, { passive: true });
    return () => {
      document.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", apply);
    };
  }, []);
}

/**
 * Tilts a card towards the pointer.
 *
 * One delegated listener rather than a pair per card, so cards rendered after
 * this runs still tilt, and nothing has to be rebound when a list redraws.
 */
export function useTilt() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    // Pointer tilt means nothing on a touch screen, and firing it on tap is
    // worse than not having it.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    /** Gentler than a full 3D flourish; the card should tip, not swivel. */
    const MAX_TILT = 7;
    let active: HTMLElement | null = null;

    const reset = (card: HTMLElement) => {
      card.style.transform = "";
    };

    const onMove = (event: MouseEvent) => {
      const card = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        ".tilt-card",
      );

      if (card !== active && active) {
        reset(active);
        active = null;
      }
      if (!card) return;
      active = card;

      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      card.style.transform = `perspective(1000px) rotateY(${x * MAX_TILT}deg) rotateX(${
        -(y * MAX_TILT)
      }deg) translate3d(0, -6px, 0)`;
    };

    const onLeave = () => {
      if (active) reset(active);
      active = null;
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
      if (active) reset(active);
    };
  }, []);
}

/** Spawns the drifting particles behind the hero. Client-only by design. */
export function useParticles(
  ref: React.RefObject<HTMLDivElement | null>,
  count = 18,
) {
  useEffect(() => {
    const host = ref.current;
    if (!host || prefersReducedMotion()) return;

    const nodes: HTMLSpanElement[] = [];
    for (let i = 0; i < count; i += 1) {
      const particle = document.createElement("span");
      particle.className = "particle";
      const size = Math.random() * 8 + 4;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${Math.random() * 12 + 10}s`;
      particle.style.animationDelay = `${Math.random() * 12}s`;
      host.appendChild(particle);
      nodes.push(particle);
    }

    return () => nodes.forEach((node) => node.remove());
  }, [ref, count]);
}

/**
 * Eases the hero out of the way as the page scrolls.
 *
 * A small lift and fade, finished well before the hero leaves the screen, so
 * the first section arrives over it rather than after it.
 */
export function useHeroParallax(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const host = ref.current;
    if (!host || prefersReducedMotion()) return;

    const update = throttleToFrame(() => {
      const travel = Math.min(window.scrollY, window.innerHeight);
      const ratio = travel / window.innerHeight;
      host.style.transform = `translate3d(0, ${travel * 0.18}px, 0)`;
      host.style.opacity = String(Math.max(0, 1 - ratio * 1.15));
    });

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      host.style.transform = "";
      host.style.opacity = "";
    };
  }, [ref]);
}

/**
 * Reports whether the page has scrolled past `offset`, for the header.
 * Returns nothing; it toggles a class on the element instead.
 */
export function useScrolledPast(
  ref: React.RefObject<HTMLElement | null>,
  offset = 24,
) {
  useEffect(() => {
    const host = ref.current;
    if (!host) return;

    const update = throttleToFrame(() => {
      host.dataset.scrolled = window.scrollY > offset ? "true" : "false";
    });

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [ref, offset]);
}

/**
 * Expanding ring on click, matching the reference site's logo interaction.
 * Attach to a container; any `.brand-link` inside it responds.
 */
export function useBrandRipple(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const host = ref.current;
    if (!host || prefersReducedMotion()) return;

    const onClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        ".brand-link",
      );
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const ring = document.createElement("span");
      ring.className = "brand-ring";
      ring.style.width = "34px";
      ring.style.height = "34px";
      ring.style.left = `${event.clientX - rect.left - 17}px`;
      ring.style.top = `${event.clientY - rect.top - 17}px`;
      target.appendChild(ring);
      window.setTimeout(() => ring.remove(), 600);
    };

    host.addEventListener("click", onClick);
    return () => host.removeEventListener("click", onClick);
  }, [ref]);
}
