"use client";

import { usePathname } from "next/navigation";
import Navbar05Page from "@/components/navbar-05/navbar-05";
import Footer05Page from "@/components/footer-05/footer-05";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isApplicationRoute = pathname.startsWith("/app");

  if (isApplicationRoute) {
    return <>{children}</>;
  }

  // For all other routes, render with navbar and footer
  return (
    <>
      <Navbar05Page />
      {children}
      <Footer05Page />
    </>
  );
}
