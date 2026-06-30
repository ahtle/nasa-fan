import { NasaImage } from "@/lib/nasa";

export default function ResultCard(props: NasaImage) {
  return (
    <div>
      <div>
        <p>{props.title}</p>
        <p>{props.dateCreated}</p>
      </div>
    </div>
  );
}

// {
//   dateCreated: "2009-09-24T18:00:22Z"
//   description: "Nearside of the Moon"
//   imageUrl: "https://images-assets.nasa.gov/image/PIA12235/PIA12235~orig.jpg"​​​
//   nasaId: "PIA12235"
//   thumbnailUrl: "https://images-assets.nasa.gov/image/PIA12235/PIA12235~thumb.jpg"
//   title: "Nearside of the Moon"
// }
