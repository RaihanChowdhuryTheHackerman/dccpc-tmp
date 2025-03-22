// src/components/footer.tsx
import Image from "next/image";
import Logo from "@/static/img/logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-white py-10">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col items-center justify-center">
          {/* Add a white circular background for the logo */}
          <div className="bg-white p-2 rounded-full mb-4">
            <Image
              src={Logo}
              className="w-[80px]"
              alt="DCC Programming Club Logo"
            />
          </div>
          <h2 className="font-bold text-2xl mb-2">DCC Programming Club</h2>
          <p className="text-sm text-center w-full">&copy; {currentYear} DCC Programming Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}