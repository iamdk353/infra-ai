import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { Search } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../ThemeToggle";

const Navbar05Page = () => {
  return (
    <div className=" relative z-100">
      <nav className="fixed top-6 inset-x-4 h-16 bg-background border dark:border-slate-700/70 max-w-screen-xl mx-auto rounded-full">
        <div className="h-full flex items-center justify-between mx-auto px-4">
          <div className="flex items-center gap-2 md:gap-6">
            <Logo className="shrink-0" />

            <div className="relative hidden md:block"></div>
          </div>

          <div className="flex items-center gap-2 ">
            <Link href={"/signup"}>
              <Button
                variant="outline"
                className="hidden sm:inline-flex rounded-full"
              >
                Sign Up
              </Button>
            </Link>
            <ModeToggle />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar05Page;
