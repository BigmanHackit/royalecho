"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";

export function EmblaCarousel({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000 }),
  ]);

  return (
    <div className={cn("embla w-full", className)} ref={emblaRef}>
      <div className="embla__container h-full">{children}</div>
    </div>
  );
}
