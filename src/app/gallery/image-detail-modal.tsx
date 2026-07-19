"use client";

import Image from "next/image";
import ButtonStar from "@/components/buttons/button-star";
import BaseModal from "@/components/modal/base-modal";
import { NasaImage } from "@/lib/nasa";

interface ImageDetailModalProps {
  image: NasaImage;
  open: boolean;
  onClose: () => void;
}

function formatDateCreated(dateCreated: string): string {
  const date = new Date(dateCreated);

  if (Number.isNaN(date.getTime())) {
    return dateCreated;
  }

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ImageDetailModal({
  image,
  open,
  onClose,
}: ImageDetailModalProps) {
  const imageSrc = image.imageUrl || image.thumbnailUrl;

  return (
    <BaseModal open={open} onClose={onClose} title={image.title}>
      <div className="space-y-4">
        {imageSrc ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-zinc-100">
            <Image
              src={imageSrc}
              alt={image.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 672px"
            />
            <ButtonStar className="absolute top-2 right-2 bg-white/90 shadow-sm hover:bg-white" />
          </div>
        ) : (
          <div className="flex justify-end">
            <ButtonStar />
          </div>
        )}

        <dl className="space-y-3 text-sm">
          <div>
            <dt className="font-medium text-zinc-900">NASA ID</dt>
            <dd className="text-zinc-600">{image.nasaId}</dd>
          </div>
          <div>
            <dt className="font-medium text-zinc-900">Date created</dt>
            <dd className="text-zinc-600">
              {formatDateCreated(image.dateCreated)}
            </dd>
          </div>
          {image.description ? (
            <div>
              <dt className="font-medium text-zinc-900">Description</dt>
              <dd className="leading-6 text-zinc-600">{image.description}</dd>
            </div>
          ) : null}
        </dl>
      </div>
    </BaseModal>
  );
}
