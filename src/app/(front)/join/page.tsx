// src/app/(front)/join/page.tsx
import MembershipForm from "@/components/forms/membership-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FAQ from "@/components/faq";
import { CheckCircle2, Users, Code, Trophy, Rocket, GraduationCap } from "lucide-react";
import { Fade, Slide } from "react-awesome-reveal";

export default function Page() {
  const benefits = [
    {
      icon: <Code className="w-6 h-6 text-white" />,
      title: "Skill Development",
      description: "Learn and improve programming, problem-solving, and algorithmic skills."
    },
    {
      icon: <Trophy className="w-6 h-6 text-white" />,
      title: "Competitive Opportunities",
      description: "Participate in ICPC, NCPC, IUPC, and other prestigious contests."
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: "Collaborative Environment",
      description: "Work with experienced mentors and peers on exciting projects."
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-white" />,
      title: "Career Advancement",
      description: "Build a strong profile for future internships and job opportunities."
    }
  ];

  const expectations = [
    "Passion for programming, dedication to improve yourself and collaboration with the community.",
    "Basic knowledge of any programming language (preferred but not mandatory).",
    "Willingness to participate in club activities and contests."
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <Fade triggerOnce>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Join the DCC Programming Club Today!
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Empower your coding skills, collaborate with like-minded peers, and excel in competitive programming 
              with DCC Programming Club. Be a part of our growing community!
            </p>
          </Fade>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Slide direction="left" triggerOnce>
            <Card className="bg-primary text-white border-0 overflow-hidden shadow-lg h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <CardHeader>
                <CardTitle>
                  <h2 className="text-3xl font-bold mb-2">
                    Why Should You Join?
                  </h2>
                  <p className="text-white/80 text-sm font-normal">
                    Discover the advantages of becoming a member
                  </p>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <Fade key={index} cascade damping={0.1} triggerOnce delay={index * 100}>
                      <div className="flex items-start gap-4">
                        <div className="bg-white/20 p-2 rounded-lg">
                          {benefit.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{benefit.title}</h3>
                          <p className="text-white/80">{benefit.description}</p>
                        </div>
                      </div>
                    </Fade>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Slide>

          <Slide direction="right" triggerOnce>
            <Card className="bg-white border-0 shadow-lg h-full overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 -translate-x-1/2"></div>
              <CardHeader>
                <CardTitle>
                  <h2 className="text-3xl font-bold text-primary mb-2">
                    What Do We Expect?
                  </h2>
                  <p className="text-gray-500 text-sm font-normal">
                    Requirements for joining our community
                  </p>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expectations.map((expectation, index) => (
                    <Fade key={index} cascade damping={0.1} triggerOnce delay={index * 150}>
                      <div className="flex items-start gap-4">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-gray-700">{expectation}</p>
                      </div>
                    </Fade>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <Rocket className="w-6 h-6 text-primary mb-2" />
                  <h3 className="text-lg font-medium mb-2">Ready to Launch Your Programming Journey?</h3>
                  <p className="text-gray-600">
                    Complete the application form below to start your journey with us. We welcome programmers of all skill levels!
                  </p>
                </div>
              </CardContent>
            </Card>
          </Slide>
        </div>

        <Fade triggerOnce>
          <div className="bg-white rounded-xl shadow-lg p-8 mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative text-center mb-8">
              <h2 className="text-3xl font-bold text-primary mb-3">
                Apply for Membership
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Fill out the form below to apply for membership. Our team will review your application and get back to you as soon as possible.
              </p>
            </div>
            
            <MembershipForm />
          </div>
        </Fade>

        <Fade triggerOnce>
          <div className="bg-primary rounded-xl shadow-lg p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative">
              <h2 className="text-3xl font-bold mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-white/80 mb-8">
                Find answers to common questions about club membership and activities
              </p>
              <FAQ />
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
}