import React from "react";
import Courses from "../courses/Courses";
import { EmblaCarousel } from "../shared/Carousel";

const CoursesFragments = () => {
  return (
    <>
      <EmblaCarousel className="h-[30vh]">
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
      <Courses />
    </>
  );
};

export default CoursesFragments;
