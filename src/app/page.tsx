import { ApodCard } from "@/components/apod-card";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center gap-y-4 md:gap-y-8 pb-4 md:pb-8">
      <section
        className="flex justify-center w-full min-h-[40vh] bg-cover md:min-h-[50vh]
          p-4 md:p-8 text-white"
        style={{ backgroundImage: "url('/hero.png')" }}
      >
        <div className="page-w-container">
          <div className="w-[200px] md:w-[300px] p-2 md:p-4 bg-[#212121]">
            <p className="text-lg font-medium md:text-xl">
              A page for NASA fans. Explore the latest images and videos from
              NASA.
            </p>
          </div>
        </div>
      </section>
      <div className="page-container">
        <ApodCard />
      </div>
    </div>
  );
}
