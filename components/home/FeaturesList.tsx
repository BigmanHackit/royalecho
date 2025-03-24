import React from "react";
import MaxWidthWrapper from "../layout/MaxWidthWrapper";
// import Link from "next/link";
import {  CheckCircle } from "lucide-react";
import EnrollmentButton from "../EnrollmentButton";

const Invite = () => {
  return (
    <MaxWidthWrapper className="py-6 px-4 text-center">
      <h3 className="font-medium text-lg lg:text-center md:text-center mb-8">
        Empower
      </h3>
      <h1 className="font-bold text-xl lg:text-3xl lg:text-center md:text-center">
        Unlock Your Potential with Our Features
      </h1>
      <p className="my-8 text-sm lg:text-lg">
        Experience a transformative learning journey with our innovative
        features. We provide the tools and support you need to succeed in the
        tech world.
      </p>
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-4 lg:justify-center">
        <div className="flex flex-col gap-3">
          <CheckCircle className="mx-auto" />
          <h3 className="font-semibold text-lg lg:text-xl">
            Engaging Live Classes for Real-Time Learning
          </h3>
          <p className="text-muted-foreground text-sm lg:text-lg">
            Join our interactive live classes and learn directly from experts.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <CheckCircle className="mx-auto" />
          <h3 className="font-semibold text-lg lg:text-xl">
            Learn from Experienced and Qualified Instructors
          </h3>
          <p className="text-muted-foreground text-sm lg:text-lg">
            Our teachers bring industry expertise to your education.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <CheckCircle className="mx-auto" />
          <h3 className="font-semibold text-lg lg:text-xl">
            Work on Real-Life Projects to Gain Experience
          </h3>
          <p className="text-muted-foreground text-sm lg:text-lg">
            Apply your skills in practical projects that matter.
          </p>
        </div>
        {/* <p className="flex gap-6 lg:gap-1"><span className="text-green-500"><CheckCircle /></span> All classes recorded *</p>
      <p className="flex gap-6 lg:gap-1"><span className="text-green-500"><CheckCircle /></span> 24/7 accessible teachers *</p>
      <p className="flex gap-6 lg:gap-1"><span className="text-green-500"><CheckCircle /></span> Flexible hours and compact classes*</p> */}
      </div>
      <div className="w-1/2 flex gap-3 mx-auto items-center m-12 justify-center">
        <EnrollmentButton className="" />
        {/* <Link href="/about" className="flex gap-2 hover:underline">
          Learn More <ArrowRight />
        </Link> */}
      </div>
    </MaxWidthWrapper>
  );
};

export default Invite;
