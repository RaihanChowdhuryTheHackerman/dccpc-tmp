// File: src/app/(front)/gallery/[year]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Image as ImageType, Result } from "@/lib/types";

export default async function YearGalleryPage({ params }: { params: { year: string } }) {
    const year = params.year;
    
    // Fetch gallery data for specific year
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/club/gallery/?year=${year}`);
    const galleryData = await res.json() as Result & { results: ImageType[] };

    return (
        <div className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-12">
                    <Button asChild variant="outline" className="mb-6">
                        <Link href="/gallery" className="flex items-center">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Gallery
                        </Link>
                    </Button>

                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
                        Gallery <span className="text-primary">{year}</span>
                    </h1>
                    
                    <p className="text-gray-600 max-w-2xl">
                        Explore all images from {year}, capturing the club's memorable moments.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {galleryData.results.map((image: ImageType) => (
                        <div 
                            key={image.id} 
                            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="aspect-square overflow-hidden">
                                <Image 
                                    src={image.image} 
                                    alt={image.title} 
                                    width={400} 
                                    height={400} 
                                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-primary mb-2">{image.title}</h3>
                                {image.description && (
                                    <p className="text-sm text-gray-600 line-clamp-2">
                                        {image.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}