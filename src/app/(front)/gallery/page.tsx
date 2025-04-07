'use client'

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Camera, CalendarIcon, ArrowRight, ImageIcon, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Fade, Zoom } from "react-awesome-reveal";
import { Image as ImageType, Result } from "@/lib/types";

export default function GalleryPage() {
  const [galleryData, setGalleryData] = useState<{ [year: string]: ImageType[] }>({});
  const [years, setYears] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/club/gallery/`);
        const data = await res.json() as Result & { results: ImageType[] };
        
        // Group images by year
        const grouped = data.results.reduce<Record<string, ImageType[]>>((acc, image) => {
          const year = new Date(image.event_date).getFullYear().toString();
          if (!acc[year]) acc[year] = [];
          acc[year].push(image);
          return acc;
        }, {});
        
        // Sort years in descending order
        const sortedYears = Object.keys(grouped).sort((a, b) => parseInt(b) - parseInt(a));
        
        setGalleryData(grouped);
        setYears(sortedYears);
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header Section */}
        <Fade triggerOnce cascade damping={0.1}>
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-flex items-center bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
              <Camera className="w-4 h-4 mr-2" />
              <span>Photo Gallery</span>
            </span>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Moments <span className="text-primary">Captured</span>
            </h1>
            
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our visual journey through coding workshops, competitions, and community events. 
              These images capture the essence of our programming club's activities over the years.
            </p>
          </div>
        </Fade>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <RefreshCw className="animate-spin h-10 w-10 text-primary mb-4" />
            <p className="text-gray-500">Loading gallery...</p>
          </div>
        ) : years.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl border border-gray-100">
            <ImageIcon className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">No Images Available</h3>
            <p className="text-gray-500 text-center max-w-md">
              Our gallery is currently empty. Please check back later for updates.
            </p>
          </div>
        ) : (
          /* Gallery Content */
          <div className="space-y-20">
            {years.map((year) => (
              <div key={year} className="relative">
                {/* Year Badge with View All button */}
                <div className="relative flex justify-between items-center border-b border-gray-200 mb-8 mt-12 pb-2">
                  <div className="flex items-center">
                    <Badge variant="outline" className="bg-white border-primary/30 shadow-sm px-3 py-1.5 text-base font-bold">
                      <CalendarIcon className="w-4 h-4 mr-2 text-primary" />
                      {year}
                    </Badge>
                  </div>
                  
                  <Button asChild variant="outline" size="sm" className="border-primary/30 hover:bg-primary/5">
                    <Link href={`/gallery/${year}`} className="flex items-center text-xs md:text-sm">
                      View All
                      <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4" />
                    </Link>
                  </Button>
                </div>
                
                {/* Gallery Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
                  {galleryData[year].slice(0, 4).map((image, index) => (
                    <Zoom key={image.id} delay={index * 50} duration={500} triggerOnce>
                      <Dialog>
                        <DialogTrigger asChild>
                          <div 
                            className="group aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer relative shadow-md hover:shadow-xl transition-all duration-300"
                            onClick={() => setSelectedImage(image)}
                          >
                            <Image 
                              src={image.image} 
                              alt={image.title} 
                              fill
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            
                            {/* Overlay with title */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                              <h3 className="text-white font-medium line-clamp-2 text-sm">
                                {image.title}
                              </h3>
                            </div>
                          </div>
                        </DialogTrigger>
                        
                        {/* Image Modal */}
                        <DialogContent className="max-w-2xl p-0 overflow-hidden bg-white border-none rounded-xl shadow-2xl sm:w-[90vw] md:w-[85vw] lg:w-[80vw] max-h-[90vh]">
                          <DialogTitle className="sr-only">{image.title}</DialogTitle>
                          <DialogDescription className="sr-only">
                            {image.description || `View image of ${image.title}`}
                          </DialogDescription>
                          <div className="relative overflow-hidden max-h-[90vh]">
                            {/* Image container with adjusted aspect ratio */}
                            <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-video w-full bg-gray-100 flex items-center justify-center">
                              <Image
                                src={image.image}
                                alt={image.title}
                                fill
                                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 85vw, 80vw"
                                className="object-contain"
                                priority
                                quality={100}
                              />
                            </div>
                            
                            {/* Content area - reduced height */}
                            <div className="p-4 md:p-5 border-t border-gray-100 max-h-[25vh] overflow-auto">
                              <div className="flex flex-col lg:flex-row lg:items-start gap-2">
                                <div className="flex-1 overflow-hidden">
                                  <div className="lg:flex lg:items-center lg:justify-between lg:mb-2">
                                    <h3 className="text-lg md:text-xl font-bold text-primary lg:max-w-[80%] truncate">
                                      {image.title}
                                    </h3>
                                    
                                    {/* Date badge for desktop, repositioned */}
                                    <div className="hidden lg:flex px-3 py-1 bg-primary/5 rounded-lg text-sm text-gray-600 items-center flex-shrink-0">
                                      <CalendarIcon className="w-3 h-3 mr-2 text-primary" />
                                      {new Date(image.event_date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                      })}
                                    </div>
                                  </div>
                                  
                                  {/* Description with reduced max height */}
                                  {image.description && (
                                    <div className="mt-2 text-gray-600 text-sm">
                                      <div className="max-h-16 lg:max-h-24 overflow-y-auto pr-3 break-words">
                                        {image.description}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              {/* Mobile and tablet date display */}
                              <div className="lg:hidden mt-2 text-xs text-gray-500 flex items-center">
                                <CalendarIcon className="w-3 h-3 mr-1" />
                                {new Date(image.event_date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </Zoom>
                  ))}
                </div>
                
                {/* View All Button - removed as it's now at the top */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}