import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import MobileNav from "./MobileNav";
import { NavigationItemsMenu } from "./NavigationMenu";
import Image from "next/image";

const NavBar = async () => {
  return (
    <div className="sticky z-50 top-0 inset-x-0 h-16 bg-[#eefaed]">
      <header className="relative">
        <MaxWidthWrapper className="">
            <div className="flex h-16 items-center">
              <div className="flex lg:ml-o">
                <Link href={"/"} className="flex items-center gap-1">
                <Image
                src={'/icons/logo.jpeg'}
                alt="logo"
                width={50}
                height={50}
                className="object-cover"
                />
                <div className="flex flex-col">
                  <h1 className="font-extrabold text-sm text-[#171c56]">RoyalEcho</h1>
                  <h2 className="text-muted-foreground font-bold text-xs">Academy</h2>
                </div>
                </Link>
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                 <NavigationItemsMenu />

                  <div className="ml-4 flow-root lg:ml-6">

                  </div>
                </div>
                    <div className="lg:hidden">
                      <MobileNav />
                    </div>
              </div>
            </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default NavBar;
