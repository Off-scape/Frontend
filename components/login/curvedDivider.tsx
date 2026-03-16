"use client";

import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.77, 0, 0.175, 1];
const DUR = 0.7;

const FILL_L =
  "M0,0 L500,0 C500,120 560,280 560,400 C560,520 500,680 500,800 L0,800 Z";
const FILL_R =
  "M1000,0 L500,0 C500,120 440,280 440,400 C440,520 500,680 500,800 L1000,800 Z";
const STROKE_L = "M500,0 C500,120 560,280 560,400 C560,520 500,680 500,800";
const STROKE_R = "M500,0 C500,120 440,280 440,400 C440,520 500,680 500,800";

export function CurvedFill({ isLogin }: { isLogin: boolean }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1000 800"
      preserveAspectRatio="none"
    >
      <motion.path
        fill="#ffffff"
        stroke="none"
        initial={false}
        animate={{ d: isLogin ? FILL_L : FILL_R }}
        transition={{ duration: DUR, ease: EASE }}
      />
    </svg>
  );
}

export function CurvedStroke({ isLogin }: { isLogin: boolean }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1000 800"
      preserveAspectRatio="none"
    >
      <motion.path
        fill="none"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="4"
        strokeLinecap="round"
        initial={false}
        animate={{ d: isLogin ? STROKE_L : STROKE_R }}
        transition={{ duration: DUR, ease: EASE }}
      />
    </svg>
  );
}

export default function CurvedDivider({ isLogin }: { isLogin: boolean }) {
  return (
    <>
      <CurvedFill isLogin={isLogin} />
      <CurvedStroke isLogin={isLogin} />
    </>
  );
}
