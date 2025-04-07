// File: src/app/(front)/gallery/page.tsx
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Image as ImageType, Result } from "@/lib/types";

export default async function Page() {
    // Fetch gallery data
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/club/gallery/`);
    const galleryData = await res.json() as Result & { results: ImageType[] };

    // Group images by year
    const groupedImages = galleryData.results.reduce<Record<string, ImageType[]>>((acc, image) => {
        const year = new Date(image.event_date).getFullYear().toString();
        if (!acc[year]) acc[year] = [];
        acc[year].push(image);
        return acc;
    }, {});

    // Sort years in descending order
    const years = Object.keys(groupedImages).sort((a, b) => parseInt(b) - parseInt(a));

    return (
        <div className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12 md:mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                        Club <span className="text-primary">Gallery</span>
                    </h1>
                    
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Explore scenes from coding sessions, workshops, and events over the years.
                    </p>
                </div>

                {years.map((year) => (
                    <div key={year} className="mb-16">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-bold text-primary">{year}</h2>
                            <Button asChild variant="outline">
                                <Link href={`/gallery/${year}`} className="flex items-center">
                                    View all
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-4">
                            {groupedImages[year].slice(0, 4).map((image) => (
                                <div 
                                    key={image.id} 
                                    className="aspect-square overflow-hidden rounded-lg shadow-md"
                                >
                                    <Image 
                                        src={image.image} 
                                        alt={image.title} 
                                        width={300} 
                                        height={300} 
                                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}