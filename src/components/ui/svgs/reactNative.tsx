import type { SVGProps } from "react";

const ReactNative = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 256 256" {...props}>
    <circle cx="128" cy="128" r="20" fill="#61DAFB" />
    <ellipse cx="128" cy="128" rx="100" ry="40" fill="none" stroke="#61DAFB" strokeWidth="10"/>
    <ellipse cx="128" cy="128" rx="100" ry="40" fill="none" stroke="#61DAFB" strokeWidth="10" transform="rotate(60 128 128)"/>
    <ellipse cx="128" cy="128" rx="100" ry="40" fill="none" stroke="#61DAFB" strokeWidth="10" transform="rotate(120 128 128)"/>
  </svg>
);

export { ReactNative };