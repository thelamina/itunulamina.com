import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXComponent } from "@/components";
import { allProjects } from "contentlayer/generated";
import { getTweet } from "react-tweet/api";
import Balancer from "react-wrap-balancer";

export async function generateStaticParams() {
  return allProjects.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  const post = allProjects.find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
    slug,
  } = post;
  const ogImage = image
    ? `https://itunulamina.com/${image}`
    : `https://itunulamina.com/api/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://itunulamina.com/project/${slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Project({ params }) {
  const project = allProjects.find((post) => post.slug === params.slug);
  const tweets = new Map();

  if (!project) {
    notFound();
  }

  if (project) {
    const tweetsData = await Promise.all(
      project.tweetIds.map((x: string) => getTweet(x))
    );
    tweetsData.forEach((td, index) => {
      tweets.set(project.tweetIds[index], td);
    });
  }

  return (
    <section>
      <script type="application/ld+json">
        {JSON.stringify(project.structuredData)}
      </script>
      <h1 className="max-w-[650px] font-serif text-3xl font-bold">
        <Balancer>{project.title}</Balancer>
      </h1>
      <div className="mb-8 mt-4 grid max-w-[650px] grid-cols-[auto_1fr_auto] items-center font-mono text-sm font-semibold">
        <div className="mx-2 h-[0.2em] bg-neutral-50 dark:bg-neutral-800" />
      </div>

      <MDXComponent
        code={project.body.code}
        slug={"project" + project.slug}
        tweets={project.tweetIds}
      />
    </section>
  );
}
