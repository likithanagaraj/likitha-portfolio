import type { SVGProps } from "react";

const Figma = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 256 384" {...props}>
    <circle cx="128" cy="64" r="64" fill="#F24E1E" />
    <circle cx="128" cy="192" r="64" fill="#FF7262" />
    <circle cx="128" cy="320" r="64" fill="#A259FF" />
    <circle cx="64" cy="64" r="64" fill="#0ACF83" />
    <circle cx="64" cy="192" r="64" fill="#1ABCFE" />
  </svg>
);

export { Figma };