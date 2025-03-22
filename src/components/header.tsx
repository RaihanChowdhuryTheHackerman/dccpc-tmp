// src/components/header.tsx
'use client'

import Link from "next/link";
import Image from "next/image";
import Logo from "@/static/img/logo-cropped.png";
import { Button } from "@/components/ui/button";
import SideNav from "@/components/side-nav";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react"; // Import the Users icon

interface Link {
  url: string;
  name: string;
  icon?: JSX.Element,
  isActive?: boolean
}

const links: Link[] = [
  { name: "Home", url: "/" },
  { name: "Notice", url: "/notices" },
  { name: "Events", url: "/events" },
  { name: "Gallery", url: "/gallery" },
  { name: "Panel", url: "/panel" },
  { name: "About", url: "/about" },
  { name: "Contact", url: "/contact" },
];

export default function Header() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  useEffect(() => {
    setActiveLink(path);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [path]);

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 shadow-md backdrop-blur supports-[backdrop-filter]:bg-white/50" : "bg-white"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-3 px-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="md:hidden">
            <SideNav links={links} />
          </div>
          
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Image
                src={Logo}
                width={45}
                height={45}
                alt="DCC Programming Club Logo"
                className="drop-shadow-sm"
              />
            </motion.div>
            
            <span className="hidden md:block text-lg font-bold text-primary transition-colors">
              DCC Programming Club
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-1">
          {links.map((link, index) => (
            <Link
              href={link.url}
              key={index}
              className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeLink === link.url
                  ? "text-primary"
                  : "text-gray-600 hover:text-primary/90 hover:bg-gray-50"
              }`}
            >
              {link.name}
              {activeLink === link.url && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            asChild
            size="sm"
            className="bg-primary hover:bg-primary/90 text-white rounded-md px-5 py-1.5 text-sm font-medium shadow-md transition-all hover:shadow-lg"
          >
            <Link href="/join" className="relative overflow-hidden flex items-center gap-2">
              <span className="relative z-10">Join Club</span>
              <Users className="h-4 w-4 relative z-10" /> {/* Added Users icon */}
              
              {/* Simple pulse effect */}
              <motion.div
                className="absolute inset-0 bg-blue-600 rounded-md"
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ 
                  opacity: [0, 0.2, 0],
                  scale: [0.8, 1.2, 0.8],
                  transition: { 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              />
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.header>
  );
}