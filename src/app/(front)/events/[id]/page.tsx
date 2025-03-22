// src/app/(front)/events/[id]/page.tsx
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, Calendar, MapPin, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Event {
    id: number;
    title: string;
    details: string;
    image: string;
    created_at: string;
}

export default async function Page({params}: {params: Promise<{id: number}>}) {
    const {id} = await params;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/club/events/${id}/`);

    if (response.ok) {
        const {image, title, created_at, details} = await response.json() as Event;
        
        return (
            <article className="min-h-screen">
                {/* Hero section with image */}
                <div className="relative h-[40vh] md:h-[50vh] w-full">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        priority
                        className="object-cover"
                    />
                </div>

                {/* Content section with dark text */}
                <div className="container mx-auto px-4 md:px-6">
                    <div className="relative -mt-16 md:-mt-24 z-10">
                        <div className="bg-card rounded-xl shadow-lg p-6 md:p-8">
                            <div className="mb-6">
                                <Link 
                                    href="/events" 
                                    className="inline-flex items-center text-primary hover:text-primary/80 text-sm font-medium"
                                >
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back to all events
                                </Link>
                            </div>

                            <Badge className="mb-4 bg-primary/10 text-primary border-none">
                                {formatDate(created_at)}
                            </Badge>
                            
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                                {title}
                            </h1>

                            <div className="grid md:grid-cols-3 gap-10">
                                <div className="md:col-span-2">
                                    <div className="prose prose-lg max-w-none">
                                        <div dangerouslySetInnerHTML={{__html: details}}></div>
                                    </div>
                                </div>
                                
                                <div className="space-y-6">
                                    {/* Event Details Card */}
                                    <div className="rounded-xl border border-border bg-card/50 p-6">
                                        <h2 className="text-xl font-semibold mb-6 pb-4 border-b">Event Information</h2>
                                        
                                        <div className="space-y-5">
                                            <div className="flex">
                                                <Calendar className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                                                <div>
                                                    <p className="font-medium">Date & Time</p>
                                                    <p className="text-muted-foreground">{formatDate(created_at)}</p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex">
                                                <MapPin className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                                                <div>
                                                    <p className="font-medium">Location</p>
                                                    <p className="text-muted-foreground">DCC Campus, Computer Science Building</p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex">
                                                <User className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                                                <div>
                                                    <p className="font-medium">Organized by</p>
                                                    <p className="text-muted-foreground">DCC Programming Club</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Registration Card */}
                                    <div className="rounded-xl bg-primary p-6">
                                        <h2 className="text-xl font-semibold mb-4 text-primary-foreground">Interested in this event?</h2>
                                        <p className="text-primary-foreground/80 mb-6">
                                            Join us for this exciting opportunity to enhance your programming skills and connect with fellow enthusiasts.
                                        </p>
                                        <div className="flex flex-col gap-3">
                                            <Button variant="secondary" className="w-full" asChild>
                                                <Link href="/contact">Register Interest</Link>
                                            </Button>
                                            <Button variant="outline" className="w-full bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                                                <Link href="/join">Join Club</Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        );
    }

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
            <div className="text-center max-w-md mx-auto">
                <h1 className="text-3xl font-bold text-primary mb-4">Event Not Found</h1>
                <p className="text-muted-foreground mb-8">
                    The event you are looking for may have been removed or does not exist.
                </p>
                <Button asChild>
                    <Link href="/events">Browse All Events</Link>
                </Button>
            </div>
        </div>
    );
}