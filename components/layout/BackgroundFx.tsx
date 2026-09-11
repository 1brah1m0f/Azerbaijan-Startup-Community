"use client";

import { useRef } from "react";
import {
  useOrbParallax,
  useReveal,
  useScrollProgress,
  useTilt,
} from "@/hooks/useMotion";

/**
 * The page's ambient layer: the gradient scroll-progress bar, the blurred
 * background orbs, and the observers that drive the reveal and tilt effects.
 */
export function BackgroundFx() {
  const progressRef = useRef<HTMLDivElement>(null);

  useScrollProgress(progressRef);
  useOrbParallax();
  useReveal();
  useTilt();

  return (
    <>
      <div
        ref={progressRef}
        className="fixed top-0 left-0 h-1 z-[60] bg-gradient-to-r from-brand-teal via-brand-cyan to-brand-violet"
        style={{ width: "0%" }}
        aria-hidden="true"
      />

      <div
        className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div className="orb top-[-10%] left-[-10%] w-96 h-96 bg-brand-cyan/30 animate-blob" />
        <div className="orb top-[20%] right-[-12%] w-[30rem] h-[30rem] bg-brand-teal/25 animate-blob-slow" />
        <div className="orb bottom-[-15%] left-[15%] w-[42rem] h-[42rem] bg-brand-blue/15 animate-blob" />
        <div className="orb top-[45%] left-[40%] w-72 h-72 bg-brand-violet/15 animate-blob-slow" />
      </div>
    </>
  );
}
