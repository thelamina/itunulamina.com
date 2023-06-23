import { allPosts, allProjects } from "contentlayer/generated";

export default async function sitemap() {
  const blogs = allPosts.map((post) => ({
    url: `https://itunulamina.com/blog/${post.slug}`,
    lastModified: post.publishedAt,
  }));

  const projects = allProjects.map((proj) => ({
    url: `https://itunulamina.com/project/${proj.slug}`,
    lastModified: proj.publishedAt,
  }));

  const routes = ["", "/about", "/blog", "/project", "/uses"].map((route) => ({
    url: `https://itunulamina.com${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs, ...projects];
}
