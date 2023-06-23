"use client";

import { getPartialPost } from "../../lib/contentlayer";
import cx, { clsx } from "clsx";
import Link from "next/link";
import React from "react";
import { ArrowDownIcon } from "../../components/icons";

const Title = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h2 className="pb-1 text-xs font-medium uppercase text-neutral-500 dark:text-rose-100/50">
        Series
      </h2>
      <div className="text-lg font-medium text-neutral-700  dark:text-rose-100/90">
        {children}
      </div>
    </div>
  );
};

export const BlogSeries = ({
  data,
  isInteractive = false,
}: {
  data: NonNullable<ReturnType<typeof getPartialPost>["series"]>;
  isInteractive?: boolean;
}) => {
  const [isOpen, setIsOpen] = React.useState(!isInteractive);
  const currentIndex = data.posts.findIndex((post) => post.isCurrent) + 1;

  return (
    <div className="bg max-w-[500px] rounded-2xl bg-slate-300/50 p-5 shadow-surface-elevation-low dark:bg-slate-50/5">
      {isInteractive ? (
        <button
          className="group flex w-full items-center justify-between gap-4 text-left"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <Title>
            {data.title}
            <span className="pl-2 text-sm font-normal text-neutral-500 dark:text-rose-100/50">
              &middot; {currentIndex} of {data.posts.length}
            </span>
          </Title>

          <div className="ml-auto rounded-lg p-1 text-white transition-colors group-hover:bg-rose-100/25">
            <ArrowDownIcon
              className={clsx(
                "w-5 text-neutral-600 transition-transform dark:text-white",
                isOpen ? "rotate-180" : "rotate-0"
              )}
            />
          </div>
        </button>
      ) : (
        <Title>{data.title}</Title>
      )}

      <div
        className={cx({
          hidden: !isOpen,
          block: isOpen,
        })}
      >
        <hr className="my-5 border-t-2  border-slate-400/20 dark:border-rose-200/5" />

        <ul className="px-2 text-sm font-medium">
          {data.posts.map((p) => (
            <li
              key={p.slug}
              className={cx(
                "relative my-3 pl-7 before:absolute before:left-1 before:top-[9px] before:h-1.5 before:w-1.5 before:rounded-full",
                {
                  "before:bg-rose-300/90 before:ring-[3px] before:ring-purple-400/20 before:ring-offset-1 before:ring-offset-black/10":
                    p.isCurrent,
                  "before:bg-rose-500/30 before:dark:bg-rose-100/30":
                    p.status === "published" && !p.isCurrent,
                  "before:bg-rose-100/10": p.status !== "published",
                }
              )}
            >
              {p.status === "published" ? (
                p.isCurrent ? (
                  <span className="text-neutral-700 dark:text-neutral-400">
                    {p.title}
                  </span>
                ) : (
                  <Link
                    href={`/blog/${p.slug}`}
                    className={cx(
                      "rounded-md text-neutral-500 transition-all hover:bg-slate-400/10 hover:p-1 dark:text-neutral-400"
                    )}
                  >
                    {p.title}
                  </Link>
                )
              ) : (
                <span className="font-light text-neutral-400">{p.title}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
