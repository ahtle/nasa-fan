import ResultCard from "./result-card";
import { NasaImageSearchResponse } from "@/lib/nasa";

export default function ResultGallery(props: NasaImageSearchResponse) {
  return (
    <div>
      {props.images.map((item) => (
        <ResultCard key={item.nasaId} {...item} />
      ))}
    </div>
  );
}
