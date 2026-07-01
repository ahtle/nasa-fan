import ResultCard from "./result-card";
import { NasaImageSearchResponse } from "@/lib/nasa";

export default function ResultGallery(props: NasaImageSearchResponse) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
      {props.images.map((item, index) => (
        <ResultCard key={item.nasaId} priority={index === 0} {...item} />
      ))}
    </div>
  );
}
