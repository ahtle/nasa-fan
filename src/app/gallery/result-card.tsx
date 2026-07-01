"use client";

import { NasaImage } from "@/lib/nasa";
import Image from "next/image";

interface ResultCardProps extends NasaImage {
  priority?: boolean;
  onSelect: () => void;
}

export default function ResultCard({
  priority = false,
  onSelect,
  ...props
}: ResultCardProps) {
  return (
    <article className="w-full min-w-0 overflow-hidden rounded border border-zinc-200 bg-white shadow-sm">
      <div className="gap-2 p-3">
        <button
          type="button"
          onClick={onSelect}
          className="cursor-pointer text-left text-nasa-blue hover:underline"
        >
          {props.title}
        </button>
        <p className="text-sm text-zinc-500">{props.dateCreated}</p>
      </div>
      <div className="relative h-[300px] w-full">
        <Image
          src={props.thumbnailUrl}
          alt={props.title}
          fill
          priority={priority}
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        />
      </div>
      <div className="p-3">
        <p className="max-h-[150px] line-clamp-7 text-sm leading-[21px] text-zinc-600">
          {props.description}
        </p>
      </div>
    </article>
  );
}
