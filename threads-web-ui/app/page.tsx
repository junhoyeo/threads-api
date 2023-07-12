"use client";
import { AppProps } from "next/app";
import { GlobalStyle } from "@/components/GlobalStyle";
import "./globals.css";

export default function Home({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <div className="flex flex-col items-center">
        <header className="flex flex-col gap-5 pt-[64px] pb-12 px-4 items-center rounded-3xl">
          <h1 className="text-6xl font-black tracking-tight text-center">
            Making Threads <br />
            Work in Code
          </h1>
          <p className="text-slate-400">
            Unofficial, Reverse-Engineered Clients for Threads.
          </p>
        </header>

        <div className="bg-[rgba(243,245,247,0.15)] w-[200px] h-[200px] rounded-[30px]"></div>
      </div>
    </>
  );
}
