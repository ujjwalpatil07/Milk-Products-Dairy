import ProductProcess from "../components/ProductProcess";
import dairyImage from "../assets/dairyImage.png";
import { aboutUs } from "../data/productGoodness ";
import AboutCard from "../components/AboutComponents/AboutCard";

export default function AboutPage() {
  return (
    <>
      <section
        className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px] overflow-hidden"
      >
        <img
          src={dairyImage}
          alt="About Us"
          className="w-full h-full object-cover"
        />
      </section>

      <section className="py-16 px-3 md:px-20 space-y-10">
        <div
          className="text-center flex flex-col mb-10"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-wide">
            WHO WE ARE?
          </h2>

          <div className="flex items-center gap-3 mt-2 mx-auto">
            <div className="w-10 h-[4px] rounded-sm dark:bg-white bg-black"></div>
            <div className="w-4 h-4 dark:bg-white rotate-45 bg-black rounded-sm"></div>
            <div className="w-10 h-[4px] rounded-sm dark:bg-white bg-black"></div>
          </div>
        </div>

        {aboutUs.map((card, index) => (
          <AboutCard key={index * 0.8} {...card} reverse={index % 2 === 0} />
        ))}
      </section>

      <ProductProcess />
    </>
  );
}
