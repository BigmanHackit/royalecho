import React from "react";
import MaxWidthWrapper from "../layout/MaxWidthWrapper";
import { EmblaCarousel } from "../shared/Carousel";
import ShinyText from "../ui/ShinyText";

export const HomeBilboard = () => {
  return (
    <MaxWidthWrapper className="my-8 w-full h-[50vh] bg-black py-2.5 rounded-lg flex md:gap-6 text-gray-100">
      <div className="w-full flex flex-col justify-center gap-2 text-center lg:text-left">
        <ShinyText
          text="Welcome to RoyalEcho Academy!"
          disabled={false}
          speed={3}
          className="custom-class font-extrabold text-[2.5em]"
        />
        <h2 className="text-[.88em]">
          Welcome to RoyalEcho Academy—where learning goes beyond the classroom!
          We don’t just teach tech; we make you practice and work with
          real-world projects. Join us and transform from a learner to a
          job-ready tech professional!{" "}
        </h2>
      </div>

      <EmblaCarousel className="hidden lg:block h-[90%] w-full my-auto">
        <div className="embla__slide flex items-center justify-center rounded-lg bg-gradient-to-br from-[#141E30] to-[#243B55]">
          <h1 className="font-extrabold text-5xl">
            <span className="text-red-">LEARN</span>
          </h1>
        </div>
        <div className="embla__slide flex items-center justify-center rounded-lg bg-gradient-to-br from-[#000428] to-[#004e92]">
          <h1 className="font-extrabold text-5xl">
            <span className="text-yellow-">PRACTICE</span>
          </h1>
        </div>
        <div className="embla__slide flex items-center justify-center rounded-lg bg-gradient-to-br from-[#2C3E50] to-[#4CA1AF]">
          <h1 className="font-extrabold text-5xl">
            <span className="text-green-">EARN</span>
          </h1>
        </div>
        <div className="embla__slide flex items-center justify-center rounded-lg bg-gradient-to-br from-[#cb2d3e] to-[#ef473a]">
          <h1 className="font-extrabold text-5xl">
            <span className="text-blue-">PERFECT</span>
          </h1>
        </div>
      </EmblaCarousel>
    </MaxWidthWrapper>
  );
};
