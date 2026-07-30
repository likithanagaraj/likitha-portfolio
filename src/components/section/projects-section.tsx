import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";
import {
  Card,
  CardDescription,
  CardFrame,
  CardFrameAction,
  CardFrameDescription,
  CardFrameHeader,
  CardFrameTitle,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
const BLUR_FADE_DELAY = 0.04;
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// These two are shown as the compact "lower" cards below, not as full project cards.
const COMPACT_PROJECT_TITLES = ["SAT Groups", "Unlock PI"];

export default function ProjectsSection() {
  const featuredProjects = DATA.projects.filter(
    (project) => !COMPACT_PROJECT_TITLES.includes(project.title),
  );
  const satHref =
    DATA.projects.find((p) => p.title === "SAT Groups")?.href || "#";
  const unlockHref =
    DATA.projects.find((p) => p.title === "Unlock PI")?.href || "#";

  return (
    <section id="projects">
      <div className="flex min-h-0 flex-col gap-y-8 mt-10">
        <div className="flex flex-col gap-y-4 items-center justify-center">
          <div className="flex items-center w-full">
            <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
            <div className="border bg-primary z-10 rounded-xl px-4 py-1">
              <span className="text-background text-sm font-medium">
                My Projects
              </span>
            </div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
          </div>
          <div className="flex flex-col gap-y-3 items-start justify-center">
            <h2 className="text-3xl font-bold text-left tracking-tighter sm:text-4xl">
              Check out my latest work
            </h2>
            {/* <p className="text-muted-foreground md:text-lg">
                            I&apos;ve worked on a variety of projects, from simple
                            websites to complex web applications. Here are a few of my
                            favorites.
                        </p> */}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto auto-rows-fr">
          {featuredProjects.map((project, id) => (
            <BlurFade
              key={project.title}
              delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              className="h-full"
            >
              <ProjectCard
                href={project.href}
                key={project.title}
                title={project.title}
                description={project.description}
                dates={project.dates}
                tags={project.technologies}
                caseStudy={project.caseStudy}
                image={project.image}
                video={project.video}
                links={project.links}
              />
            </BlurFade>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-3 -mt-4">
          <Link
            href={satHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-row justify-between bg-card border border-border rounded-lg p-4 items-center gap-4 text-inherit no-underline"
          >
            <Avatar className="size-11 rounded-md! ">
              <AvatarImage
                className={"rounded-md!"}
                src="/satgroups.png"
                alt="SAT Groups"
              />
              <AvatarFallback>SG</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold flex items-center gap-1">
                SAT Groups
                <ArrowUpRight
                  className="h-3.5 w-3.5 text-muted-foreground shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </p>
              <p className="text-xs text-muted-foreground line-clamp-2">
                An Android application for SAT Groups Compancy to manage their
                operations and communication.
              </p>
            </div>
          </Link>
          <Link
            href={unlockHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-row justify-between bg-card border border-border rounded-lg p-4 items-center gap-4 text-inherit no-underline"
          >
            <Avatar className="size-11 rounded-md! ">
              <AvatarImage
                className={"rounded-md!"}
                src="/unlockpi.png"
                alt="Unlock PI"
              />
              <AvatarFallback>UP</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold flex items-center gap-1">
                UnlockPi
                <ArrowUpRight
                  className="h-3.5 w-3.5 text-muted-foreground shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </p>
              <p className="text-xs text-muted-foreground line-clamp-2">
                An Android application for freshers that are looking for jobs.
              </p>
            </div>
          </Link>
        </div>
        <div className="mt-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-3xl border border-border bg-card p-5 sm:p-6">
            <Link
              href="https://www.appykit-ui.com/casestudy"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 no-underline text-inherit flex-1 min-w-0"
            >
              <Avatar className="size-11 rounded-md! ">
                <AvatarImage
                  className={"rounded-md!"}
                  src="/caseStudy.png"
                  alt="Case study"
                />
                <AvatarFallback>CS</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="text-xxl font-semibold">Checkout my case study</p>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  Read the blog for detailed case studies, interface patterns, and product design insights.
                </p>
              </div>
            </Link>
            <Link
              href="https://www.appykit-ui.com/casestudy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center  justify-center rounded-lg border border-input bg-primary px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-primary/90 whitespace-nowrap flex-shrink-0"
            >
              Read Case Study
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
}
