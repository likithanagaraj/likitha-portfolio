"use client";

/**
 * DeviceParallax
 * ------------------------------------------------------------------
 * A black "stage" that devices rise up through, one scene after another:
 *
 *   tablet → (phone-left ↑, phone-right ↑ a beat later, parallax) → laptop → loop
 *
 * The stage clips the BOTTOM of each device (it sinks into the box) while
 * the TOP pops out above the box — so the devices read as real 3D objects
 * emerging from the surface. Mobile is the emphasised / default scene.
 *
 * Built on motion.dev (`motion/react`). Fully driven by props.
 *
 *   <DeviceParallax loop />
 */

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useState } from "react";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface DeviceLayer {
  src: string;
  alt?: string;
  /** Width as a % of the stage width. */
  width: number;
  /** Horizontal centre as a % of the stage width (50 = centred). */
  x?: number;
  /** Resting bottom offset as a % of the stage height. Negative sinks it further into the floor. */
  bottom?: number;
  /** Extra resting rotation in degrees. */
  rotate?: number;
  /** Entrance delay in seconds — this is what creates the phone-left / phone-right parallax. */
  delay?: number;
  /** Depth in z-index; higher sits in front. */
  z?: number;
  /** Float speed multiplier for the idle drift (1 = base). */
  floatSpeed?: number;
}

export interface DeviceScene {
  id: string;
  devices: DeviceLayer[];
  /** Per-scene hold override (ms). */
  hold?: number;
}

export interface DeviceParallaxProps {
  /** The scenes to cycle through. Defaults to tablet → phones → laptop. */
  scenes?: DeviceScene[];
  /** Loop forever. When false it stops on the last scene. Default: true. */
  loop?: boolean;
  /** Run automatically on mount. Default: true. */
  autoPlay?: boolean;
  /** Delay (ms) before the first device rises — i.e. "after the page loads". Default: 500. */
  startDelay?: number;
  /** How long (ms) each scene is held before the next rises. Default: 2200. */
  holdDuration?: number;
  /** Seconds for a device to rise into view. Default: 0.9. */
  riseDuration?: number;
  /** The scene shown statically for reduced-motion / non-autoplay. Defaults to the mobile scene. */
  defaultSceneId?: string;
  /** Stage background (the "black div"). Default: near-black. */
  background?: string;
  /** Stage corner radius. Default: "1.75rem". */
  radius?: string;
  /** Stage aspect ratio, e.g. "4 / 3". Default: "1 / 1". */
  aspectRatio?: string;
  /** Fires whenever a new scene becomes active. */
  onSceneChange?: (id: string, index: number) => void;
  /** Class for the stage wrapper (set width / max-width here). */
  className?: string;
}

/* ------------------------------------------------------------------ */
/* Default scenes (uses the PNGs in /public/device-parallax-animation) */
/* ------------------------------------------------------------------ */

const BASE = "/device-parallax-animation";

