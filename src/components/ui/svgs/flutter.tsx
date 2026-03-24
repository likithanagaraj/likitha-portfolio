import type { SVGProps } from "react";

const Flutter = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 256 256" {...props}>
    <path fill="#47C5FB" d="M156 0L28 128l64 64 128-128z" />
    <path fill="#00569E" d="M92 192l36 36 128-128-36-36z" />
  </svg>
);

export { Flutter };