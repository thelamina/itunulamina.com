import "server-only";

import { Octokit } from "@octokit/rest";
import { cache } from "react";
import prisma from "./prisma";

const API_URL = `/api/views`;

export const getBlogViews = cache(async () => {
  try {
    const response = await prisma.post.findMany();
    return response?.reduce((acc, curr) => acc + Number(curr.views), 0);
  } catch (error) {
    throw new Error("An error occurred while fetching the data.");
  }
});

export async function getPostViews(slug: string): Promise<number> {
  const res = await fetch(API_URL + `/${slug}`);
  if (!res.ok) {
    throw new Error("An error occurred while fetching the data.");
  }
  return res.json();
}

export async function updatePostViews(slug: string): Promise<number> {
  const res = await fetch(API_URL + `/${slug}`, { method: "POST" });
  if (!res.ok) {
    throw new Error("An error occurred while posting the data.");
  }
  return res.json();
}

export async function getTweetCount() {
  if (!process.env.TWITTER_API_TOKEN) {
    return 0;
  }
  const user = "";
  const response = await fetch(
    `https://api.twitter.com/2/users/by/username/${user}user.fields=public_metrics`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_API_TOKEN}`,
      },
    }
  );
  const { data } = await response.json();
  return Number(data.public_metrics.tweet_count);
}

export const getStarCount = cache(async () => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });
  const response = await octokit.request("GET /users/{owner}/repos", {
    owner: "thelamina",
  });
  const totalStars = response?.data?.reduce(
    (acc, repo) => acc + repo.stargazers_count,
    0
  );
  return totalStars;
});
