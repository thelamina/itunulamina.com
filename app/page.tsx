import Link from "next/link";
import Image from "next/image";
import { getBlogViews } from "lib/metrics";
import {
  ArrowIcon,
  GitHubIcon,
  TwitterIcon,
  LinkedInIcon,
  ViewsIcon,
} from "components/icons";
import { name, avatar, twitter, github, linkedin, Bio, About } from "lib/info";

export const revalidate = 60;

export default async function HomePage() {
  return (
    <section>
      <h1 className="font-serif text-3xl font-bold">{name}</h1>
      <p className="my-5 max-w-[460px] text-neutral-800 dark:text-neutral-200">
        <About />
      </p>
      <div className="my-8 flex flex-col items-start md:flex-row md:items-center">
        <Image
          alt={name}
          className="rounded-full grayscale"
          src={avatar}
          placeholder="blur"
          width={100}
          priority
        />
        <div className="ml-0 mt-8 space-y-2 text-neutral-500 dark:text-neutral-400 md:ml-6 md:mt-0">
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={`https://github.com/${github}`}
            className="flex items-center gap-2"
          >
            <GitHubIcon /> {github}
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={`https://www.linkedin.com/in/${linkedin}`}
            className="flex items-center gap-2"
          >
            <LinkedInIcon /> {linkedin}
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={`https://x.com/${twitter}`}
            className="flex items-center gap-2"
          >
            <TwitterIcon /> {twitter}
          </a>
        </div>
      </div>
      <p className="my-5 max-w-[600px] text-neutral-800 dark:text-neutral-200">
        <Bio />
      </p>
      <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 text-neutral-500 dark:text-neutral-400 md:flex-row md:space-x-4 md:space-y-0">
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-700 dark:hover:text-neutral-200"
            rel="noopener noreferrer"
            target="_blank"
            href={`https://x.com/${twitter}`}
          >
            <ArrowIcon />
            <p className="">follow me on X</p>
          </a>
        </li>
      </ul>
    </section>
  );
}
