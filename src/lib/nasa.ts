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

export type NasaImageSearchParams = {
  q: string;
  page?: number;
  pageSize?: number;
};

export type NasaImage = {
  nasaId: string;
  title: string;
  description: string;
  dateCreated: string;
  thumbnailUrl: string;
  imageUrl: string;
};

export type NasaImageSearchResponse = {
  total: number;
  images: NasaImage[];
  page: number;
  hasNextPage: boolean;
};

type NasaImageLibraryLink = {
  href: string;
  rel?: string;
  render?: string;
};

type NasaImageLibraryItem = {
  data: Array<{
    nasa_id: string;
    title: string;
    description: string;
    date_created: string;
    media_type: string;
  }>;
  links?: NasaImageLibraryLink[];
};

type NasaImageLibrarySearchResponse = {
  collection: {
    metadata?: {
      total_hits?: number;
    };
    items?: NasaImageLibraryItem[];
    links?: Array<{
      rel?: string;
      href?: string;
    }>;
  };
};

const NASA_API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY ?? "DEMO_KEY";
const NASA_IMAGE_LIBRARY_URL = "https://images-api.nasa.gov/search";
export const NASA_IMAGE_SEARCH_PAGE_SIZE = 24;

function pickImageUrl(links: NasaImageLibraryLink[] = []): string {
  const byRel = (rel: string) => links.find((link) => link.rel === rel)?.href;
  const bySuffix = (suffix: string) =>
    links.find((link) => link.href.includes(suffix))?.href;

  return (
    byRel("canonical") ??
    bySuffix("~orig") ??
    bySuffix("~large") ??
    bySuffix("~medium") ??
    byRel("preview") ??
    bySuffix("~thumb") ??
    links[0]?.href ??
    ""
  );
}

function toNasaImage(item: NasaImageLibraryItem): NasaImage | null {
  const metadata = item.data[0];

  if (!metadata || metadata.media_type !== "image") {
    return null;
  }

  const links = item.links ?? [];
  const thumbnailUrl =
    links.find((link) => link.rel === "preview")?.href ??
    pickImageUrl(links);

  return {
    nasaId: metadata.nasa_id,
    title: metadata.title,
    description: metadata.description,
    dateCreated: metadata.date_created,
    thumbnailUrl,
    imageUrl: pickImageUrl(links),
  };
}

export async function fetchApod(): Promise<ApodResponse> {
  const { data } = await axios.get<ApodResponse>(
    "https://api.nasa.gov/planetary/apod",
    { params: { api_key: NASA_API_KEY } },
  );

  return data;
}

export async function searchNasaImages({
  q,
  page = 1,
  pageSize = NASA_IMAGE_SEARCH_PAGE_SIZE,
}: NasaImageSearchParams): Promise<NasaImageSearchResponse> {
  const { data } = await axios.get<NasaImageLibrarySearchResponse>(
    NASA_IMAGE_LIBRARY_URL,
    {
      params: {
        q,
        media_type: "image",
        page,
        page_size: pageSize,
      },
    },
  );

  const images = (data.collection.items ?? [])
    .map(toNasaImage)
    .filter((image): image is NasaImage => image !== null);

  return {
    total: data.collection.metadata?.total_hits ?? images.length,
    images,
    page,
    hasNextPage: data.collection.links?.some((link) => link.rel === "next") ?? false,
  };
}
