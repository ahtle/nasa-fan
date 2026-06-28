import { ApodCard } from "@/components/apod-card";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-4 py-12 font-sans dark:bg-black sm:px-6">
      <header className="mb-10 max-w-3xl text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          nasa-fan
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          NASA Fan
        </h1>
        <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          A Next.js starter with TypeScript and TanStack Query, powered by
          NASA&apos;s open APIs.
        </p>
      </header>

      <ApodCard />
    </div>
  );
}
