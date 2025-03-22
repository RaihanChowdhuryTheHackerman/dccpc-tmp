// src/app/(front)/events/page.tsx
'use client'

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, Calendar, RefreshCw } from "lucide-react";
import Image from "next/image";
import { Fade } from "react-awesome-reveal";

interface Event {
    id: number;
    title: string;
    details: string;
    image: string;
    created_at: string;
}

interface Result {
    count: number;
    next: string | null;
    previous: string | null;
    results: Event[]
}

export default function Page() {
    const [data, setData] = useState<Event[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const pageSize = 15;

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/club/events/?page=${page}`);

            if (res.ok) {
                const result = await res.json() as Result;
                setData(result.results);
                setTotal(result.count);
            }
        };

        fetchData().finally(() => setLoading(false));
    }, [page]);

    return (
        <div className="py-12 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
                        <span className="relative inline-block">
                            Events
                            <span className="absolute bottom-0 left-0 w-full h-1 bg-primary opacity-30 rounded-full"></span>
                        </span>
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Stay up to date with our latest workshops, competitions, and programming meetups
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <RefreshCw className="animate-spin text-primary h-10 w-10" />
                    </div>
                ) : (
                    <>
                        {data.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-muted-foreground">No events scheduled at the moment. Check back soon!</p>
                            </div>
                        ) : (
                            <Fade direction="up" triggerOnce={true} cascade damping={0.1}>
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {data.map((event, index) => (
                                        <Card key={index} className="overflow-hidden group hover:shadow-lg transition-shadow duration-300 bg-card border-0 shadow-md">
                                            <div className="relative overflow-hidden aspect-[16/9]">
                                                <Image
                                                    src={event.image}
                                                    width={600}
                                                    height={340}
                                                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                                    alt={event.title}
                                                />
                                                <div className="absolute top-3 right-3 bg-primary/80 text-white text-xs py-1 px-2 rounded-md backdrop-blur-sm flex items-center gap-1.5">
                                                    <Calendar className="h-3 w-3" />
                                                    {formatDate(event.created_at).split(',').slice(0, 2).join(',')}
                                                </div>
                                            </div>
                                            <div className="p-5">
                                                <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">{event.title}</h3>
                                                <div className="line-clamp-3 text-muted-foreground text-sm mb-4">
                                                    {event.details.replace(/<[^>]*>/g, '').substring(0, 120)}...
                                                </div>
                                                <Button variant="outline" className="group" asChild>
                                                    <Link href={`/events/${event.id}`} className="inline-flex items-center">
                                                        Read More
                                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </Fade>
                        )}
                    </>
                )}

                {(total > 0) && (
                    <div className="mt-10 flex items-center justify-center md:justify-end space-x-2">
                        <Button 
                            variant="outline" 
                            onClick={() => setPage((p) => Math.max(p - 1, 1))} 
                            disabled={page === 1 || loading}
                            className="border-primary/30 hover:bg-primary/5"
                        >
                            Previous
                        </Button>
                        <div className="text-sm px-4 py-2 bg-background border border-primary/30 rounded-md">
                            Page {page} of {Math.ceil(total / pageSize)}
                        </div>
                        <Button 
                            variant="outline" 
                            onClick={() => setPage((p) => (p < Math.ceil(total / pageSize) ? p + 1 : p))}
                            disabled={page * pageSize >= total || loading}
                            className="border-primary/30 hover:bg-primary/5"
                        >
                            Next
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}