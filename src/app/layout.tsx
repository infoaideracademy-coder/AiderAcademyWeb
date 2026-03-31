import type { Metadata } from "next";
import AppShell from "@/components/AppShell/AppShell";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Aider Academy | Practical Career Training for Digital Roles",
  description: "Join Aider Academy for mentor-led, project-driven training in Graphic Design, Digital Marketing, and Web Development. Build real skills, a professional portfolio, and get job-ready with our GCC-centric curriculum.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
