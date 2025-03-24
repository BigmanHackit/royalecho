import React from "react";
import MaxWidthWrapper from "../layout/MaxWidthWrapper";
import { EmblaCarousel } from "./Carousel";
import Image from "next/image";
import { TESTIMONIALS } from "@/lib/testimonials";

const Testimonials = () => {
  return (
    <MaxWidthWrapper className="my-24">
      <EmblaCarousel>
        {TESTIMONIALS.map((testimonial) => (
          <div
            key={testimonial.id}
            className="embla__slide flex flex-col items-center gap-6 bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] rounded-lg text-gray-100 py-3 lg:py-6"
          >
            <h2 className="text-center px-3 pt-6">
              &quot;{testimonial.content}&quot;
            </h2>
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              width={40}
              height={40}
              className="rounded-full"
            />

            <div className="text-center">
              <h3 className="font-semibold">{testimonial.name}</h3>
              <p className="text-xs">{testimonial.major}</p>
            </div>
          </div>
        ))}
      </EmblaCarousel>
    </MaxWidthWrapper>
  );
};

export default Testimonials;
