import axios from "axios";

export type ApodResponse = {
  date: string;
  title: string;
  explanation: string;
  media_type: "image" | "video";
  url: string;
  hdurl?: string;
  copyright?: string;
};

const NASA_API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY ?? "DEMO_KEY";

export async function fetchApod(): Promise<ApodResponse> {
  const { data } = await axios.get<ApodResponse>(
    "https://api.nasa.gov/planetary/apod",
    { params: { api_key: NASA_API_KEY } },
  );

  return data;
}
