import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uses",
  description:
    "Here's what tech I'm currently using for coding, videos, and music.",
};

export default function UsesPage() {
  return (
    <section>
      <h1 className="mb-8 font-serif text-3xl font-bold">Uses</h1>
      <p className="mb-8 mt-2 text-neutral-700 dark:text-neutral-300">
        Here's what tech I'm currently using for coding, videos, and music.
      </p>
      <div className="prose prose-neutral dark:prose-invert">
        <h3 id="computer-office">Computer / Office</h3>
        <ul>
          <li>13&quot; Macbook Air M1 (2020)</li>
          <li>29&quot; LG UltraWide Monitor</li>
          <li>Logitech Z207 Speaker</li>
        </ul>
        <h3 id="coding">Coding</h3>
        <ul>
          <li>
            Editor: VSCode (
            <a href="https://gist.github.com">Settings / Extensions</a>)
          </li>
          <li>Theme: Nigt Owl</li>
          <li>Terminal: iTerm / zsh</li>
        </ul>

        <h3 id="software">Software</h3>
        <ul>
          <li>Spotify</li>
          <li>Google Task</li>
          <li>Google keep</li>
          <li>Texts</li>
        </ul>

        <h3 id="other-tech">Other Tech</h3>
        <ul>
          <li>Apple iPhone</li>
          <li>Samsung Phone</li>
        </ul>
      </div>
    </section>
  );
}
