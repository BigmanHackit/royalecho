import React from "react";
import MaxWidthWrapper from "../layout/MaxWidthWrapper";
// import { ArrowRight, BoxIcon } from "lucide-react";
// import Link from "next/link";
import EnrollmentButton from "../EnrollmentButton";
import { BoxIcon } from "lucide-react";

// Define interface for service data
interface Service {
  title: string;
  subtitle: string;
  description: string;
}

const ServiceCard: React.FC<Service> = ({ 
  title, 
  subtitle, 
  description 
}) => (
  <div className="flex flex-col space-y-4 text-center md:text-left items-center md:items-start bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-all duration-300 group">
    <div className="bg-primary/10 p-3 rounded-full mb-2">
      <BoxIcon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
    </div>
    <h3 className="font-semibold text-lg md:text-xl">
      <span className="py-1 px-2 bg-[#2C5364] text-gray-200 font-bold border rounded-tr-lg rounded-bl-lg">
        {title}
      </span>
      &nbsp; {subtitle}
    </h3>
    <p className="text-sm md:text-base text-muted-foreground text-center md:text-left">
      {description}
    </p>
  </div>
);

const Services: React.FC = () => {
  const services: Service[] = [
    {
      title: "Web Development",
      subtitle: "Build Your Future Online",
      description: "Learn to create stunning websites from scratch."
    },
    {
      title: "Data Science",
      subtitle: "Unlock the Power of Data",
      description: "Transform raw data into actionable insights."
    },
    {
      title: "Digital Marketing",
      subtitle: "Master the Online Landscape",
      description: "Learn strategies to effectively promote brands online."
    }
  ];

  return (
    <MaxWidthWrapper className="py-12 md:py-24">
      <div className="text-center md:text-left space-y-4 md:space-y-6 mb-12">
        <h3 className="text-sm md:text-base text-primary font-medium tracking-wide">
          Our Expertise
        </h3>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
          Explore Our Comprehensive Course Offerings
        </h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-3xl mx-auto md:mx-0">
          At our academy, we provide a diverse range of courses designed to equip
          students with essential tech skills. Each course is led by experienced
          instructors who guide you through both theory and practical
          applications.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
        {services.map((service, index) => (
          <ServiceCard 
            key={index} 
            {...service}
          />
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center">
        <EnrollmentButton className="w-full md:w-auto" />
        {/* <Link 
          href="/about" 
          className="flex gap-2 hover:underline items-center justify-center w-full md:w-auto text-primary hover:text-primary/80 transition-colors"
        >
          <p>Learn More</p>
          <ArrowRight className="w-5 h-5" />
        </Link> */}
      </div>
    </MaxWidthWrapper>
  );
};

export default Services;