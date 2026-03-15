"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoginPanel from "./loginPanel";
import RegisterPanel from "./registerPanel";
import IllustrationArea from "./illustrationarea";

type Mode = "login" | "register";
const DUR = 0.7;
const EASE: [number, number, number, number] = [0.77, 0, 0.175, 1];

// Desktop SVG paths
const CLIP_L =
  "M0,0 L500,0 C500,120 560,280 560,400 C560,520 500,680 500,800 L0,800 Z";
const CLIP_R =
  "M1000,0 L500,0 C500,120 440,280 440,400 C440,520 500,680 500,800 L1000,800 Z";
const STR_L = "M500,0 C500,120 560,280 560,400 C560,520 500,680 500,800";
const STR_R = "M500,0 C500,120 440,280 440,400 C440,520 500,680 500,800";

// Mobile/tablet SVG paths (horizontal — yuxarı/aşağı split)
// Login:    şəkil yuxarı, əyri aşağıda qabarıq
// Register: form yuxarı, əyri yuxarıda qabarıq
const CLIP_T =
  "M0,0 L0,420 C200,420 400,480 500,480 C600,480 800,420 1000,420 L1000,0 Z";
const CLIP_B =
  "M0,800 L0,380 C200,380 400,320 500,320 C600,320 800,380 1000,380 L1000,800 Z";
const STR_T = "M0,420 C200,420 400,480 500,480 C600,480 800,420 1000,420";
const STR_B = "M0,380 C200,380 400,320 500,320 C600,320 800,380 1000,380";

export default function AuthClient() {
  const [mode, setMode] = useState<Mode>("login");
  const [displayMode, setDisplayMode] = useState<Mode>("login");
  const [animating, setAnimating] = useState(false);

  const isLogin = mode === "login";

  function go(next: Mode) {
    if (next === mode || animating) return;
    setAnimating(true);
    setTimeout(() => setDisplayMode(next), Math.round(DUR * 1000 * 0.85));
    setTimeout(() => {
      setMode(next);
      setAnimating(false);
    }, DUR * 1000);
  }

  const formContent = (
    <AnimatePresence mode="wait">
      {displayMode === "login" ? (
        <motion.div
          key="lp"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <LoginPanel onSwitch={() => go("register")} />
        </motion.div>
      ) : (
        <motion.div
          key="rp"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <RegisterPanel onSwitch={() => go("login")} />
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#0B3E35]">
      {/* ══════════════════════════════════
          DESKTOP ≥1024px
          Horizontal split, SVG əyri, animasiya
      ══════════════════════════════════ */}
      <div className="hidden lg:block w-full h-full">
        {/* z:1 — Form */}
        <div
          className="absolute top-0 bottom-0 bg-[#0B3E35] flex items-center overflow-y-auto"
          style={{ left: isLogin ? "56%" : "0%", width: "44%", zIndex: 1 }}
        >
          <div className="w-full px-[clamp(24px,3.5vw,52px)] py-[clamp(24px,4vw,48px)]">
            {formContent}
          </div>
        </div>

        {/* z:2 — SVG ağ fill */}
        <svg
          className="absolute inset-0"
          style={{
            width: "100%",
            height: "100%",
            zIndex: 2,
            pointerEvents: "none",
          }}
          viewBox="0 0 1000 800"
          preserveAspectRatio="none"
        >
          <defs>
            <clipPath id="wclip-d" clipPathUnits="userSpaceOnUse">
              <motion.path
                initial={false}
                animate={{ d: isLogin ? CLIP_L : CLIP_R }}
                transition={{ duration: DUR, ease: EASE }}
              />
            </clipPath>
          </defs>
          <rect
            x="0"
            y="0"
            width="1000"
            height="800"
            fill="white"
            clipPath="url(#wclip-d)"
          />
        </svg>

        {/* z:3 — Illustration */}
        <motion.div
          className="absolute top-0 bottom-0 flex items-center justify-center"
          style={{ width: "50%", zIndex: 3 }}
          animate={{ left: isLogin ? "0%" : "50%" }}
          transition={{ duration: DUR, ease: EASE }}
        >
          <IllustrationArea />
        </motion.div>

        {/* z:4 — Stroke */}
        <svg
          className="absolute inset-0"
          style={{
            width: "100%",
            height: "100%",
            zIndex: 4,
            pointerEvents: "none",
          }}
          viewBox="0 0 1000 800"
          preserveAspectRatio="none"
        >
          <motion.path
            fill="none"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="4"
            strokeLinecap="round"
            initial={false}
            animate={{ d: isLogin ? STR_L : STR_R }}
            transition={{ duration: DUR, ease: EASE }}
          />
        </svg>
      </div>

      {/* ══ MOBILE + TABLET <1024px — şəkil yoxdur, form tam ekran ══ */}
      <div className="lg:hidden w-full h-full bg-[#0B3E35] flex items-center overflow-y-auto">
        <div className="w-full px-6 py-8 max-w-[480px] mx-auto">
          {formContent}
        </div>
      </div>
    </div>
  );
}
