// src/app/(front)/contact/page.tsx
import Contact from "@/components/sections/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | DCC Programming Club",
  description: "Get in touch with the DCC Programming Club. We're here to answer your questions.",
};

export default function Page() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <Contact />
      </div>
    </div>
  );
}