'use client'

import { useState, useEffect } from "react";
import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, RefreshCw, ImageIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Image as ImageType, Result } from "@/lib/types";
import { Fade, Zoom } from "react-awesome-reveal";

export default function YearGalleryPage({ params }: { params: Promise<{ year: string }> }) {
  const unwrappedParams = use(params);
  const year = unwrappedParams.year;
  const [images, setImages] = useState<ImageType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);
  
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/club/gallery/?year=${year}`);
        const data = await res.json() as Result & { results: ImageType[] };
        setImages(data.results);
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchImages();
  }, [year]);
  
  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentImageIndex !== null && currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };
  
  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentImageIndex !== null && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header Section */}
        <Fade triggerOnce>
          <div className="mb-8 md:mb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <Button 
                asChild 
                variant="outline" 
                className="w-full md:w-auto rounded-full hover:bg-primary/5 border-primary/20"
              >
                <Link href="/gallery" className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to All Galleries
                </Link>
              </Button>
              
              <Badge variant="outline" className="text-lg font-bold px-4 py-2 bg-white border-primary/20 md:self-end self-center">
                <Calendar className="w-5 h-5 mr-2 text-primary" />
                {year}
              </Badge>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800 text-center md:text-left">
              <span className="text-primary">Gallery</span> Collection {year}
            </h1>
            
            <p className="text-gray-600 max-w-2xl text-center md:text-left">
              Browse through our {year} collection of memorable moments, events, and activities.
              Each image tells a story of collaboration, learning, and growth.
            </p>
          </div>
        </Fade>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <RefreshCw className="animate-spin h-10 w-10 text-primary mb-4" />
            <p className="text-gray-500">Loading gallery...</p>
          </div>
        ) : images.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl border border-gray-100">
            <ImageIcon className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">No Images Available for {year}</h3>
            <p className="text-gray-500 text-center max-w-md">
              There are no images available for this year. Please check other years or come back later.
            </p>
            <Button 
              asChild 
              variant="outline" 
              className="mt-6"
            >
              <Link href="/gallery">
                Browse Other Years
              </Link>
            </Button>
          </div>
        ) : (
          /* Gallery Grid */
          <Fade triggerOnce cascade damping={0.05}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
              {images.map((image, index) => (
                <Dialog key={image.id}>
                  <DialogTrigger asChild>
                    <div 
                      className="group aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer relative shadow-md hover:shadow-xl transition-all duration-300"
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <Image 
                        src={image.image} 
                        alt={image.title} 
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                        <h3 className="text-white font-medium text-sm md:text-base">
                          {image.title}
                        </h3>
                        {image.description && (
                          <p className="text-white/80 text-xs mt-1 line-clamp-2">{image.description}</p>
                        )}
                      </div>
                    </div>
                  </DialogTrigger>
                  
                  {/* Image Lightbox Modal */}
                  <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white border-none rounded-xl shadow-2xl sm:w-[90vw] md:w-[85vw] lg:w-[80vw] max-h-[90vh]">
                    {currentImageIndex !== null && (
                      <>
                        <DialogTitle className="sr-only">{images[currentImageIndex].title}</DialogTitle>
                        <DialogDescription className="sr-only">
                          {images[currentImageIndex].description || `View image of ${images[currentImageIndex].title}`}
                        </DialogDescription>
                      </>
                    )}
                    
                    <div className="relative overflow-hidden max-h-[90vh]">
                      <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-video w-full bg-gray-100 flex items-center justify-center">
                        {currentImageIndex !== null && (
                          <>
                            <Image
                              src={images[currentImageIndex].image}
                              alt={images[currentImageIndex].title}
                              fill
                              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 85vw, 80vw"
                              className="object-contain"
                              priority
                              quality={95}
                            />
                            
                            {/* Navigation buttons with smaller size */}
                            <div className="absolute inset-0 flex items-center justify-between pointer-events-none px-2 sm:px-4">
                              <div className="pointer-events-auto">
                                {currentImageIndex > 0 && (
                                  <button 
                                    onClick={handlePrevImage}
                                    className="bg-white/90 hover:bg-white text-primary shadow-md hover:shadow-lg rounded-full p-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    aria-label="Previous image"
                                  >
                                    <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                                  </button>
                                )}
                              </div>
                              
                              <div className="pointer-events-auto">
                                {currentImageIndex < images.length - 1 && (
                                  <button 
                                    onClick={handleNextImage}
                                    className="bg-white/90 hover:bg-white text-primary shadow-md hover:shadow-lg rounded-full p-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    aria-label="Next image"
                                  >
                                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                                  </button>
                                )}
                              </div>
                            </div>
                            
                            {/* Progress indicators - smaller size */}
                            <div className="absolute bottom-3 inset-x-0">
                              <div className="flex justify-center items-center">
                                <div className="bg-white/90 text-primary font-medium text-xs px-2 py-1 rounded-full shadow-md backdrop-blur-sm">
                                  {currentImageIndex + 1} of {images.length}
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      
                      {/* Modern image details section with reduced height */}
                      {currentImageIndex !== null && (
                        <div className="p-4 md:p-5 border-t border-gray-100 max-h-[25vh] overflow-auto">
                          <div className="flex flex-col lg:flex-row lg:items-start gap-2">
                            <div className="flex-1 overflow-hidden">
                              <div className="lg:flex lg:items-center lg:justify-between lg:mb-2">
                                <h3 className="text-lg md:text-xl font-bold text-primary lg:max-w-[75%] truncate">
                                  {images[currentImageIndex].title}
                                </h3>
                                
                                {/* Desktop date badge, repositioned and smaller */}
                                <div className="hidden lg:flex px-3 py-1 bg-primary/5 rounded-lg text-xs text-gray-600 items-center flex-shrink-0">
                                  <Calendar className="w-3 h-3 mr-1 text-primary" />
                                  {new Date(images[currentImageIndex].event_date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </div>
                              </div>
                              
                              {/* Description with reduced max height */}
                              {images[currentImageIndex].description && (
                                <div className="relative mt-2">
                                  <div className="max-h-16 lg:max-h-24 overflow-y-auto pr-3">
                                    <p className="text-gray-600 text-xs md:text-sm break-words leading-relaxed">
                                      {images[currentImageIndex].description}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Mobile and tablet date display */}
                          <div className="lg:hidden mt-2 text-xs text-gray-500 flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(images[currentImageIndex].event_date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </Fade>
        )}
      </div>
    </div>
  );
}