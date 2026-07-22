"use client";

import quantechLogo from "@/../public/logo-quantech-origin.png";
import wooddecor from "@/../public/logo-wood-decor.png";
import satgroupsLogo from "@/../public/satgroupsLogo.png";
import unlockpiLogo from "@/../public/unlockpi.png";
import Image, { type StaticImageData } from "next/image";

type Company = {
  src: StaticImageData;
  alt: string;
  /**
   * Show the name alongside the logo. Use this for marks (like app icons)
   * that don't read well on their own in the strip.
   */
  name?: string;
};

const companies: Company[] = [
  { src: quantechLogo, alt: "Quantech" },
  { src: wooddecor, alt: "Wood Decor" },
  { src: satgroupsLogo, alt: "SAT Groups" },
  { src: unlockpiLogo, alt: "Unlock PI", name: "Unlock PI" },
];

function CompanyBadge({ company }: { company: Company }) {
  return (
    <div className="flex items-center gap-2 shrink-0">
      <Image
        src={company.src}
        alt={company.alt}
        className={
          company.name
            ? // Icon-style logo: keep its own colours (they read fine in both themes).
              "h-6 w-6 rounded object-contain"
            : // Wordmark: greyscale, and invert in dark mode so it stays visible.
              "h-6 w-auto object-contain grayscale opacity-70 dark:opacity-90 dark:invert"
        }
      />
      {company.name && (
        <span className="whitespace-nowrap text-sm font-medium text-muted-foreground">
          {company.name}
        </span>
      )}
    </div>
  );
}

export default function CompaniesCarousal() {
  // Enough identical groups that the strip always overflows the viewport,
  // keeping the loop seamless.
  const groups = [0, 1, 2, 3];

  return (
    <section className="py-20 md:py-24 max-w-2xl mx-auto">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center gap-5">
          <div className="md:flex md:flex-none hidden">
            <h2 className="text-balance">Trusted by top innovative teams</h2>
          </div>
          <div
            className="flex-1 min-w-0 w-full overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
            }}
          >
            <div className="flex w-max gap-12">
              {groups.map((g) => (
                <div
                  key={g}
                  className="flex shrink-0 items-center gap-12"
                  style={{ animation: "marquee-x 28s linear infinite" }}
                  aria-hidden={g > 0}
                >
                  {companies.map((company, i) => (
                    <CompanyBadge key={i} company={company} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
