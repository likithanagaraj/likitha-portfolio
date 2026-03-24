"use client";

import acmeLogo from "@/../public/assets/logo-acme.png";
import apexLogo from "@/../public/assets/logo-apex.png";
import celestialLogo from "@/../public/assets/logo-celestial.png";
import echoLogo from "@/../public/assets/logo-echo.png";
import quantechLogo from "@/../public/logo-quantech-origin.png";
import wooddecor from "@/../public/logo-wood-decor.png";
import satgroupsLogo from "@/../public/satgroupsLogo.png";
import Image from "next/image";

export default function CompaniesCarousal() {
  const logos = [
    { src: quantechLogo, alt: "Quantech Logo" },
    { src: wooddecor, alt: "Wood Decor Logo" },
    { src: satgroupsLogo, alt: "SAT Groups Logo" },
  ];

  // Triplicate for seamless infinite scroll
  const allLogos = [...logos, ...logos, ...logos];

  return (
      <section className="py-20 md:py-24 max-w-2xl mx-auto">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center gap-5">
          <div className="md:flex md:flex-none hidden">
            <h2 className="text-balance">Trusted by top innovative teams</h2>
          </div>
          <div className="flex-1 min-w-0 overflow-hidden w-full">
            <div
              className="overflow-hidden w-full"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
              }}
            >
              <div
                className="flex gap-12 w-max"
                style={{
                  animation: "marquee 18s linear infinite",
                }}
              >
                {allLogos.map((logo, index) => (
                  <Image
                    key={index}
                    src={logo.src}
                    alt={logo.alt}
                    className="h-6 w-auto grayscale"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </section>
  );
}





