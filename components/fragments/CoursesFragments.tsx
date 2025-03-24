import React from "react";
import Courses from "../courses/Courses";
import { EmblaCarousel } from "../shared/Carousel";

const CoursesFragments = () => {
  return (
    <>
      <EmblaCarousel className="h-[30vh]">
        <div className="embla__slide flex flex-col gap-1 py-8 px-12 text-center text-white items-center justify-center rounded-lg bg-gradient-to-br from-[#141E30] to-[#243B55]">
          <h1 className="font-bold text-xl">Level Up Your Tech Skills!</h1>
          <p className="text-lg">
            Master the latest in Web Development, Data Analytics, and more with
            hands-on training.
          </p>
        </div>

        <div className="embla__slide flex flex-col gap-1 py-8 px-12 text-center text-white items-center justify-center rounded-lg bg-gradient-to-br from-[#000428] to-[#004e92]">
          <h1 className="font-bold text-xl">Turn Your Ideas into Reality!</h1>
          <p className="text-lg">
            Learn Python, Forex, and Mobile Development with expert instructors
            guiding you every step of the way.
          </p>
        </div>

        <div className="embla__slide flex flex-col gap-1 py-8 px-12 text-center text-white items-center justify-center rounded-lg bg-gradient-to-br from-[#2C3E50] to-[#4CA1AF]">
          <h1 className="font-bold text-xl">From Beginner to Pro!</h1>
          <p className="text-lg text-center">
            No experience? No problem! Our courses are designed to take you from
            zero to industry-ready. Learn, Build, and Succeed! Practical,
            project-based learning to help you stand out in the tech world.
          </p>
        </div>

        <div className="embla__slide flex flex-col gap-1 py-8 px-12 text-center text-white items-center justify-center rounded-lg bg-gradient-to-br from-[#442225] to-[#ca1104]">
          <h1 className="font-bold text-xl">
            Join a Global Tech Community, and Future-Proof Your Career!
          </h1>
          <p className="text-lg text-center">
            Network with like-minded learners and industry professionals. Stay ahead with in-demand skills in AI, Web3,
            and more.
          </p>
        </div>

        <div className="embla__slide flex flex-col gap-1 py-8 px-12 text-center text-white items-center justify-center rounded-lg bg-gradient-to-br from-[#141730] to-[#073de1]">
          <h1 className="font-bold text-xl">
            Learn at Your Own Pace and Get Hands-On, Job-Ready Training!
          </h1>
          <p className="text-lg">
            Flexible online classes designed to fit your schedule. Gain
            real-world experience and build a portfolio that employers love.
          </p>
        </div>

        <div className="embla__slide flex flex-col gap-1 py-8 px-12 text-center text-white items-center justify-center rounded-lg bg-gradient-to-br from-[#143019] to-[#07e149]">
          <h1 className="font-bold text-xl">
          Enroll Today & Start Building!
          </h1>
          <p className="text-lg">
          Your tech journey begins now—don’t wait, let’s get started!
          </p>
        </div>
      </EmblaCarousel>
      <Courses />
    </>
  );
};

export default CoursesFragments;
