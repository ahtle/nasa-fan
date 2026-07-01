"use client";

import { useState } from "react";
import { NasaImage, NasaImageSearchResponse } from "@/lib/nasa";
import ImageDetailModal from "./image-detail-modal";
import ResultCard from "./result-card";

export default function ResultGallery(props: NasaImageSearchResponse) {
  const [selectedImage, setSelectedImage] = useState<NasaImage | null>(null);

  return (
    <>
      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
        {props.images.map((item, index) => (
          <ResultCard
            key={item.nasaId}
            priority={index === 0}
            onSelect={() => setSelectedImage(item)}
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
