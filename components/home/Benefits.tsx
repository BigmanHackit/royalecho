import React from "react";
import MaxWidthWrapper from "../layout/MaxWidthWrapper";
import Image from "next/image";

const Benefits = () => {
  return (
    <div>
      <MaxWidthWrapper className="flex flex-col-reverse lg:flex-row items-center gap-6 my-12 bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] rounded-lg p-6 text-gray-100">
        <div className="flex flex-col space-y-3 lg:space-y-8">
          <h1 className="text-xl lg:text-3xl font-bold">
            Unlock Your Potential with Our Comprehensive Learning Experience
          </h1>
          <p className="text-gray-300 text-sm lg:text-lg">
            Gain valuable skills while earning through real-world projects. Our
            flexible schedules allow you to learn at your own pace, fitting
            education into your busy life.
          </p>

          <div className="flex justify-between items-center pt-6">
            <div className="flex flex-col lg:gap-3 w-[45%]">
              <h1 className="text-lg lg:text-3xl font-bold">Earn</h1>
              <p className="text-gray-300 text-sm lg:text-lg">Hands-on projects to boost your resume.</p>
            </div>

            <div className="flex flex-col lg:gap-3 w-[45%]">
              <h1 className="text-lg lg:text-3xl font-bold">Flexibility</h1>
              <p className="text-gray-300 text-sm lg:text-lg">Learn anytime, anywhere with our online classes.</p>
            </div>
          </div>
        </div>

        <Image
          src="/coding-img.jpg"
          alt=""
          width={500}
          height={500}
          className=" object-cover w-full h-[200px] lg:h-[400px] rounded-lg lg:block md:block"
        />
      </MaxWidthWrapper>
    </div>
  );
};

export default Benefits;
