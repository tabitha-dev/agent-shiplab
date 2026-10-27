import type { Metadata } from "next";
import "./globals.css";
export const metadata:Metadata={
  title:"ShipLab | Build. Review. Ship.",
  description:"An open-source full-stack app for testing AI coding agents on real workflows.",
  openGraph:{title:"ShipLab — Agent coding stress test",description:"Build, review, and verify real agent-generated changes.",type:"website"}
};
export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en"><body>{children}</body></html>;
}
