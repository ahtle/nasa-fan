"use client";

import { useState } from "react";
import { NasaImage, NasaImageSearchResponse } from "@/lib/nasa";
import { useCreateSearchFav } from "@/hooks/use-create-search-fav";
import { useSearchFavoriteIds } from "@/hooks/use-search-favorite-ids";
import ImageDetailModal from "./image-detail-modal";
import ResultCard from "./result-card";

export default function ResultGallery(props: NasaImageSearchResponse) {
  const [selectedImage, setSelectedImage] = useState<NasaImage | null>(null);
  const { mutate } = useCreateSearchFav();
  const { data: favoriteIdsData } = useSearchFavoriteIds();
  const favoriteIds = new Set(favoriteIdsData?.nasaIds ?? []);

  const createSearchFav = (payload: NasaImage) => {
    if (favoriteIds.has(payload.nasaId)) return;
    mutate(payload);
  };

  return (
    <>
      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
        {props.images.map((item, index) => (
          <ResultCard
            key={item.nasaId}
            priority={index === 0}
            filled={favoriteIds.has(item.nasaId)}
            onSelect={() => setSelectedImage(item)}
            onFavoriteClick={() => createSearchFav(item)}
            {...item}
          />
        ))}
      </div>

      {selectedImage ? (
        <ImageDetailModal
          image={selectedImage}
          open
          onClose={() => setSelectedImage(null)}
        />
      ) : null}
    </>
  );
}
