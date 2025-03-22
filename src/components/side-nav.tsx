// src/components/side-nav.tsx
'use client'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  Home, 
  FileText, 
  Calendar, 
  Image as ImageIcon, 
  Users, 
  Info, 
  MessageSquare,
  ArrowRight,
  Code
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "@/static/img/logo-cropped.png";

interface Link {
  url: string;
  name: string;
  icon?: JSX.Element;
  isActive?: boolean;
}

export default function SideNav({ links }: { links: Link[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Map icons to each link
  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "home": return <Home className="h-5 w-5" />;
      case "notice": return <FileText className="h-5 w-5" />;
      case "events": return <Calendar className="h-5 w-5" />;
      case "gallery": return <ImageIcon className="h-5 w-5" />;
      case "panel": return <Users className="h-5 w-5" />;
      case "about": return <Info className="h-5 w-5" />;
      case "contact": return <MessageSquare className="h-5 w-5" />;
      default: return <Code className="h-5 w-5" />;
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          size="icon" 
          variant="ghost" 
          className="h-9 w-9 rounded-md hover:bg-gray-100/50 flex items-center justify-center mr-1"
        >
          <Menu className="h-5 w-5 text-primary" />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="left" 
        className="w-[280px] p-0 border-r border-r-gray-200 bg-white [&>button]:hidden"
      >
        <div className="h-full flex flex-col">
          <SheetHeader className="p-4 border-b bg-primary/5">
            <div className="flex items-center gap-3">
              <Image
                src={Logo}
                width={40}
                height={40}
                alt="DCC Programming Club Logo"
                className="rounded-md"
              />
              <SheetTitle className="font-bold text-xl text-primary">
                DCC Programming Club
              </SheetTitle>
            </div>
          </SheetHeader>
          
          <nav className="flex-1 overflow-auto py-4">
            {links.map((link, i) => {
              const isActive = pathname === link.url;
              return (
                <SheetClose key={i} asChild>
                  <Link
                    className={`flex items-center mx-3 my-1.5 py-2.5 px-4 rounded-lg transition-all ${
                      isActive 
                        ? "bg-primary text-white shadow-sm font-medium"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                    href={link.url}
                  >
                    <span className={`mr-3 ${isActive ? 'text-white' : 'text-primary'}`}>
                      {getIcon(link.name)}
                    </span>
                    <span>{link.name}</span>
                    {isActive && (
                      <ArrowRight className="ml-auto h-4 w-4" />
                    )}
                  </Link>
                </SheetClose>
              );
            })}
          </nav>
          
          <div className="p-5 bg-gray-50 border-t">
            <SheetClose asChild>
              <Button
                asChild
                className="w-full bg-primary hover:bg-primary/90 text-white shadow-sm py-5 rounded-lg"
              >
                <Link href="/join" className="flex items-center justify-center gap-2">
                  <span>Join Club</span>
                  <Users className="h-4 w-4" />
                </Link>
              </Button>
            </SheetClose>
            <p className="text-xs text-gray-500 text-center mt-3">
              &copy; DCC Programming Club
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}