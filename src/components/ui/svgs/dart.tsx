import type { SVGProps } from "react";

const Dart = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 256 256" {...props}>
    <path fill="#00B4AB" d="M128 0L0 128l48 128 208-48z" />
    <path fill="#008080" d="M128 0v128L0 128z" />
    <path fill="#005F5F" d="M48 256l80-128 128-48z" />
  </svg>
);

export { Dart };