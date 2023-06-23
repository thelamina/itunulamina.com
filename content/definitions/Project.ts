import { projectStatus, projectType } from "../../lib/contentlayer";
import { defineDocumentType, ComputedFields } from "contentlayer/source-files";

const computedFields: ComputedFields<"Project"> = {
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
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
      "@type": "ProjectPosting",
      headline: doc.title,
      datePublished: doc.publishedAt,
      dateModified: doc.publishedAt,
      description: doc.summary,
      image: doc.image
        ? `https://itunulamina.com${doc.image}`
        : `https://itunulamina.com/api/og?title=${doc.title}`,
      url: `https://itunulamina.com/project/${doc._raw.flattenedPath}`,
      author: {
        "@type": "Person",
        name: "Itunu Lamina",
      },
    }),
  },
};

export const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: `projects/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    publishedAt: { type: "string", required: true },
    externalUrl: { type: "string" },
    summary: { type: "string", required: true },
    image: { type: "string" },
    status: { type: "enum", options: projectStatus },
    type: { type: "enum", options: projectType },
  },
  computedFields,
}));
