'use client'

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Camera, CalendarIcon, ArrowRight, ImageIcon, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Fade, Zoom } from "react-awesome-reveal";
import { Image as ImageType } from "@/lib/types";

const YEARS_PER_PAGE = 8;

export default function GalleryPage() {
  const [galleryData, setGalleryData] = useState<{ [year: string]: ImageType[] }>({});
  const [years, setYears] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      setError(null);
      try {
        // Request all images by setting a large page size
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/club/gallery/?page_size=1000`;
        const res = await fetch(apiUrl);
        if (!res.ok) {
          throw new Error(`API request failed: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        
        // Handle both paginated and non-paginated responses
        let imageResults: ImageType[];
        if (Array.isArray(data)) {
          // Non-paginated response (direct array)
          imageResults = data;
        } else if (data.results && Array.isArray(data.results)) {
          // Paginated response (object with results array)
          imageResults = data.results;
        } else {
          throw new Error("Invalid data structure received from API.");
        }

        console.log("Total images received:", imageResults.length);
        
        const grouped = imageResults.reduce<Record<string, ImageType[]>>((acc, image) => {
          const eventDate = image.event_date ? new Date(image.event_date) : new Date();
          const year = eventDate.getFullYear().toString();
          if (!acc[year]) acc[year] = [];
          acc[year].push(image);
          return acc;
        }, {});

        const sortedYears = Object.keys(grouped).sort((a, b) => parseInt(b) - parseInt(a));
        
        setGalleryData(grouped);
        setYears(sortedYears);
      } catch (error) {
        console.error("Error fetching gallery data:", error);
        setError(error instanceof Error ? error.message : "An unknown error occurred");
        setGalleryData({});
        setYears([]);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedImage(null);
    }
  };

  // Helper function to open dialog (sets state)
  const openDialogWithImage = (image: ImageType) => {
    setSelectedImage(image);
  };

  // Calculate pagination
  const totalPages = Math.ceil(years.length / YEARS_PER_PAGE);
  const startIndex = (currentPage - 1) * YEARS_PER_PAGE;
  const visibleYears = years.slice(startIndex, startIndex + YEARS_PER_PAGE);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top of the gallery section
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
               These images capture the essence of our programming club&apos;s activities over the years.
             </p>
           </div>
         </Fade>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <RefreshCw className="animate-spin h-10 w-10 text-primary mb-4" />
            <p className="text-gray-500">Loading gallery...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
             <div className="flex flex-col items-center justify-center py-16 text-center bg-red-50 border border-red-200 rounded-lg">
                 <ImageIcon className="h-12 w-12 text-red-400 mb-4" />
                 <h3 className="text-xl font-medium text-red-700 mb-2">Failed to Load Gallery</h3>
                 <p className="text-red-600 text-sm max-w-md mb-4">{error}</p>
                 <Button onClick={() => window.location.reload()} variant="destructive" size="sm">
                    Try Again
                 </Button>
             </div>
         )}

        {/* Empty State */}
        {!loading && !error && years.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl border border-gray-100">
            <ImageIcon className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">No Images Available</h3>
            <p className="text-gray-500 text-center max-w-md">
              Our gallery is currently empty. Please check back later for updates.
            </p>
          </div>
        )}

        {/* Pagination Info */}
        {!loading && !error && years.length > 0 && (
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-500">
              Showing years {startIndex + 1}-{Math.min(startIndex + YEARS_PER_PAGE, years.length)} of {years.length}
            </p>
          </div>
        )}

        {/* Gallery Content */}
        {!loading && !error && visibleYears.length > 0 && (
          <div className="space-y-20">
            {visibleYears.map((year) => (
              <div key={year} className="relative">
                {/* Year Badge and View All button */}
                <div className="relative flex justify-between items-center border-b border-gray-200 mb-8 mt-12 pb-2">
                   <div className="flex items-center">
                     <Badge variant="outline" className="bg-white border-primary/30 shadow-sm px-3 py-1.5 text-base font-bold">
                       <CalendarIcon className="w-4 h-4 mr-2 text-primary" />
                       {year}
                     </Badge>
                   </div>
                   <Button asChild variant="outline" size="sm" className="border-primary/30 hover:bg-primary/5">
                     <Link href={`/gallery/${year}`} className="flex items-center text-xs md:text-sm">
                       View All ({galleryData[year]?.length || 0})
                       <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4" />
                     </Link>
                   </Button>
                 </div>

                {/* Gallery Grid - Uses simple clickable elements */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
                  {galleryData[year]?.slice(0, 4).map((image, index) => (
                    <Zoom key={image.id} delay={index * 50} duration={500} triggerOnce>
                      {/* Use a div or button as the clickable element */}
                      {/* REMOVED DialogTrigger */}
                      <div
                        className="group aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer relative shadow-md hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50" // Added focus styles
                        // Call helper function onClick
                        onClick={() => openDialogWithImage(image)}
                        role="button" // Accessibility
                        tabIndex={0} // Accessibility: Make it focusable
                        // Accessibility: Allow activation with Enter/Space
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDialogWithImage(image); } }}
                      >
                        <Image
                          src={image.image}
                          alt={image.title || 'Gallery image thumbnail'}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-110 pointer-events-none" // Prevent image stealing focus/clicks
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end pointer-events-none"> {/* // pointer-events-none */}
                          <h3 className="text-white font-medium line-clamp-2 text-sm">
                            {image.title}
                          </h3>
                        </div>
                      </div>
                    </Zoom>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {!loading && !error && totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 h-auto"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => goToPage(page)}
                  className={`h-8 w-8 p-0 ${page === currentPage ? 'bg-primary text-white' : 'text-gray-600'}`}
                >
                  {page}
                </Button>
              ))}
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 h-auto"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}

        {/* Single Dialog Instance - Controlled by state */}
        <Dialog open={!!selectedImage} onOpenChange={handleOpenChange}>
          <DialogContent className="max-w-4xl w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-[80vw] p-0 overflow-hidden bg-white border-none rounded-xl shadow-2xl max-h-[90vh] flex flex-col">
            {selectedImage && ( // Render content only if an image is selected
              <>
                <DialogTitle className="sr-only">{selectedImage.title}</DialogTitle>
                <DialogDescription className="sr-only">
                  {selectedImage.description || `View image of ${selectedImage.title} taken on ${new Date(selectedImage.event_date).toLocaleDateString()}`}
                </DialogDescription>
                {/* Image display area */}
                <div className="relative w-full h-[60vh] sm:h-[65vh] md:h-[70vh] bg-gray-100 flex items-center justify-center overflow-hidden">
                  <Image
                    src={selectedImage.image}
                    alt={selectedImage.title || 'Gallery image details'}
                    fill
                    sizes="95vw"
                    className="object-contain"
                    priority
                    quality={90}
                  />
                </div>
                {/* Content area below image */}
                <div className="p-4 md:p-6 border-t border-gray-200 flex-shrink-0 overflow-y-auto max-h-[30vh]">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1 sm:mb-0 break-words">
                      {selectedImage.title}
                    </h3>
                    {selectedImage.event_date && (
                      <div className="flex-shrink-0 px-3 py-1 bg-gray-100 rounded-full text-xs sm:text-sm text-gray-600 items-center inline-flex">
                        <CalendarIcon className="w-3 h-3 mr-1.5 text-gray-500" />
                        {new Date(selectedImage.event_date).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'short', day: 'numeric'
                        })}
                      </div>
                    )}
                  </div>
                  {selectedImage.description && (
                    <p className="mt-2 text-gray-600 text-sm break-words">
                      {selectedImage.description}
                    </p>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}