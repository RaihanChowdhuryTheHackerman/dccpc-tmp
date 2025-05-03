// src/components/sections/gallery.tsx
'use client'

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Fade, Zoom } from "react-awesome-reveal";
import { useEffect, useState } from "react";
import { ArrowRight, Camera, ImageIcon } from "lucide-react";

interface Image {
  id: number;
  title: string;
  image: string;
  created_at: string;
  updated_at: string;
}

interface GalleryProps {
  isHomePage?: boolean;
}

export default function Gallery({ isHomePage = true }: GalleryProps) {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Use the home-gallery endpoint when on the homepage, otherwise use the regular gallery endpoint
    const endpoint = isHomePage 
      ? `${process.env.NEXT_PUBLIC_API_URL}/club/home-gallery/`
      : `${process.env.NEXT_PUBLIC_API_URL}/club/gallery/`;
      
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        // Handle both paginated and non-paginated responses
        let imageResults: Image[];
        if (Array.isArray(data)) {
          // Non-paginated response (direct array)
          imageResults = data;
        } else if (data.results && Array.isArray(data.results)) {
          // Paginated response (object with results array)
          imageResults = data.results;
        } else {
          throw new Error("Invalid data structure received from API.");
        }
        
        setImages(imageResults);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, [isHomePage]);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <Fade direction="up" triggerOnce>
            <span className="inline-flex items-center bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
              <Camera className="w-4 h-4 mr-2" />
              <span>Our Moments</span>
            </span>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Club <span className="text-primary">Gallery</span>
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore snapshots of our coding workshops, competitions, and community events. 
              These moments capture our journey of learning and growing together.
            </p>
          </Fade>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {images.length === 0 ? (
              <div className="text-center py-12">
                <ImageIcon className="mx-auto h-16 w-16 text-gray-300" />
                <p className="mt-4 text-gray-500">No images available yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {images.map((image, i) => (
                  <Zoom duration={800} delay={i * 100} triggerOnce key={i}>
                    <div className="group relative overflow-hidden rounded-lg aspect-square bg-gray-100">
                      <Image
                        src={image.image}
                        alt={image.title}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <h3 className="text-white font-medium line-clamp-1 text-sm md:text-base">{image.title}</h3>
                      </div>
                    </div>
                  </Zoom>
                ))}
              </div>
            )}
          </>
        )}

        <div className="mt-12 text-center">
          <Fade direction="up" triggerOnce delay={300}>
            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className="group hover:bg-primary hover:text-white transition-colors border-primary/30"
            >
              <Link href="/gallery">
                View All Gallery
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </Fade>
        </div>
      </div>
    </section>
  );
}