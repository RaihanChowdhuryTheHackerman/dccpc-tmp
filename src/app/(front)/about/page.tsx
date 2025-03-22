// src/app/(front)/about/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Code, GitBranch, Terminal } from "lucide-react";

export default function Page() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-primary to-primary/90 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center">About Us</h1>
          <div className="w-20 h-1 bg-white mx-auto my-6"></div>
          <p className="text-center max-w-3xl mx-auto text-white/90">
            At DCC Programming Club, we believe that programming is more than just writing code — its a gateway to
            innovation, problem-solving, and collaboration. Established with a vision to create a thriving programming
            community, our club serves as a platform for students of all levels to enhance their technical skills, explore
            new technologies, and connect with like-minded peers.
          </p>
        </div>
      </div>

      {/* Mission section */}
      <div className="py-16 container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <div className="inline-flex items-center mb-4">
              <Terminal className="text-primary mr-2" />
              <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
            </div>
            <p className="text-gray-600 mb-4">Our mission is to foster a community where students can:</p>
            <ul className="space-y-3">
              <li className="flex">
                <span className="text-primary mr-2">●</span>
                <div>
                  <span className="font-bold">Learn:</span> Develop strong foundational and advanced programming skills
                  through workshops, training sessions, and mentoring.
                </div>
              </li>
              <li className="flex">
                <span className="text-primary mr-2">●</span>
                <div>
                  <span className="font-bold">Collaborate:</span> Work together on projects, hackathons, and
                  problem-solving challenges to tackle real-world problems.
                </div>
              </li>
              <li className="flex">
                <span className="text-primary mr-2">●</span>
                <div>
                  <span className="font-bold">Innovate:</span> Inspire creativity and innovation by encouraging members to
                  build impactful projects.
                </div>
              </li>
            </ul>
          </div>

          <div className="md:w-1/2">
            <div className="inline-flex items-center mb-4">
              <GitBranch className="text-primary mr-2" />
              <h2 className="text-2xl font-bold text-gray-800">Our Vision</h2>
            </div>
            <p className="text-gray-600 mb-4">We aim to:</p>
            <ul className="space-y-3">
              <li className="flex">
                <span className="text-primary mr-2">●</span>
                <div>Build a culture of continuous learning and skill-sharing.</div>
              </li>
              <li className="flex">
                <span className="text-primary mr-2">●</span>
                <div>Establish our club as a leader in promoting programming excellence at the collegiate level.</div>
              </li>
              <li className="flex">
                <span className="text-primary mr-2">●</span>
                <div>Empower our members to excel in national and international programming contests and create meaningful
                  contributions to the tech world.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Benefits section with code-like styling */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="inline-flex items-center mb-6 justify-center w-full">
            <Code className="text-primary mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">Membership Benefits</h2>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 max-w-3xl mx-auto text-gray-200 font-mono text-sm">
            <div className="mb-2">
              <span className="text-purple-400">class</span> <span className="text-yellow-400">MembershipBenefits</span> {"{"}
            </div>
            
            <div className="pl-6 mb-2">
              <span className="text-purple-400">const</span> <span className="text-blue-400">benefits</span> = [
            </div>
            
            <div className="pl-10 mb-2">
              <span className="text-green-400">&quot;Access to exclusive training sessions and resources&quot;</span>,
            </div>
            <div className="pl-10 mb-2">
              <span className="text-green-400">&quot;Opportunities to participate in regional and global contests&quot;</span>,
            </div>
            <div className="pl-10 mb-2">
              <span className="text-green-400">&quot;A supportive community to help you grow and achieve your goals&quot;</span>,
            </div>
            <div className="pl-10 mb-2">
              <span className="text-green-400">&quot;Networking opportunities with industry professionals and alumni&quot;</span>
            </div>
            
            <div className="pl-6 mb-2">];</div>
            
            <div className="pl-6 mb-2">
              <span className="text-purple-400">function</span> <span className="text-blue-400">joinClub</span>() {"{"}
            </div>
            
            <div className="pl-10 mb-2">
              <span className="text-blue-400">return</span> <span className="text-green-400">&quot;A better future in programming!&quot;</span>;
            </div>
            
            <div className="pl-6 mb-2">{"}"}</div>
            <div className="mb-2">{"}"}</div>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="py-16 container mx-auto px-4">
        <div className="bg-primary text-white p-8 rounded-lg max-w-3xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-light mb-4">Get Involved!</h3>
          <Button asChild variant="outline" size="lg" className="bg-white text-primary hover:bg-gray-100">
            <Link href="/join">Join Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}