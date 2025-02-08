import React from "react";
import MaxWidthWrapper from "../layout/MaxWidthWrapper";
import { CheckCircle } from "lucide-react";

const Invite = () => {
  return (
    <MaxWidthWrapper className="bg-gradient-to-b from-stone-50 to-stone-200 py-6 px-4 rounded border">
      <h1 className="font-bold text-3xl lg:text-center md:text-center">
        Apply for the course you've dreamed of for long
      </h1>
      <hr className="w-1/2 mx-auto border-2 rounded-full border-[#687619] mt-1" />
      <p className="my-8">
        Whether you want to learn fundamental skills, boost your career with an
        international certification, or change your career, we have the right
        program for you.
      </p>
      <div className="flex flex-col gap-2 lg:flex-row lg:gap-4 lg:justify-center">
      <p className="flex gap-6 lg:gap-1"><span className="text-green-500"><CheckCircle /></span> 3 months</p>
      <p className="flex gap-6 lg:gap-1"><span className="text-green-500"><CheckCircle /></span> Live classes</p>
      <p className="flex gap-6 lg:gap-1"><span className="text-green-500"><CheckCircle /></span> Online</p>
      <p className="flex gap-6 lg:gap-1"><span className="text-green-500"><CheckCircle /></span> All classes recorded *</p>
      <p className="flex gap-6 lg:gap-1"><span className="text-green-500"><CheckCircle /></span> 24/7 accessible teachers *</p>
      <p className="flex gap-6 lg:gap-1"><span className="text-green-500"><CheckCircle /></span> Flexible hours and compact classes*</p>
      </div>
    </MaxWidthWrapper>
  );
};

export default Invite;
