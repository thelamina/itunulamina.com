import type { Metadata } from "next";
import {
  GitHubIcon,
  YoutubeIcon,
  ArrowIcon,
  TwitterIcon,
  LinkedInIcon,
} from "components/icons";
import { github, linkedin, twitter } from "lib/info";

export const metadata: Metadata = {
  title: "About",
  description: "Software engineer",
};

export default function AboutPage() {
  return (
    <section>
      <h1 className="font-serif text-3xl font-bold">About Me</h1>
      <p className="my-5 text-neutral-800 dark:text-neutral-200">
        Hey, I'm Itunu — most folks call me <b>IT</b>.
      </p>
      <div className="prose prose-neutral text-neutral-800 dark:prose-invert dark:text-neutral-200">
        <p>
          I'm a seasoned software engineer with a deep passion for frontend and
          mobile development. I craft web and mobile applications that users
          love, blending performance, design, and seamless experiences.
        </p>

        <hr />

        <p>
          But it doesn't stop there! I'm obssessed with{" "}
          <b>software performance, developer tools, and security.</b> You know
          that feeling when an app runs seamlessly, blazing fast? Yeah, that's
          what I strive for. I love{" "}
          <b>optimizing code and improving performance</b> to ensure a smooth
          and snappy user experience. And when it comes to developer tools, I'm
          all about finding ways to refine workflows and make development
          effortless.
        </p>

        <p>
          I'm a firm believer in <b>continuous learning and growth.</b> This
          field moves at warp speed, and I'm always up for diving into new
          challenges head-on. Whether it's experimenting with the latest
          frameworks or exploring new tools or techniques, I'm all about pushing
          the boundaries of what's possible.
        </p>

        <p className="mb-8">
          For me, the user experience is everything. A well-designed interface
          isn't just aesthetics—it's what keeps users engaged. I create
          interfaces that are not only intuitive but also visually stunning, so
          users keep coming back for more, ensuring that your app looks and feel
          amazing across all devices.
        </p>

        <div className="flex flex-col gap-2 md:flex-row md:gap-2">
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={`https://github.com/${github}`}
            className="group relative flex w-full items-center justify-between rounded-lg border border-neutral-200 p-4 text-neutral-800 no-underline transition-colors dark:border-neutral-800 dark:text-neutral-200"
          >
            <div className="absolute left-0 top-0 h-full w-0 rounded-lg from-slate-200/30 via-slate-300/10 to-slate-700/10 transition-all duration-500 hover:bg-gradient-to-tr  group-hover:w-full" />

            <div className="flex items-center">
              <GitHubIcon />
              <div className="ml-3">GitHub</div>
            </div>
            <ArrowIcon />
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={`https://www.linkedin.com/in/${linkedin}`}
            className="group relative flex w-full items-center justify-between rounded-lg border border-neutral-200 p-4 text-neutral-800 no-underline transition-colors dark:border-neutral-800 dark:text-neutral-200"
          >
            <div className="absolute left-0 top-0 h-full w-0 rounded-lg from-slate-200/30 via-slate-300/10 to-slate-700/10 transition-all duration-500 hover:bg-gradient-to-tr  group-hover:w-full" />

            <div className="flex items-center">
              <LinkedInIcon />
              <div className="ml-3">LinkedIn</div>
            </div>
            <ArrowIcon />
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={`https://x.com/${twitter}`}
            className="group relative flex w-full items-center justify-between rounded-lg border border-neutral-200 p-4 text-neutral-800 no-underline transition-colors dark:border-neutral-800 dark:text-neutral-200"
          >
            <div className="absolute left-0 top-0 h-full w-0 rounded-lg from-slate-200/30 via-slate-300/10 to-slate-700/10 transition-all duration-500 hover:bg-gradient-to-tr  group-hover:w-full" />

            <div className="flex items-center">
              <TwitterIcon />
              <div className="ml-3">X</div>
            </div>
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
