import { pick } from "contentlayer/client";
import { Post, Project } from "contentlayer/generated";

export const allTagNames = ["Next.js", "MDX", "Next Conf", "React Conf"];
export const allTagSlugs = ["next", "mdx", "next-conf", "react-conf"];

export const projectStatus = ["in-progress", "deployed"];
export const projectType = ["lab", "open-source", "gig"];
export const blogStatus = ["draft", "published"];

export const formatPostPreview = (post: Post) => {
  const partialPost = pick(post, [
    "tags",
    "slug",
    "title",
    "summary",
    "publishedAt",
  ]);

  return {
    ...partialPost,
    type: post.type,
    summary: partialPost.summary ?? null,
    tags: partialPost.tags || [],
  };
};

export const getPosts = (posts: Post[]) => {
  const isProd = process.env.NODE_ENV === "production";

  if (isProd) {
    return posts.filter((p) => p.status === "published");
  }
  return posts;
};

export const getProjects = (projects: Project[]) => {
  const isProd = process.env.NODE_ENV === "production";

  if (isProd) {
    return projects;
  }
  return projects;
};

export const getPartialPost = (
  {
    title,
    slug,
    summary,
    body,
    publishedAt,
    tweetIds,
    structuredData,
    series,
  }: Post,
  allPosts: Post[]
) => ({
  title,
  slug,
  summary: summary ?? null,
  tweetIds,
  publishedAt,
  structuredData,
  body: {
    code: body.code,
  },

  series: series
    ? {
        title: series.title,
        posts: allPosts
          .filter((p) => p.series?.title === series.title)
          .sort(
            (a, b) =>
              Number(new Date(a.series!.order)) -
              Number(new Date(b.series!.order))
          )
          .map((p) => {
            return {
              title: p.title,
              slug: p.slug,
              status: p.status,
              isCurrent: p.slug === slug,
            };
          }),
      }
    : null,
});
