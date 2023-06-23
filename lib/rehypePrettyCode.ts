import { type Options } from "rehype-pretty-code";
import { visit } from "unist-util-visit";

export const rehypePrettyCodeOptions: Partial<Options> = {
  // use a prepackaged theme
  theme: "one-dark-pro",

  keepBackground: false,

  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and allow empty
    // lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },

  onVisitHighlightedLine(node) {
    node.properties.className?.push("line--highlighted");
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ["word--highlighted"];
  },
};

export const rehypePrettyCodeCopy = () => (tree) => {
  visit(tree, (node) => {
    if (node?.type === "element" && node?.tagName === "pre") {
      const [codeEl] = node?.children;

      if (codeEl?.tagName !== "code") return;

      node.raw = codeEl?.children?.[0].value;
    }
  });
};

export const rehypePrettyCodeSyntax = (tree) => {
  visit(tree, (node) => {
    if (node?.type === "element" && node?.tagName === "div") {
      if (!("data-rehype-pretty-code-fragment" in node.properties)) {
        return;
      }

      for (const child of node?.children) {
        if (child.tagName === "pre") {
          child.properties["raw"] = node.raw;
        }
      }
    }
  });
};
