/* eslint-disable @next/next/no-img-element */
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import HackathonsSection from "@/components/section/hackathons-section";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";
import { ArrowUpRight } from "lucide-react";
import CompaniesCarousal from "@/components/section/companies-carousal";
import type { Metadata } from "next";
import DeviceParallax from "@/components/device-parallax";

const BLUR_FADE_DELAY = 0.04;
export const metadata: Metadata = {
  title: "Likitha N | Product Designer & Builder",
  description:
    "I design and build user-focused apps that feel good to use. Sharing my journey through Appykit.",
};

export default function Page() {
  return (
    <main className="min-h-dvh flex flex-col gap-14 relative overflow-x-hidden">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 gap-y-6 flex flex-col md:flex-row justify-between">
            <div className="gap-2 flex flex-col order-2 md:order-1">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl"
                yOffset={8}
                text={`Hi, I'm ${DATA.name.split(" ")[0]}`}
              />
              <BlurFade
                delay={0.25}
                inView
                className="flex flex-col items-start! "
              >
                <h2 className="text-muted-foreground mb-4 md:mb-10 max-w-[600px] md:text-lg">
                  {DATA.description}{" "}
                </h2>
                <DeviceParallax loop className="max-w-16 h-10 inline-block " />
              </BlurFade>
              {/* <div className="flex items-center gap-2">
                <BlurFadeText
                  className="text-muted-foreground max-w-[600px] md:text-lg "
                  delay={BLUR_FADE_DELAY}
                  text={DATA.description}
                />
                <DeviceParallax loop className="max-w-10 h-8" />
              </div> */}
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2">
              <Avatar className="size-24 md:size-32 mt-1 mr-1 border rounded-full shadow-lg ring-4 ring-muted">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="flex min-h-0 flex-col gap-y-4 ">
          <BlurFade
            delay={BLUR_FADE_DELAY * 3}
            className="flex items-center justify-normal gap-2"
          >
            <h2 className="text-xl font-bold">About</h2>
            {/* <div className="inline-flex">
              <DeviceParallax loop className="max-w-16 h-10 " />
            </div> */}
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
              <p>
                I design and build user-focused apps that feel good to use, not
                just functional. I work across design and development, creating
                products end-to-end. I’ve worked with clients like{" "}
                <MentionLink
                  label="SAT Group"
                  src="/satgroups.png"
                  fallback="S"
                />{" "}
                and{" "}
                <MentionLink
                  label="Unlock PI"
                  src="/unlockpi.png"
                  fallback="U"
                />
                , and I’m building{" "}
                <MentionLink
                  label="Appykit"
                  src="/appykitUI.png"
                  fallback="A"
                />
                , where I share my journey through real projects and resources.
                I also document my learnings on{" "}
                <MentionLink
                  label="YouTube"
                  src="/Youtube_logo.png"
                  fallback="YT"
                  target="_blank"
                  href="https://www.youtube.com/@likithabuilds"
                />
                , focused on app design
                and development.
              </p>
              {/* <Markdown>{DATA.summary}</Markdown> */}
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <WorkSection />
          </BlurFade>
        </div>
      </section>

      <section id="skills" className="flex min-h-0 flex-col gap-y-4 md:mt-2 mt-10">
        <BlurFade delay={BLUR_FADE_DELAY * 9}>
          <h2 className="text-xl font-bold">Skills</h2>
        </BlurFade>
        <div className="flex flex-wrap gap-2">
          {DATA.skills.map((skill, id) => (
            <BlurFade key={skill.name} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
              <div className="border bg-background border-border ring-2 ring-border/20 rounded-xl h-8 w-fit px-4 flex items-center gap-2">
                {skill.icon && (
                  <skill.icon className="size-4 rounded overflow-hidden object-contain" />
                )}
                <span className="text-foreground text-sm font-medium">
                  {skill.name}
                </span>
              </div>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          <div className="flex flex-col gap-8">
            {DATA.education.map((education, index) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 8 + index * 0.05}
              >
                <Link
                  href={education.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-x-3 justify-between group"
                >
                  <div className="flex items-center gap-x-3 flex-1 min-w-0">
                    {education.logoUrl ? (
                      <img
                        src={education.logoUrl}
                        alt={education.school}
                        className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none"
                      />
                    ) : (
                      <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none" />
                    )}
                    <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                      <div className="font-semibold leading-none flex items-center gap-2">
                        {education.school}
                        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" aria-hidden />
                      </div>
                      <div className="font-sans text-sm text-muted-foreground">
                        {education.degree}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                    <span>
                      {education.start} - {education.end}
                    </span>
                  </div>
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      </section> */}

      <BlurFade delay={BLUR_FADE_DELAY * 11}>
        <ProjectsSection />
      </BlurFade>

      {/* <section id="hackathons">
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <HackathonsSection />
        </BlurFade>
      </section> */}
      <section id="contact" className="mt-10">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection />
        </BlurFade>
      </section>
      <CompaniesCarousal />
    </main>
  );
}
function MentionLink({
  label,
  src,
  fallback,
  href = "#projects",
  target,
}: {
  label: string;
  src: string;
  fallback: string;
  href?: string;
  target?: string;
}) {
  // External links open in a new tab; internal "#" links smooth-scroll on the page.
  const external = target === "_blank" || /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group not-prose inline-flex items-center gap-1 align-middle font-semibold text-foreground no-underline"
    >
      <Avatar className="size-5 ml-1 border  ring-1 ring-border/50">
        <AvatarImage alt={label} className={"rounded-lg"} src={src} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
      <span className="bg-[image:linear-gradient(currentColor,currentColor)] bg-[length:0%_1.5px] bg-[position:0_100%] bg-no-repeat transition-[background-size] duration-300 ease-out group-hover:bg-[length:100%_1.5px]">
        {label}
      </span>
    </a>
  );
}
