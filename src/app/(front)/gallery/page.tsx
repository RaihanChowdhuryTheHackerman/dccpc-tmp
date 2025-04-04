// src/app/(front)/gallery/page.tsx
'use client'

import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";
import { Image as ImageType, Result } from "@/lib/types";
import { Fade } from "react-awesome-reveal";
import { RefreshCw, Camera } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function Page() {
    const [images, setImages] = useState<ImageType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/club/gallery/`)
            .then(res => res.json())
            .then(data => {
                const result = data as Result;
                setImages(result.results);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12 md:mb-16">
                    <span className="inline-flex items-center bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
                        <Camera className="w-4 h-4 mr-2" />
                        <span>Our Moments</span>
                    </span>
                    
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                        Club <span className="text-primary">Gallery</span>
                    </h1>
                    
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Explore moments from our coding competitions, workshops, and community events
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <RefreshCw className="animate-spin text-primary h-10 w-10" />
                    </div>
                ) : (
                    <>
                        {images.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-muted-foreground">No images available yet.</p>
                            </div>
                        ) : (
                            <Fade direction="up" triggerOnce={true} cascade damping={0.05}>
                                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                    {images.map((image, index) => (
                                        <div key={index} className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl bg-white">
                                            {/* Fixed aspect ratio container */}
                                            <div className="relative aspect-[1/1] overflow-hidden">
                                                <Image 
                                                    src={image.image} 
                                                    alt={image.title} 
                                                    fill={true}
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                                    className="object-cover transition-transform duration-500 group-hover:scale-110" 
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                                        <h3 className="font-bold mb-2">{image.title}</h3>
                                                        <div className="flex items-center justify-between">
                                                            <Badge variant="outline" className="border-white/20 text-white bg-white/10 text-xs">
                                                                {formatDate(image.created_at)}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Fade>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}