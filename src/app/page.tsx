"use client";

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#03142A] text-[#FFFCCF]">
      <div
        className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-[#FFFCCF]/10 blur-[140px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#FFFCCF]/5 blur-[160px]"
        aria-hidden
      />
      <main className="relative mx-auto flex max-w-6xl flex-col gap-20 px-6 pb-24 pt-12 sm:px-10">
        <section className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden rounded-[32px] border border-[#FFFCCF]/10 bg-gradient-to-br from-[#03142A] via-[#071F41] to-[#03142A] p-12 sm:p-16">
          <div className="flex flex-col items-center gap-8">
            <Image
              src="/sola-icon.png"
              alt="灵悟咨询 Logo"
              width={120}
              height={120}
              className="h-32 w-32 rounded-2xl object-contain sm:h-40 sm:w-40"
            />
            <h1 className="text-5xl font-semibold tracking-wide text-[#FFFCCF] sm:text-6xl lg:text-7xl">
              灵悟咨询 v1.0
            </h1>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="https://chat.sola.xin/"
                className="rounded-full bg-[#FFFCCF] px-10 py-4 text-center text-lg font-semibold text-[#03142A] transition hover:bg-[#F6F0B3]"
              >
                患者入口
              </Link>
              <Link
                href="https://chat.sola.xin/"
                className="rounded-full border-2 border-[#FFFCCF] bg-transparent px-10 py-4 text-center text-lg font-semibold text-[#FFFCCF] transition hover:bg-[#FFFCCF]/10"
              >
                医生入口
              </Link>
            </div>
          </div>
        </section>

      </main>

      <footer className="relative border-t border-[#FFFCCF]/10 bg-[#03142A] px-6 py-12 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8">
            <div>
              <h3 className="text-lg font-semibold text-[#FFFCCF]">法律信息</h3>
              <div className="mt-4 space-y-2 text-sm text-[#FFFCCF]/80">
                <p>
                  <Link href="/privacy" className="underline-offset-4 hover:underline">
                    隐私声明
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-[#FFFCCF]/10 pt-8 text-center text-sm text-[#FFFCCF]/60">
            <p>© {new Date().getFullYear()} 灵悟心愈. 保留所有权利。</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
