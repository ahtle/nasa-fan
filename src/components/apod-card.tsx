"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { fetchApod } from "@/lib/nasa";

export function ApodCard() {
  const { data, isPending, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["apod"],
    queryFn: fetchApod,
  });

  if (isPending) {
    return (
      <div className="w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <p className="text-zinc-500 dark:text-zinc-400">Loading today&apos;s APOD…</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full max-w-3xl rounded-2xl border border-red-200 bg-red-50 p-8 dark:border-red-900 dark:bg-red-950/30">
        <p className="font-medium text-red-700 dark:text-red-300">
          Failed to load APOD
        </p>
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          {error.message}
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <article className="w-full max-w-3xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      {data.media_type === "image" ? (
        <div className="relative aspect-video w-full bg-zinc-100 dark:bg-zinc-900">
          <Image
            src={data.hdurl ?? data.url}
            alt={data.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>
      ) : (
        <div className="aspect-video w-full bg-black">
          <iframe
            src={data.url}
            title={data.title}
            className="h-full w-full"
            allowFullScreen
          />
        </div>
      )}

      <div className="space-y-4 p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-medium uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
            Astronomy Picture of the Day
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{data.date}</p>
        </div>

        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {data.title}
        </h2>

        {data.copyright && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            © {data.copyright}
          </p>
        )}

        <p className="leading-7 text-zinc-600 dark:text-zinc-300">
          {data.explanation}
        </p>

        {isFetching && (
          <p className="text-sm text-zinc-400">Refreshing…</p>
        )}
      </div>
    </article>
  );
}
