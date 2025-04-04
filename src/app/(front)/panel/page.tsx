// src/app/(front)/panel/page.tsx
'use client'

import ImageCard from "@/components/image-card";
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { CardFooter } from "@/components/ui/card";
import { Facebook, Github, Linkedin, Users } from "lucide-react";
import Link from "next/link";

interface Member {
    name: string;
    image: string;
    designation: string;
    linkedin: string | null;
    github: string | null;
    facebook: string | null;
    created_at: string;
    updated_at: string;
    ordering: number;
}

interface Result {
    next: string | null;
    previous: string | null;
    results: Member[];
    count: number;
}

export default function Page() {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/club/panel-members/`)
            .then(res => res.json())
            .then(data => {
                const result = data as Result;
                setMembers(result.results);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="py-12 md:py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
                    <span className="inline-flex items-center bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
                        <Users className="w-4 h-4 mr-2" />
                        <span>Our Team</span>
                    </span>
                    
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                        Panel <span className="text-primary">Members</span>
                    </h1>
                    
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Meet the brilliant minds behind DCC Programming Club. Our panel members bring diverse expertise 
                        and passion to create an exceptional learning environment for all our members.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <Fade cascade damping={0.05} triggerOnce={true}>
                        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {members.map((member, index) => (
                                <ImageCard
                                    key={index}
                                    src={member.image}
                                    title={member.name}
                                    description={member.designation}
                                >
                                    <CardFooter className="px-6 pb-6 pt-0 flex justify-start gap-4">
                                        <Link 
                                            href={member.linkedin || '#'} 
                                            target={member.linkedin ? "_blank" : "_self"}
                                            onClick={(e) => !member.linkedin && e.preventDefault()}
                                            className={`p-2 rounded-full transition-colors duration-300 ${
                                                member.linkedin 
                                                    ? "bg-primary/10 text-primary hover:bg-primary hover:text-white" 
                                                    : "bg-gray-100 text-gray-400 cursor-default"
                                            }`}
                                            aria-label={`LinkedIn profile of ${member.name}`}
                                        >
                                            <Linkedin className="h-5 w-5" />
                                        </Link>
                                        <Link 
                                            href={member.github || '#'} 
                                            target={member.github ? "_blank" : "_self"}
                                            onClick={(e) => !member.github && e.preventDefault()}
                                            className={`p-2 rounded-full transition-colors duration-300 ${
                                                member.github 
                                                    ? "bg-primary/10 text-primary hover:bg-primary hover:text-white" 
                                                    : "bg-gray-100 text-gray-400 cursor-default"
                                            }`}
                                            aria-label={`GitHub profile of ${member.name}`}
                                        >
                                            <Github className="h-5 w-5" />
                                        </Link>
                                        <Link 
                                            href={member.facebook || '#'} 
                                            target={member.facebook ? "_blank" : "_self"}
                                            onClick={(e) => !member.facebook && e.preventDefault()}
                                            className={`p-2 rounded-full transition-colors duration-300 ${
                                                member.facebook 
                                                    ? "bg-primary/10 text-primary hover:bg-primary hover:text-white" 
                                                    : "bg-gray-100 text-gray-400 cursor-default"
                                            }`}
                                            aria-label={`Facebook profile of ${member.name}`}
                                        >
                                            <Facebook className="h-5 w-5" />
                                        </Link>
                                    </CardFooter>
                                </ImageCard>
                            ))}
                        </div>
                    </Fade>
                )}

                {members.length === 0 && !loading && (
                    <div className="text-center py-16">
                        <p className="text-gray-500">No panel members available at the moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
}