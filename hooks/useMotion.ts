"use client";

import { useEffect } from "react";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Adds `.active` to every `.reveal` element once it scrolls into view,
 * triggering the section entrance transitions.
 */
export function useReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (elements.length === 0) return;

    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("active"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -100px 0px", threshold: 0 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

/** Drives the gradient progress bar pinned to the top of the viewport. */
export function useScrollProgress(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const update = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      if (ref.current) ref.current.style.width = `${progress}%`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ref]);
}

/** Parallax for the blurred background orbs, following the pointer. */
export function useOrbParallax() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const onMove = (event: MouseEvent) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      document.querySelectorAll<HTMLElement>(".orb").forEach((orb, index) => {
        const depth = (index + 1) * 12;
        orb.style.marginLeft = `${x * depth}px`;
        orb.style.marginTop = `${y * depth}px`;
      });
    };

    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, []);
}

/** 3D tilt on `.tilt-card` elements, following the pointer. */
export function useTilt() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const cards = Array.from(document.querySelectorAll<HTMLElement>(".tilt-card"));
    const cleanups: Array<() => void> = [];

    cards.forEach((card) => {
      const onMove = (event: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(1000px) rotateY(${x * 12}deg) rotateX(${-(y * 12)}deg) translateY(-8px)`;
      };
      const onLeave = () => {
        card.style.transform =
          "perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)";
      };

      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
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
