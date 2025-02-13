import { ModeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { GithubIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";
import { SheetLeftbar } from "./leftbar";
import Search from "./search";
import { Badge } from "./ui/badge";
import { buttonVariants } from "./ui/button";

export function Navbar() {
  return (
    <nav className='sticky px-4 top-0 z-50 w-full h-16 border-b bg-background'>
      <div className='h-full flex items-center justify-between md:gap-2'>
        <div className='flex items-center gap-5'>
          <SheetLeftbar />
          <div className='flex items-center gap-6'>
            <div className='hidden sm:flex'>
              <Logo />
            </div>
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <div className='flex items-center gap-2'>
            <Search />
            <div className='flex ml-2.5 sm:ml-0'>
              <Link
                href='https://github.com/zerK4/efri'
                className={buttonVariants({ variant: "ghost", size: "icon" })}
              >
                <GithubIcon className='h-[1.1rem] w-[1.1rem]' />
              </Link>
              <Link
                href='https://x.com/s_pav3l'
                className={buttonVariants({
                  variant: "ghost",
                  size: "icon",
                })}
              >
                <TwitterIcon className='h-[1.1rem] w-[1.1rem]' />
              </Link>
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export function Logo() {
  return (
    <Link href='/' className='flex items-center gap-2.5'>
      <h2 className={cn("text-md font-bold font-code flex items-center gap-2")}>
        <Badge className='py-2 px-4 rounded-lg' variant={"outline"}>
          efri
        </Badge>
      </h2>
    </Link>
  );
}
