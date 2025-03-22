// src/app/(front)/panel/page.tsx
'use client'

import ImageCard from "@/components/image-card";
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { CardFooter } from "@/components/ui/card";
import { Facebook, Github, Linkedin } from "lucide-react";
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
        <div className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Panel Members</h1>
                    <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
                    <p className="text-lg text-gray-700">
                        Meet the brilliant minds behind DCC Programming Club. Our panel members bring diverse expertise 
                        and passion to create an exceptional learning environment for all our members.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <Fade direction="up" triggerOnce={true}>
                        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                            {members.map((member, index) => (
                                <ImageCard
                                    key={index}
                                    src={member.image}
                                    title={member.name}
                                    description={member.designation}>
                                    <CardFooter>
                                        <div className="flex items-center gap-4">
                                            <Link href={member.linkedin || '#'} target="_blank">
                                                <Linkedin className="text-gray-600 hover:text-primary transition-colors" />
                                            </Link>
                                            <Link href={member.github || '#'} target="_blank">
                                                <Github className="text-gray-600 hover:text-primary transition-colors" />
                                            </Link>
                                            <Link href={member.facebook || '#'} target="_blank">
                                                <Facebook className="text-gray-600 hover:text-primary transition-colors" />
                                            </Link>
                                        </div>
                                    </CardFooter>
                                </ImageCard>
                            ))}
                        </div>
                    </Fade>
                )}
            </div>
        </div>
    );
}