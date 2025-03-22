// src/components/sections/hero.tsx
'use client'

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import HeaderImage from "@/static/img/header.jpg";
import { Fade, Slide } from "react-awesome-reveal";
import { Terminal, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

// Animation for code typing effect
const CodeTypingEffect = () => {
  const [text, setText] = useState("");
  const fullText = "class DCCProgrammingClub {\n  constructor() {\n    this.skills = ['Coding', 'Problem-Solving', 'Innovation'];\n  }\n\n  joinClub() {\n    // Your coding journey starts here\n    return success;\n  }\n}";
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(timer);
    }, 30);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="bg-black bg-opacity-90 text-green-400 p-2 sm:p-4 rounded-lg shadow-lg font-mono text-xs sm:text-sm leading-relaxed overflow-hidden w-full">
      <div className="flex items-center text-xs mb-2 text-gray-400">
        <div className="bg-red-500 rounded-full w-2 h-2 sm:w-3 sm:h-3 mr-1 sm:mr-2"></div>
        <div className="bg-yellow-500 rounded-full w-2 h-2 sm:w-3 sm:h-3 mr-1 sm:mr-2"></div>
        <div className="bg-green-500 rounded-full w-2 h-2 sm:w-3 sm:h-3 mr-1 sm:mr-2"></div>
        <span className="flex-1 text-[10px] sm:text-xs">dcc_programming_club.js</span>
      </div>
      <pre className="whitespace-pre-wrap text-[11px] sm:text-xs md:text-sm">{text}<span className="animate-pulse">|</span></pre>
    </div>
  );
};

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-white via-blue-50 to-white relative overflow-hidden py-16 md:py-20">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 text-center lg:text-left">
            <Fade cascade damping={0.2} triggerOnce>
              <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-6">
                <Terminal className="inline-block w-4 h-4 mr-2" />
                <span>Welcome to DCC Programming Club</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                Coding <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Excellence</span>, <br className="hidden md:block" />
                Problem <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-primary">Solving</span> Community
              </h1>
              
              <p className="text-lg text-gray-700 mb-8">
                Join a thriving community of passionate programmers at Dhaka City College. 
                Enhance your skills, participate in contests, and build your future in tech.
              </p>
            </Fade>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10 sm:mb-0">
              <Slide direction="left" triggerOnce>
                <Button size="lg" className="text-base px-6 py-6 group shadow-lg" asChild>
                  <Link href="/join">
                    Join Now
                    <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </Slide>
              
              <Slide direction="left" delay={200} triggerOnce>
                <Button variant="outline" size="lg" className="text-base px-6 py-6 shadow-sm" asChild>
                  <Link href="/about">Learn More</Link>
                </Button>
              </Slide>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <Fade duration={1000} triggerOnce>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full bg-primary/10 rounded-2xl z-0 transform rotate-3"></div>
                <div className="absolute -bottom-4 -right-4 w-full h-full bg-primary/20 rounded-2xl z-0 transform -rotate-3"></div>
                
                <div className="relative z-10 bg-white p-2 rounded-xl shadow-xl transform transition-transform hover:scale-[1.02] duration-500">
                  <Image
                    src={HeaderImage}
                    alt="DCC Programming Club"
                    className="rounded-lg shadow-inner"
                    priority
                  />
                </div>
                
                {/* Responsive typing code effect */}
                <div className="absolute z-20 
                              transform rotate-2
                              scale-50 sm:scale-75 md:scale-90 lg:scale-100
                              -bottom-5 -right-5 sm:-bottom-8 sm:right-0 md:-bottom-10 lg:right-0
                              w-full max-w-[280px] sm:max-w-[350px] md:max-w-md
                              origin-bottom-right">
                  <CodeTypingEffect />
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </div>
    </section>
  );
}