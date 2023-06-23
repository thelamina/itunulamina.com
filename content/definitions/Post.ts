import { defineDocumentType, ComputedFields } from "contentlayer/source-files";
import { Series } from "../../content/definitions/Series";
import { Tag } from "../../content/definitions/Tag";
import { blogStatus } from "../../lib/contentlayer";

const computedFields: ComputedFields<"Post"> = {
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
    // resolve: (doc) => doc._raw.flattenedPath,
  },
  tweetIds: {
    type: "list",
    resolve: (doc) => {
      const tweetMatches = doc.body.raw.match(
        /<StaticTweet\sid="[0-9]+"\s\/>/g
      );
      return tweetMatches?.map((tweet) => tweet.match(/[0-9]+/g)?.[0]) || [];
    },
  },
  structuredData: {
    type: "json",
    resolve: (doc) => ({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: doc.title,
      datePublished: doc.publishedAt,
      dateModified: doc.publishedAt,
      description: doc.summary,
      image: doc.image
        ? `https://itunulamina.com${doc.image}`
        : `https://itunulamina.com/api/og?title=${doc.title}`,
      url: `https://itunulamina.com/blog/${doc._raw.flattenedPath}`,
      author: {
        "@type": "Person",
        name: "Itunu Lamina",
      },
    }),
  },
};

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    publishedAt: { type: "string", required: true },
    summary: { type: "string", required: true },
    status: { type: "enum", options: blogStatus },
    image: { type: "string" },
    series: {
      type: "nested",
      of: Series,
    },
    tags: {
      type: "list",
      of: Tag,
    },
  },
  computedFields,
}));
