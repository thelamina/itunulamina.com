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
  description: "VP of Developer Experience at Vercel.",
};

export default function AboutPage() {
  return (
    <section>
      <h1 className="font-serif text-3xl font-bold">About Me</h1>
      <p className="my-5 text-neutral-800 dark:text-neutral-200">
        Hey, I'm Itunu. Most folks know me as <b>IT</b>.
      </p>
      <div className="prose prose-neutral text-neutral-800 dark:prose-invert dark:text-neutral-200">
        <p>
          I'm a seasoned software engineer with a deep passion for frontend
          development. I've got years of experience under my belt, and I'm all
          about creating web applications that users can't help but fall in love
          with.
        </p>
        <hr />
        <p>
          But it doesn't stop there! I'm also super passionate about
          <b> software performance, developer tools, and security. </b>
          You know that feeling when an app runs seamlessly, blazing fast? Yeah,
          that's what I strive for. I love{" "}
          <b>optimizing code and tweaking performance</b> to ensure a smooth and
          snappy user experience. And when it comes to developer tools, I'm all
          about finding ways to streamline workflows and make development a
          breeze.
        </p>
        <p>
          I'm a firm believer in
          <b> continuous learning and growth. </b>
          This field moves at warp speed, and I'm always up for diving into new
          challenges head-on. Whether it's experimenting with the latest
          frontend frameworks or exploring cutting-edge web development
          techniques, I'm all about pushing the boundaries of what's possible.
        </p>
        <p className="mb-8">
          For me, the user experience is paramount. I firmly believe that a
          beautifully designed interface can make all the difference. I strive
          to create interfaces that are not only intuitive but also visually
          stunning, so users keep coming back for more.{" "}
          <b>Responsive design and pixel-perfect</b> precision are my jam,
          ensuring that your app looks amazing on any device and browser.
        </p>
        <div className="flex flex-col gap-2 md:flex-row md:gap-2">
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={`https://twitter.com/${twitter}`}
            className="group relative flex w-full items-center justify-between rounded-lg border border-neutral-200 p-4 text-neutral-800 no-underline transition-colors dark:border-neutral-800 dark:text-neutral-200"
          >
            <div className="absolute left-0 top-0 h-full w-0 rounded-lg from-slate-200/30 via-slate-300/10 to-slate-700/10 transition-all duration-500 hover:bg-gradient-to-tr  group-hover:w-full" />

            <div className="flex items-center">
              <TwitterIcon />
              <div className="ml-3">Twitter</div>
            </div>
            <ArrowIcon />
          </a>
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
        </div>
      </div>
    </section>
  );
}
