import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { TweetProps, Tweet, TweetComponents } from "react-tweet";
import { useMDXComponent } from "next-contentlayer/hooks";
import { CopyButton } from "./CopyButton";

const CustomLink = (props) => {
  const href = props.href;

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

function Callout(props) {
  return (
    <div className="my-8 flex rounded-lg border border-neutral-200 bg-neutral-100 p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mr-4 flex w-4 items-start">{props.emoji}</div>
      <div className="callout w-full">{props.children}</div>
    </div>
  );
}

function ProsCard({ title, pros }) {
  return (
    <div className="my-4 w-full rounded-xl border border-emerald-200 bg-neutral-50 p-6 dark:border-emerald-900 dark:bg-neutral-900">
      <span>{`You might use ${title} if...`}</span>
      <div className="mt-4">
        {pros.map((pro) => (
          <div key={pro} className="mb-2 flex items-baseline font-medium">
            <div className="mr-2 h-4 w-4">
              <svg className="h-4 w-4 text-emerald-500" viewBox="0 0 24 24">
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </g>
              </svg>
            </div>
            <span>{pro}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConsCard({ title, cons }) {
  return (
    <div className="my-6 w-full rounded-xl border border-red-200 bg-neutral-50 p-6 dark:border-red-900 dark:bg-neutral-900">
      <span>{`You might not use ${title} if...`}</span>
      <div className="mt-4">
        {cons.map((con) => (
          <div key={con} className="mb-2 flex items-baseline font-medium">
            <div className="mr-2 h-4 w-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 text-red-500"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </div>
            <span>{con}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RoundedImage(props) {
  return <Image className="rounded-lg" alt={props.alt} {...props} />;
}

const components = {
  a: CustomLink,
  Callout,
  ProsCard,
  ConsCard,
  Image: RoundedImage,
  pre: ({ children, ...props }) => (
    <pre {...props}>
      <CopyButton text={props.raw} />
      {children}
    </pre>
  ),
};

interface MdxProps {
  code: string;
  slug: string;
  tweets: Map<string, TweetProps>;
}

export const tweetComponents: TweetComponents = {
  AvatarImg: (props) => <Image {...props} />,
  MediaImg: (props) => <Image {...props} fill unoptimized />,
};

export const MDXComponent = ({ code, slug, tweets }: MdxProps) => {
  const Component = useMDXComponent(code);

  const StaticTweet = ({ id }) => {
    // const tweet = tweets.get(id) as TweetProps;
    // console.log('mdx', { tweet });

    return (
      <Tweet
        apiUrl={id && `/api/tweet/${id}`}
        id={id}
        components={tweetComponents}
      />
    );
  };

  return (
    <article className="prose prose-neutral prose-quoteless dark:prose-invert">
      <Component
        components={{
          ...components,
          StaticTweet,
        }}
      />
    </article>
  );
};
