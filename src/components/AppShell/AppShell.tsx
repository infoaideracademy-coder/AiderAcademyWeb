"use client";

import { usePathname } from "next/navigation";
import GlobalExperienceLayer from "@/components/AppShell/GlobalExperienceLayer";
import SiteHeader from "@/components/ContactComponents/SiteHeader/SiteHeader";
import Footer from "@/components/Footer/Footer";

type AppShellProps = {
  children: React.ReactNode;
};

const AppShell = ({ children }: AppShellProps) => {
  const pathname = usePathname();
  const isStudio = pathname.startsWith("/studio");

  return (
    <GlobalExperienceLayer enabled={!isStudio}>
      {!isStudio && <SiteHeader />}
      {children}
      {!isStudio && <Footer />}
    </GlobalExperienceLayer>
  );
};

export default AppShell;
