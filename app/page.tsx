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
import { name, about, bio, avatar, twitter, github, linkedin } from "lib/info";

export const revalidate = 60;

export default async function HomePage() {
  // let views;

  // try {
  //   [views] = await Promise.all<number>([getBlogViews()]);
  // } catch (error) {
  //   console.error(error);
  // }

  return (
    <section>
      <h1 className="font-serif text-3xl font-bold">{name}</h1>
      <p className="my-5 max-w-[460px] text-neutral-800 dark:text-neutral-200">
        {about()}
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
            href={`https://twitter.com/${twitter}`}
            className="flex items-center gap-2"
          >
            <TwitterIcon /> {twitter}
          </a>
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
          {/* <Link href="/blog" className="flex items-center">
            <LinkedInIcon />

            {`${views || ""} blog views all time`}
          </Link> */}
        </div>
      </div>
      <p className="my-5 max-w-[600px] text-neutral-800 dark:text-neutral-200">
        {bio()}
      </p>
      <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 text-neutral-500 dark:text-neutral-400 md:flex-row md:space-x-4 md:space-y-0">
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-700 dark:hover:text-neutral-200"
            rel="noopener noreferrer"
            target="_blank"
            href={`https://twitter.com/${twitter}`}
          >
            <ArrowIcon />
            <p className="">follow me on twitter</p>
          </a>
        </li>
      </ul>
    </section>
  );
}
