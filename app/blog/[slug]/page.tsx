import type { Metadata } from "next";
import { getPartialPost, getPosts } from "lib/contentlayer";
import { notFound } from "next/navigation";
import { MDXComponent } from "@/components";
import { allPosts } from "contentlayer/generated";
import { getTweet } from "react-tweet/api";
import Balancer from "react-wrap-balancer";
import { format } from "date-fns";
import { ViewCounter } from "../ViewCounter";
import { BlogSeries } from "../BlogSeries";

export async function generateStaticParams() {
  return getPosts(allPosts).map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  const post = getPosts(allPosts).find((post) => post.slug === params.slug);
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
      url: `https://itunulamina.com/blog/${slug}`,
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

export default async function BlogPostPage({ params }) {
  const currentPost = getPosts(allPosts).find(
    (post) => post.slug === params.slug
  );

  const tweets = new Map();

  if (!currentPost) {
    // throw new Error('Post not found');
    notFound();
  }

  const post = getPartialPost(currentPost, allPosts);

  if (post) {
    const tweetsData = await Promise.all(
      post.tweetIds.map((x: string) => getTweet(x))
    );
    tweetsData.forEach((td, index) => {
      tweets.set(post.tweetIds[index], td);
    });
  }

  return (
    <section>
      <script type="application/ld+json">
        {JSON.stringify(post.structuredData)}
      </script>
      <h1 className="max-w-[650px] font-serif text-3xl font-bold">
        <Balancer>{post.title}</Balancer>
      </h1>
      <div className="mb-8 mt-4 grid max-w-[650px] grid-cols-[auto_1fr_auto] items-center font-mono text-sm font-semibold">
        <div className="rounded-md bg-neutral-100 px-2 py-1 tracking-wider dark:bg-neutral-800">
          {format(new Date(post.publishedAt), "dd-MMM-yyyy")}
        </div>
        <div className="mx-2 h-[0.2em] bg-neutral-50 dark:bg-neutral-800" />
        <ViewCounter slug={post.slug} trackView />
      </div>

      {post.series && post.series.posts.length > 1 && (
        <BlogSeries data={post.series} isInteractive={true} />
      )}

      <MDXComponent
        code={post.body.code}
        slug={"/blog/" + post.slug}
        tweets={post.tweetIds}
      />

      {post.series && post.series.posts.length > 1 && (
        <div className="mt-16">
          <BlogSeries data={post.series} />
        </div>
      )}
    </section>
  );
}
