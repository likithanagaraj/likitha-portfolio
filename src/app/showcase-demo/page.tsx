"use client";

import DeviceParallax from "@/components/device-parallax";
import { useState } from "react";

export default function ShowcaseDemoPage() {
  const [key, setKey] = useState(0);

  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col items-center justify-center gap-10 px-6 py-24">
      <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
        DeviceParallax · tablet → phones → laptop · looping
      </p>

      <DeviceParallax  loop className="max-w-16 h-8" />

      <button
        onClick={() => setKey((k) => k + 1)}
        className="w-fit rounded-full border px-4 py-2 text-sm font-medium hover:bg-muted"
      >
        Replay
      </button>
    </main>
  );
}
