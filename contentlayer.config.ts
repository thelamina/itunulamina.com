import { makeSource } from "contentlayer/source-files";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import {
  rehypePrettyCodeCopy,
  rehypePrettyCodeOptions,
  rehypePrettyCodeSyntax,
} from "./lib/rehypePrettyCode";
import { Post } from "./content/definitions/Post";
import { Project } from "./content/definitions/Project";

export default makeSource({
  contentDirPath: "content",

  documentTypes: [Post, Project],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCodeCopy, rehypePrettyCodeSyntax],
      [rehypePrettyCode, rehypePrettyCodeOptions],

      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["anchor"],
          },
        },
      ],
    ],
  },
});
