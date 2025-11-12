"use client";

import { usePathname } from "next/navigation";
import Navbar05Page from "@/components/navbar-05/navbar-05";
import Footer05Page from "@/components/footer-05/footer-05";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";
import Footer from "@/components/footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  NProgress.configure({ showSpinner: false });
  useEffect(() => {
    NProgress.start();
    const timer = setTimeout(() => NProgress.done(), 400); // smooth finish
    return () => clearTimeout(timer);
  }, [pathname]);

  const isApplicationRoute = pathname.startsWith("/app");

  if (isApplicationRoute) {
    return <>{children}</>;
  }

  // For all other routes, render with navbar and footer
  return (
    <>
      <Navbar05Page />
      {children}
    </>
  );
}
