"use client";

import Image from "next/image";
import styles from "./page.module.css";
import BoxButton from "@/components/common/BoxButton";

export default function Home() {
  return (
    <main className={styles.main}>
      <div style={{ display: "flex" }}>
        <div>
          <BoxButton
            buttonType={"primary"}
            buttonHeight={"32"}
            contentPosition=""
            icon="/black.svg"
            disabled={"able"}
          />

          <BoxButton
            buttonType={"default"}
            buttonHeight={"32"}
            buttonText="default"
            contentPosition=""
            icon="/black.svg"
            disabled={"able"}
          />

          <BoxButton
            buttonType={"outline"}
            buttonHeight={"40"}
            buttonText="outline"
            contentPosition="before"
            icon="/black.svg"
            disabled={"able"}
          />

          <BoxButton
            borderType={"circle"}
            buttonType={"dangerPrimary"}
            buttonHeight={"52"}
            contentPosition="after"
            icon="/white.svg"
            disabled={"able"}
          />

          <BoxButton
            borderType={"circle"}
            buttonType={"dangerSecondary"}
            buttonHeight={"52"}
            buttonText="dangerSecondary"
            contentPosition="after"
            icon="/red.svg"
            disabled={"able"}
          />
        </div>{" "}
        <div>
          <BoxButton
            buttonType={"primary"}
            buttonHeight={"32"}
            contentPosition=""
            icon="/black.svg"
            disabled={"disable"}
          />

          <BoxButton
            buttonType={"default"}
            buttonHeight={"32"}
            buttonText="default"
            contentPosition=""
            icon="/black.svg"
            disabled={"disable"}
          />

          <BoxButton
            buttonType={"outline"}
            buttonHeight={"40"}
            buttonText="outline"
            contentPosition="before"
            icon="/black.svg"
            disabled={"disable"}
          />

          <BoxButton
            borderType={"circle"}
            buttonType={"dangerPrimary"}
            buttonHeight={"52"}
            contentPosition="after"
            icon="/white.svg"
            disabled={"disable"}
          />

          <BoxButton
            borderType={"circle"}
            buttonType={"dangerSecondary"}
            buttonHeight={"52"}
            buttonText="dangerSecondary"
            contentPosition="after"
            icon="/red.svg"
            disabled={"disable"}
          />
        </div>
      </div>

      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
