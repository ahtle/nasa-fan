"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import ButtonBase from "@/components/buttons/button-base";
import { fetchApod } from "@/lib/nasa";

export function ApodCard() {
  const { data, isPending, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["apod"],
    queryFn: fetchApod,
  });

  if (isPending) {
    return (
      <div className="w-full min-w-0 max-w-3xl rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <p className="text-zinc-500">Loading today&apos;s APOD…</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full min-w-0 max-w-3xl rounded-2xl border border-red-200 bg-red-50 p-8">
        <p className="font-medium text-red-700">Failed to load APOD</p>
        <p className="mt-2 text-sm text-red-600">{error.message}</p>
        <ButtonBase
          variant="destructive"
          className="mt-4"
          onClick={() => refetch()}
        >
          Try again
        </ButtonBase>
      </div>
    );
  }

  return (
    <article className="w-full min-w-0 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 md:p-4">
        <h3 className="min-w-0 text-sm font-medium uppercase tracking-wide text-nasa-blue">
          Astronomy Picture of the Day
        </h3>
        <p className="text-sm text-zinc-500">{data.date}</p>
      </div>

      {data.media_type === "image" ? (
        <div className="relative aspect-video w-full bg-zinc-100">
          <Image
            src={data.url}
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
        <h2 className="text-2xl font-semibold tracking-tight wrap-break-word text-zinc-900">
          {data.title}
        </h2>

        {data.copyright && (
          <p className="text-sm text-zinc-500">© {data.copyright}</p>
        )}

        <p className="leading-7 wrap-break-word text-zinc-600">{data.explanation}</p>

        {isFetching && <p className="text-sm text-zinc-400">Refreshing…</p>}
      </div>
    </article>
  );
}
