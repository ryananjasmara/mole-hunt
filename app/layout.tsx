import type { Metadata } from "next";
import "./globals.css";
import ClientWrapper from './components/layout/wrapper';

export const metadata: Metadata = {
  title: "Mole Hunter",
  description: "Mole Hunter is a game where you click on moles to earn points. The game is easy to play and fun to challenge your friends.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
