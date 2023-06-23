"use client";

import clsx from "clsx";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutGroup, motion } from "framer-motion";

const navItems = {
  "/": {
    name: "home",
  },
  "/about": {
    name: "about",
  },
  "/blog": {
    name: "writing",
  },
  "/project": {
    name: "building",
  },
};

type colorTypes = "light" | "dark";

function useColorMode() {
  const [color, setColor] = useState<colorTypes>();

  const colorTheme = color === "dark" ? "light" : "dark";

  useEffect(() => {
    const localDefault = localStorage.getItem("theme");

    const deviceDefault = window?.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    setColor((localDefault as colorTypes) || deviceDefault);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (color) {
      root.classList.remove(colorTheme);
      root.classList.add(color);

      localStorage.setItem("theme", color);
    }
  }, [color, colorTheme]);

  function toggleMode() {
    setColor(color === "light" ? "dark" : "light");
  }
  return { color, setColor, toggleMode };
}

function Logo() {
  return (
    <Link aria-label="Itunu Lamina" href="/">
      <motion.svg
        className="h-[25px] text-black dark:text-white md:h-[37px]"
        width="26"
        height="109"
        viewBox="0 0 26 109"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          initial={{
            opacity: 0,
            pathLength: 0,
          }}
          animate={{
            opacity: 1,
            pathLength: 1,
          }}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 50,
          }}
          d="M6.8125 109H0.25V19.3125H6.8125V109ZM25.9375 109H19.375V0.1875H25.9375V109Z"
          fill="currentColor"
        />
        <motion.path
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 50,
          }}
          d="M6.8125 109V111H8.8125V109H6.8125ZM0.25 109H-1.75V111H0.25V109ZM0.25 19.3125V17.3125H-1.75V19.3125H0.25ZM6.8125 19.3125H8.8125V17.3125H6.8125V19.3125ZM6.8125 107H0.25V111H6.8125V107ZM2.25 109V19.3125H-1.75V109H2.25ZM0.25 21.3125H6.8125V17.3125H0.25V21.3125ZM4.8125 19.3125V109H8.8125V19.3125H4.8125ZM25.9375 109V111H27.9375V109H25.9375ZM19.375 109H17.375V111H19.375V109ZM19.375 0.1875V-1.8125H17.375V0.1875H19.375ZM25.9375 0.1875H27.9375V-1.8125H25.9375V0.1875ZM25.9375 107H19.375V111H25.9375V107ZM21.375 109V0.1875H17.375V109H21.375ZM19.375 2.1875H25.9375V-1.8125H19.375V2.1875ZM23.9375 0.1875V109H27.9375V0.1875H23.9375Z"
          fill="currentColor"
        />
      </motion.svg>
    </Link>
  );
}

export const Sidebar = () => {
  let pathname = usePathname() || "/";
  if (pathname.includes("/blog/")) {
    pathname = "/blog";
  }
  if (pathname.includes("/project/")) {
    pathname = "/project";
  }
  const { toggleMode, color } = useColorMode();

  return (
    <aside className="-mx-4 font-sans md:mx-0 md:w-[150px] md:flex-shrink-0 md:px-0">
      <div className="md:sticky md:top-20">
        <div className="mb-2 ml-2 flex flex-col items-start space-y-10 px-4 md:mb-8 md:ml-3 md:flex-row md:px-0 ">
          <Logo />
        </div>
        <LayoutGroup>
          <nav
            className="fade relative flex scroll-pr-6 flex-row items-center justify-between px-4 pb-0 md:relative md:flex-col md:items-start md:overflow-auto md:px-0"
            id="nav"
          >
            <div className="mb-2 mt-2 flex flex-row space-x-0 pr-10 md:mb-8 md:mt-0 md:flex-col">
              {Object.entries(navItems).map(([path, { name }]) => {
                const isActive = path === pathname;
                return (
                  <Link
                    key={path}
                    href={path}
                    className={clsx(
                      "flex align-middle font-serif text-sm text-neutral-500 transition-all hover:text-neutral-800 dark:hover:text-neutral-200",
                      isActive &&
                        "group relative flex-shrink-0 rounded-lg font-semibold text-neutral-800 transition duration-200 ease-in-out dark:text-neutral-200"
                    )}
                  >
                    <span className="relative z-10 flex h-full w-full items-center gap-1.5 rounded-lg px-[10px] py-2">
                      {name}
                      {path === pathname ? (
                        <motion.div
                          aria-hidden="true"
                          className="absolute left-0 top-0 h-full w-full rounded-lg border-gray-900/80 bg-gradient-to-tr from-slate-200/30 via-slate-300/10 to-slate-700/10 p-px dark:border"
                          style={{
                            transform: "none",
                            transformOrigin: "50% 50% 0px",
                          }}
                          layoutId="sidebar"
                          transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 30,
                          }}
                        />
                      ) : null}
                    </span>
                  </Link>
                );
              })}
            </div>

            <button
              onClick={toggleMode}
              type="button"
              className="ml-0 rounded-full p-2 text-sm text-gray-500 transition-colors hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 md:ml-3"
            >
              {color === "light" ? (
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </nav>
        </LayoutGroup>
      </div>
    </aside>
  );
};
