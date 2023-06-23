"use client";

import { useEffect } from "react";

import useSWR from "swr";

type PostView = {
  slug: string;
  views: string;
};

interface APIResponse<TData> {
  data: TData;
  message: string;
  status: number;
}

async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

export function ViewCounter({
  slug,
  trackView,
}: {
  slug: string;
  trackView: boolean;
}) {
  const { data, isLoading, error } = useSWR<APIResponse<PostView[]>>(
    `/api/views`,
    fetcher,
    {}
  );
  const views = !error && data?.data?.find((view) => view.slug === slug)?.views;

  useEffect(() => {
    const registerView = () =>
      fetch(`/api/views/${slug}`, {
        method: "POST",
      });

    if (trackView) {
      registerView();
    }
  }, [slug]);

  if (isLoading) {
    return (
      <p className="animate-bounce text-sm font-medium text-neutral-500">...</p>
    );
  }

  if (error) {
    return <p className="text-xs font-medium  text-neutral-500">❌ views</p>;
  }

  return (
    <p className="font-mono text-sm tracking-tighter text-neutral-500">
      {data ? `${views} views` : "views"}
    </p>
  );
}
