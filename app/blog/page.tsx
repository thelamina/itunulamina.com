import type { Metadata } from "next";
import Link from "next/link";
import { allPosts as posts } from "contentlayer/generated";
import { ViewCounter } from "./ViewCounter";
import { format } from "date-fns";
import clsx from "clsx";
import { getPosts } from "@/lib/contentlayer";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read my thoughts on software development, design, and more.",
};

export default async function BlogPage() {
  const allPosts = getPosts(posts);

  return (
    <section>
      <h1 className="pb-6 font-serif text-3xl font-bold">Blog</h1>
      <ul className="space-y-4">
        {allPosts
          .sort((a, b) => {
            if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
              return -1;
            }
            return 1;
          })
          .map((post) => (
            <li key={post._id}>
              <Link
                href={`/blog/${post.slug}`}
                className={clsx(
                  "inline-block border-neutral-200 px-4 py-2 text-neutral-800 no-underline transition-transform duration-300 dark:border-slate-700/80 dark:text-neutral-200",
                  "hover:translate-x-2 hover:border-l-4 "
                )}
              >
                <div className="">
                  <p className="font-medium">{post.title}</p>
                  <div className="flex items-center gap-2 font-mono text-sm tracking-tighter text-neutral-500">
                    <p className="text-xs font-medium">
                      {format(new Date(post.publishedAt), "dd MMM. yyyy")}
                    </p>
                    <p>|</p>
                    <ViewCounter slug={post.slug} trackView={false} />
                  </div>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </section>
  );
}
