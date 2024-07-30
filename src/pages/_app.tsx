import { DocSearchProvider, LayoutProvider } from "@/providers";
import { DocSearch } from "@/utils/types";

//import NextApp, { AppContext, AppInitialProps } from "next/app";
import type { AppProps } from "next/app";
import Head from "next/head";

import "@docsearch/css";
import "@milkdown/theme-nord/style.css";
import "@/styles/globals.css";
import "@/styles/docsearch.css";
import "@/styles/prosemirror.css";
import "@/styles/prose.css";
import "@/styles/playground.css";
import "@/styles/toast.css";
import "@/styles/liquid.css";
import "@/styles/prism-nord.css";
import "@/styles/font.css";
import "@/styles/gfont.css";
import "@/styles/katex.css";

import { useRouter } from "next/router";
import clsx from "clsx";

export default function App({
  Component,
  pageProps,
}: AppProps<{ docSearch: DocSearch }>) {
  const router = useRouter();
  const pathname = router.pathname;
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <DocSearchProvider docSearch={pageProps.docSearch}>
        <LayoutProvider>
          <main className={clsx("flex-grow", pathname !== "/")}>
            <Component {...pageProps} />
          </main>
        </LayoutProvider>
      </DocSearchProvider>
    </>
  );
}