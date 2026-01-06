"use client";

import Link from "next/link";
import { motion, useAnimationControls } from "motion/react";
import { useEffect, useState } from "react";

export function Logo() {
  const controls = useAnimationControls();
  const [isHovered, setIsHovered] = useState(false);

  // Continuous subtle floating animation
  useEffect(() => {
    controls.start({
      y: [0, -2, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    });
  }, [controls]);

  return (
    <Link
      aria-label="Itunu Lamina"
      href="/"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative"
        animate={controls}
        whileHover={{
          scale: 1.1,
          rotate: [0, -3, 3, 0],
          transition: { duration: 0.4 },
        }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glow effect behind logo */}
        <motion.div
          className="absolute inset-0 blur-xl"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isHovered ? 0.6 : 0,
            scale: isHovered ? 1.5 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <svg
            className="h-[25px] text-neutral-400 dark:text-neutral-500 md:h-[37px]"
            width="26"
            height="109"
            viewBox="0 0 26 109"
            fill="currentColor"
          >
            <path d="M6.8125 109H0.25V19.3125H6.8125V109ZM25.9375 109H19.375V0.1875H25.9375V109Z" />
          </svg>
        </motion.div>

        {/* Main SVG */}
      <motion.svg
          className="relative h-[25px] md:h-[37px]"
        width="26"
        height="109"
        viewBox="0 0 26 109"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
          initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
        >
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <motion.stop
                offset="0%"
                animate={{
                  stopColor: isHovered
                    ? ["#6366f1", "#8b5cf6", "#6366f1"]
                    : ["#171717", "#404040", "#171717"],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="dark:!stop-color-white"
              />
              <motion.stop
                offset="100%"
                animate={{
                  stopColor: isHovered
                    ? ["#8b5cf6", "#ec4899", "#8b5cf6"]
                    : ["#525252", "#171717", "#525252"],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="dark:!stop-color-neutral-400"
              />
            </linearGradient>
            <linearGradient id="logo-gradient-dark" x1="0%" y1="0%" x2="100%" y2="100%">
              <motion.stop
                offset="0%"
                animate={{
                  stopColor: isHovered
                    ? ["#818cf8", "#a78bfa", "#818cf8"]
                    : ["#fafafa", "#d4d4d4", "#fafafa"],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.stop
                offset="100%"
                animate={{
                  stopColor: isHovered
                    ? ["#c084fc", "#f472b6", "#c084fc"]
                    : ["#a3a3a3", "#fafafa", "#a3a3a3"],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </linearGradient>
            {/* Shimmer effect */}
            <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <motion.stop
                offset="50%"
                stopColor="white"
                animate={{ stopOpacity: [0, 0.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
              />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          {/* First letter "I" - shorter one */}
          <motion.path
            d="M6.8125 109H0.25V19.3125H6.8125V109Z"
            className="fill-[url(#logo-gradient)] dark:fill-[url(#logo-gradient-dark)]"
            initial={{ pathLength: 0, opacity: 0, y: 50 }}
            animate={{ pathLength: 1, opacity: 1, y: 0 }}
            transition={{
              pathLength: { duration: 1, ease: "easeInOut", delay: 0.2 },
              opacity: { duration: 0.5, delay: 0.2 },
              y: { duration: 0.6, type: "spring", stiffness: 100, delay: 0.2 },
            }}
          />

          {/* Second letter "L" - taller one */}
          <motion.path
            d="M25.9375 109H19.375V0.1875H25.9375V109Z"
            className="fill-[url(#logo-gradient)] dark:fill-[url(#logo-gradient-dark)]"
            initial={{ pathLength: 0, opacity: 0, y: -50 }}
            animate={{ pathLength: 1, opacity: 1, y: 0 }}
            transition={{
              pathLength: { duration: 1, ease: "easeInOut", delay: 0.4 },
              opacity: { duration: 0.5, delay: 0.4 },
              y: { duration: 0.6, type: "spring", stiffness: 100, delay: 0.4 },
            }}
          />

          {/* Stroke outline animation */}
        <motion.path
            d="M6.8125 109H0.25V19.3125H6.8125V109ZM25.9375 109H19.375V0.1875H25.9375V109Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-neutral-300 dark:text-neutral-600"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 0] }}
            transition={{
              pathLength: { duration: 2, ease: "easeInOut" },
              opacity: { duration: 2, times: [0, 0.5, 1] },
            }}
          />

          {/* Shimmer overlay */}
          <motion.rect
            x="-10"
            y="0"
            width="50"
            height="120"
            fill="url(#shimmer)"
            initial={{ x: -60 }}
            animate={{ x: 60 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut",
            }}
            style={{ mixBlendMode: "overlay" }}
          />
        </motion.svg>

        {/* Sparkle particles on hover */}
        {isHovered && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-1 w-1 rounded-full bg-violet-400 dark:bg-violet-300"
          initial={{
            opacity: 0,
                  scale: 0,
                  x: 13,
                  y: 20,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  x: 13 + Math.cos((i * Math.PI * 2) / 6) * 25,
                  y: 20 + Math.sin((i * Math.PI * 2) / 6) * 25,
                }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.08,
                  ease: "easeOut",
                }}
              />
            ))}
          </>
        )}

        {/* Pulse ring on hover */}
        <motion.div
          className="absolute left-1/2 top-1/2 -z-10 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-400/50 dark:border-violet-300/50"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isHovered ? [1, 2, 2] : 0,
            opacity: isHovered ? [0.8, 0.4, 0] : 0,
          }}
          transition={{
            duration: 0.8,
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 0.5,
          }}
        />
      </motion.div>
    </Link>
  );
}
