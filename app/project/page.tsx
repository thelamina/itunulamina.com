import type { Metadata } from "next";
import Image from "next/image";
import { allProjects } from "contentlayer/generated";

import {
  GitHubIcon,
  YoutubeIcon,
  ArrowIcon,
  TwitterIcon,
} from "components/icons";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Project",
  description: "Some of the projects I've been involved in",
};

const lists = [
  {
    appName: "Sendchamp",
    description: (
      <>
        <p>
          I joined the incredible journey of SendChamp, a game-changing product
          aimed at revolutionizing business communication. As a frontend
          engineer, I was determined to create the most seamless and modern
          experience possible.
        </p>
        <p>
          With a talented team, I meticulously crafted the application's user
          interface, focusing on responsive layouts and intuitive interactions.
          Every line of code was infused with a passion for simplicity and
          elegance, ensuring an exceptional user experience.
        </p>
        <p>
          Driving customer retention and acquisition was paramount. I
          collaborated closely with the marketing and customer success teams,
          implementing user feedback to enhance the application's features and
          address user needs.
        </p>
        <p>
          Our combined efforts paid off, as SendChamp became a game-changer in
          business communication. Through our dedication and passion, we
          transformed the vision of a seamless and modern experience into an
          extraordinary reality that empowered businesses worldwide.
        </p>
      </>
    ),
    url: "https://sendchamp.com",
    oss: "",
    images: [
      {
        src: "./images/component-library.png",
        alt: "",
      },
    ],
  },
  {
    appName: "",
    description: "",
    url: "",
    oss: "",
    images: [
      "http://localhost:3000/_next/image?url=%2Fimages%2Freact-frameworks%2Fevolving.jpg&w=750&q=75",
    ],
  },
  {
    appName: "",
    description: "",
    url: "",
    oss: "",
    images: [],
  },
];

export default function ProjectPage() {
  return (
    <section>
      <h1 className="font-serif text-3xl font-bold">Projects</h1>

      <p className="my-5 text-neutral-800 dark:text-neutral-200">
        These are some of the projects that I've worked on either as a member of
        a team or as an individual contributor
      </p>

      <div className="prose prose-neutral text-neutral-800 dark:prose-invert dark:text-neutral-200">
        <p>
          These projects highlight my expertise in{" "}
          <b>
            frontend and mobile development, user experience design, and my
            ability to work collaboratively in diverse teams.
          </b>{" "}
        </p>

        <hr />
        <ul className="not-prose grid list-none gap-x-8 gap-y-20 pl-0 md:grid-cols-2">
          {allProjects
            .sort((a, b) => {
              if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
                return -1;
              }
              return 1;
            })
            .map((proj) => (
              <li key={proj._id}>
                <div className="unset inline-block h-full font-normal no-underline">
                  <div className="flex h-full flex-col items-stretch justify-between">
                    <div>
                      <div className="flex items-center gap-4">
                        <h2 className="pb-1 text-xl font-semibold">
                          {proj.title}
                        </h2>
                        {proj.externalUrl && (
                          <a href={proj.externalUrl}>
                            <ArrowIcon />
                          </a>
                        )}
                      </div>
                      <p className="pb-6 md:text-base">{proj.summary}</p>
                    </div>

                    {proj.image && (
                      <Link href={`/project/${proj.slug}`}>
                        <div className="fde-in-black group relative flex gap-8 overflow-hidden rounded-xl">
                          <Image
                            alt={proj.title}
                            src={proj.image}
                            width={1080}
                            height={200}
                            className="h-full w-full rounded-xl object-contain"
                            priority
                          />

                          <div className="absolute left-0 top-0 flex h-full w-full rounded-xl bg-gradient-to-tr from-slate-200/30 via-slate-300/40 to-slate-700/60 p-px opacity-0 shadow-surface-elevation-medium transition-opacity duration-500 group-hover:opacity-100">
                            <button className="m-auto inline-flex rounded bg-slate-300 px-4 py-2 text-center text-sm font-medium capitalize text-slate-800 shadow-surface-glass transition-all hover:px-8 hover:py-4">
                              See details
                            </button>
                          </div>
                        </div>
                      </Link>
                    )}
                    {/* <ul className='group-hover:animation-paused flex shrink-0  duration-500 gap-8'> */}
                  </div>
                </div>
              </li>
            ))}
        </ul>
        <hr />
        <p className="p-4 text-sm text-gray-500">
          Each project presented unique challenges and opportunities for
          innovation, allowing me to grow both technically and creatively. I'm
          excited to bring this experience and passion for building impactful
          projects to future endeavors.
        </p>
      </div>
    </section>
  );
}
