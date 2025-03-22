// src/components/sections/mission-vision.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Fade, Slide } from "react-awesome-reveal";
import { Code, Target, Lightbulb, Rocket } from "lucide-react";

export default function MissionVision() {
  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-6 relative">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 opacity-5 rounded-full translate-x-1/3 translate-y-1/3"></div>
        
        <div className="text-center relative z-10 mb-16">
          <Slide direction="down" triggerOnce>
            <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
              Our Purpose
            </span>
          </Slide>
          
          <Fade triggerOnce>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Our <span className="text-primary">Mission</span> &{" "}
              <span className="text-primary">Vision</span>
            </h2>
          </Fade>

          <Fade triggerOnce delay={200}>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Guiding our community with purpose and inspiration.
            </p>
          </Fade>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <Slide direction="left" triggerOnce>
            <Card className="bg-white overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 group">
              <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
              <CardHeader className="pb-2">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary mr-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Target className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-2xl font-bold">Our Mission</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  To create a thriving programming community where students can
                  enhance their skills, collaborate on innovative projects, and
                  prepare for global challenges in the tech world.
                </p>
                
                <div className="mt-6 space-y-3">
                  <div className="flex items-start">
                    <div className="p-1 bg-primary/10 rounded-full text-primary mr-3 flex-shrink-0">
                      <Code className="w-4 h-4" />
                    </div>
                    <p className="text-gray-700"><span className="font-medium">Skill Development</span> - Foster technical excellence through workshops and training</p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-1 bg-primary/10 rounded-full text-primary mr-3 flex-shrink-0">
                      <Rocket className="w-4 h-4" />
                    </div>
                    <p className="text-gray-700"><span className="font-medium">Competitions</span> - Represent DCC in national and international contests</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Slide>

          <Slide direction="right" triggerOnce>
            <Card className="bg-white overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 group">
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
              <CardHeader className="pb-2">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500 mr-4 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-2xl font-bold">Our Vision</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  To become a leading hub for fostering programming talent,
                  promoting innovation, and inspiring the next generation of tech leaders
                  through excellence and community.
                </p>
                
                <div className="mt-6 space-y-3">
                  <div className="flex items-start">
                    <div className="p-1 bg-blue-500/10 rounded-full text-blue-500 mr-3 flex-shrink-0">
                      <Code className="w-4 h-4" />
                    </div>
                    <p className="text-gray-700"><span className="font-medium">Innovation Hub</span> - Create an environment where new ideas flourish</p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-1 bg-blue-500/10 rounded-full text-blue-500 mr-3 flex-shrink-0">
                      <Rocket className="w-4 h-4" />
                    </div>
                    <p className="text-gray-700"><span className="font-medium">Leadership</span> - Develop future tech leaders who make a difference</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Slide>
        </div>
        
        <Fade direction="up" triggerOnce delay={400}>
          <div className="mt-16 text-center">
            <div className="inline-block bg-gray-100 px-6 py-4 rounded-lg text-gray-700">
              <p className="font-medium">Join us in our journey to shape the future of technology.</p>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
}