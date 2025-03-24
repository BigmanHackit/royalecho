import React from "react";
import MaxWidthWrapper from "../layout/MaxWidthWrapper";
import { ArrowRight, BoxIcon } from "lucide-react";
import Link from "next/link";
import EnrollmentButton from "../EnrollmentButton";

const Services = () => {
  return (
    <MaxWidthWrapper className="flex flex-col space-y-3 lg:space-y-8 my-24">
      <h3>Learn</h3>
      <h1 className=" text-xl lg:text-3xl font-bold">
        Explore Our Comprehensive Course Offerings
      </h1>
      <p className="text-muted-foreground">
        At our academy, we provide a diverse range of courses designed to equip
        students with essential tech skills. Each course is led by experienced
        instructors who guide you through both theory and practical
        applications.
      </p>

      <div className="flex flex-col gap-8 lg:flex-row lg:gap-4 lg:justify-center pt-6">
        <div className="flex flex-col space-y-3 lg:space-y-8">
          <BoxIcon />
          <h3 className="font-semibold lg:text-xl/loose">
            <span className="py-2 px-3 bg-[#2C5364] text-gray-200 font-bold border rounded-tr-lg rounded-bl-lg">
              Web Development
            </span>
            &nbsp; Build Your Future Online
          </h3>
          <p>Learn to create stunning websites from scratch.</p>
        </div>

        <div className="flex flex-col space-y-3 lg:space-y-8">
          <BoxIcon />
          <h3 className="font-semibold lg:text-xl/loose">
            <span className="py-2 px-3 bg-[#2C5364] text-gray-200 font-bold border rounded-tr-lg rounded-bl-lg">
              Data Science
            </span>
            &nbsp; Unlock the Power of Data
          </h3>
          <p>Transform raw data into actionable insights.</p>
        </div>

        <div className="flex flex-col space-y-3 lg:space-y-6">
          <BoxIcon />
          <h3 className="font-semibold lg:text-xl/loose">
            <span className="py-2 px-3 bg-[#2C5364] text-gray-200 font-bold border rounded-tr-lg rounded-bl-lg">
              Digital Marketing
            </span>
            &nbsp; Master the Online Landscape
          </h3>
          <p>Learn strategies to effectively promote brands online.</p>
        </div>
      </div>

      <div className="flex gap-3 items-center pt-6">
        <EnrollmentButton className="" />
        <Link href="/about" className="flex gap-2 hover:underline">
          <p>Learn More</p>
          <ArrowRight />
        </Link>
      </div>
    </MaxWidthWrapper>
  );
};

export default Services;