export const DEFAULT_SCENES: DeviceScene[] = [
  {
    id: "tablet",
    devices: [
      {
        src: `${BASE}/tablet-device-transperant.png`,
        alt: "Tablet dashboard",
        width: 104,
        bottom: -16,
        rotate: 0,
        floatSpeed: 1,
      },
    ],
  },
  {
    id: "mobile",
    devices: [
      {
        src: `${BASE}/mobile-left-transperant.png`,
        alt: "Mobile app",
        width: 42,
        x: 34,
        bottom: -12,
        rotate: -3,
        delay: 0,
        z: 1,
        floatSpeed: 1.15,
      },
      {
        src: `${BASE}/mobile-right-transperant.png`,
        alt: "Mobile app",
        width: 42,
        x: 66,
        bottom: -18,
        rotate: 3,
        delay: 0.14,
        z: 2,
        floatSpeed: 0.85,
      },
    ],
  },
  {
    id: "laptop",
    devices: [
      {
        src: `${BASE}/laptop-transperant.png`,
        alt: "Laptop landing page",
        width: 98,
        bottom: -6,
        rotate: 0,
        floatSpeed: 0.9,
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function DeviceParallax({
  scenes,
  loop = true,
  autoPlay = true,
  startDelay = 500,
  holdDuration = 2200,
  riseDuration = 0.9,
  defaultSceneId = "mobile",
  background = "#0a0a0f",
  radius = "0.5rem",
  aspectRatio = "1 / 1",
  onSceneChange,
  className,
}: DeviceParallaxProps) {
  const reduce = useReducedMotion();
  const list = scenes && scenes.length > 0 ? scenes : DEFAULT_SCENES;
  const isStatic = reduce || !autoPlay;

  const defaultIndex = Math.max(
    0,
    list.findIndex((s) => s.id === defaultSceneId),
  );

  // -1 = empty box (nothing risen yet).
  const [index, setIndex] = React.useState<number>(
    isStatic ? defaultIndex : -1,
  );

  const onChangeRef = React.useRef(onSceneChange);
  React.useEffect(() => {
    onChangeRef.current = onSceneChange;
  });
  React.useEffect(() => {
    if (index >= 0) onChangeRef.current?.(list[index]?.id, index);
  }, [index, list]);

  // Kick off the first scene once the page has settled.
  React.useEffect(() => {
    if (isStatic) return;
    const t = window.setTimeout(() => setIndex(0), startDelay);
    return () => window.clearTimeout(t);
  }, [isStatic, startDelay]);

  // Advance through the scenes.
  React.useEffect(() => {
    if (isStatic || index < 0) return;
    const isLast = index === list.length - 1;
    if (isLast && !loop) return;
    const hold = list[index]?.hold ?? holdDuration;
    const t = window.setTimeout(() => {
      setIndex((i) => (i + 1) % list.length);
    }, hold);
    return () => window.clearTimeout(t);
  }, [isStatic, index, list, loop, holdDuration]);

  const scene = index >= 0 ? list[index] : undefined;
  const [key, setKey] = useState(0);

  return (
    <div
      className={cn("relative w-full max-w-md", className)}
      style={{ aspectRatio }}
    >
      {/* The black box (backdrop). */}
      <div
        className={cn("absolute inset-0 overflow-hidden", "dark:bg-card bg-black/70")}
        style={{  borderRadius: radius }}
      >
        {/* soft top light + floor gradient for depth */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% -10%, rgba(255,255,255,0.10), transparent 60%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.55), transparent)",
          }}
        />
        {/* subtle rim */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            borderRadius: radius,
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        />
      </div>

      {/* Clip layer: clips the BOTTOM (at the box floor) but is tall enough
          above the box that device TOPS pop out over the page. */}
      <div
        className="absolute inset-x-0 bottom-0 overflow-hidden"
        style={{
          top: "-90%",
          borderBottomLeftRadius: radius,
          borderBottomRightRadius: radius,
        }}
      >
        {/* Anchor origin = the box floor. */}
        <div className="absolute inset-x-0" style={{ top: "90%", bottom: 0 }}>
          <AnimatePresence>
            {scene && (
              <React.Fragment key={scene.id}>
                {scene.devices.map((d, i) => (
                  <DeviceImage
                    key={`${scene.id}-${i}`}
                    device={d}
                    riseDuration={riseDuration}
                    isStatic={isStatic}
                  />
                ))}
              </React.Fragment>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* A single rising device                                              */
/* ------------------------------------------------------------------ */

function DeviceImage({
  device,
  riseDuration,
  isStatic,
}: {
  device: DeviceLayer;
  riseDuration: number;
  isStatic: boolean;
}) {
  const {
    src,
    alt = "",
    width,
    x = 50,
    bottom = 0,
    rotate = 0,
    delay = 0,
    z = 1,
    floatSpeed = 1,
  } = device;

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${x}%`,
        bottom: `${bottom}%`,
        width: `${width}%`,
        zIndex: z,
        x: "-50%",
        filter: "drop-shadow(0 30px 45px rgba(0,0,0,0.55))",
      }}
      initial={isStatic ? false : { y: "135%", opacity: 0, rotate }}
      animate={{ y: "0%", opacity: 1, rotate }}
      exit={{ y: "-16%", opacity: 0, rotate }}
      transition={{
        y: { duration: riseDuration, ease: [0.16, 1, 0.3, 1], delay },
        opacity: { duration: 0.4, ease: "easeOut", delay },
        rotate: { duration: riseDuration, ease: [0.16, 1, 0.3, 1], delay },
      }}
    >
      {/* Idle parallax float. */}
      <motion.div
        animate={isStatic ? undefined : { y: [0, -7, 0] }}
        transition={{
          duration: 6 / floatSpeed,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          draggable={false}
          className="block w-full select-none"
        />
      </motion.div>
    </motion.div>
  );
}
