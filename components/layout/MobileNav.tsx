import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
// import { NAVLINKS } from "@/config";
import Link from "next/link";
import Image from "next/image";

const MobileNav = () => {
  return (
    <section className="w-full max-w-[264px]">
      <Sheet >
        <SheetTrigger asChild>
          <Image src={"/icons/menu-1.svg"} alt="menu" width={25} height={0} />
        </SheetTrigger>
        <SheetContent
          side={"right"}
          className="border-none h-[50vh] w-[160px] stick top-64 right-3 rounded-3xl"
        >
          <SheetHeader>
            <SheetTitle>
              <Image
                src={"/icons/logo1.png"}
                alt={"logo"}
                width={120}
                height={100}
                aria-hidden
                className="absolute top-0 left-0 rounded-3xl"
              />
            </SheetTitle>
            <div className="w-full h-[calc(50vh-180px)] items-center relative top-[90px]">
              <SheetClose asChild>
                <section className="h-full flex flex-col justify-evenly items-center">
                  {/* {NAVLINKS.map((link) => (
                    <Link
                      href={link.href}
                      key={link.name}
                      className="flex gap-6 text-muted-foreground text-[20px] hover:underline hover:underline-offset-4 transition-all hover:text-[#122358]"
                    >
                      <p className="">{link.name}</p>
                    </Link>
                  ))} */}
                  <Link href='/courses' className="hover:bg-[#2C5364] hover:text-white px-6 py-3 rounded-xl">Courses</Link>
                </section>
              </SheetClose>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
