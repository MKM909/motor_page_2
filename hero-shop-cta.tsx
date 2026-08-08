"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Standalone "Start shopping" pill CTA.
 * Extracted from Hero so it renders independently and never
 * participates in the AnimatePresence price/rating fade.
 *
 * ── Why the fill was leaving afterimages ──────────────────────────────
 * The old fill animated `transform: scale()` on a `rounded-full` div
 * inside an `overflow-hidden` parent. That specific combo is a known
 * Chrome rendering bug: it doesn't cleanly re-rasterize the antialiased
 * rounded edge every frame, so a faint trailing ghost gets left behind
 * as the scale changes — worse on mouse-out, when it reverses quickly.
 *
 * It also wasn't really "a circle" — `rounded-full` on a short, wide
 * pill just gives you a stadium shape, so scaling it enlarges a blob,
 * not a circle growing out from the icon.
 *
 * Fixed by swapping the scale animation for a `clip-path: circle()`
 * reveal anchored at the icon's own center. It's a real circle, it
 * grows from exactly where the icon sits, and clip-path transitions
 * don't hit the scale+border-radius repaint bug at all.
 */

const CIRCLE_X = "calc(100% - 22px)"; // icon's horizontal center: 6px padding + 16px (half of w-8)
const CIRCLE_REST_RADIUS = "16px";    // matches the icon circle exactly (w-8 h-8 → 16px radius)
const CIRCLE_HOVER_RADIUS = "150%";   // comfortably covers the pill regardless of its width

const MAGNET_FACTOR = 0.25; // fraction of the cursor's offset from center that gets applied
const MAGNET_MAX = 8;       // px — keeps the pull subtle rather than a big drag
const MAGNET_SPRING = { stiffness: 220, damping: 20, mass: 0.4 };

function clamp(value: number, max: number) {
  return Math.max(-max, Math.min(max, value));
}

export function HeroShopCTA() {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);

  // Raw values track the cursor directly; the springs smooth them out
  // so the pull eases rather than snapping to the pointer 1:1.
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, MAGNET_SPRING);
  const y = useSpring(rawY, MAGNET_SPRING);

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = linkRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    rawX.set(clamp(offsetX * MAGNET_FACTOR, MAGNET_MAX));
    rawY.set(clamp(offsetY * MAGNET_FACTOR, MAGNET_MAX));
  };

  const handleMouseLeave = () => {
    setHovered(false);
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div style={{ x, y }} className="w-fit">
      <Link
        ref={linkRef}
        href="/shop"
        onMouseEnter={() => setHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative flex items-center gap-3 bg-[#F2F0EA] text-[#010101] font-semibold text-xs sm:text-sm pl-5 sm:pl-6 pr-1.5 py-1.5 rounded-full shadow-2xl transition-all duration-300 active:scale-95 overflow-hidden shrink-0"
      >
        <span className="relative z-10 group-hover:text-white transition-colors duration-300">
          Start shopping
        </span>

        {/* Circular fill — a real circle grown via clip-path, anchored on the icon */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 bg-[#010101]"
          style={{
            clipPath: `circle(${hovered ? CIRCLE_HOVER_RADIUS : CIRCLE_REST_RADIUS} at ${CIRCLE_X} 50%)`,
            transition: "clip-path 550ms cubic-bezier(0.65, 0, 0.35, 1)",
            willChange: "clip-path",
          }}
        />

        <div className="relative z-10 w-8 h-8 rounded-full bg-[#010101] text-white flex items-center justify-center shrink-0">
          <svg
            className="w-4 h-4 group-hover:text-[#EDCF5D] transition-colors duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </div>
      </Link>
    </motion.div>
  );
}
