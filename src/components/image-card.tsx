// src/components/image-card.tsx
import Image from "next/image";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"; // Make sure this path is correct
import { ReactNode } from "react";

// Define the props, explicitly adding 'alt'
interface ImageCardProps {
    src: string;
    alt: string; // Added explicit alt prop
    title: string;
    description: string;
    children?: ReactNode; // For footer or other content passed in
}

// Use the interface for props typing
export default function ImageCard({ src, alt, title, description, children }: ImageCardProps) {
    return (
        <Card className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden bg-white h-full flex flex-col">
            {/* Image container with fixed aspect ratio */}
            <div className="relative w-full aspect-[1/1.2] overflow-hidden bg-gray-100">
                <Image
                    src={src}
                    fill={true}
                    className="object-cover object-center transition-transform duration-500 hover:scale-105"
                    alt={alt} // Use the dedicated 'alt' prop here
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" // Keep existing sizes or adjust as needed
                    priority={false} // Keep priority false unless these are critical above-the-fold images on load
                    // Consider adding placeholder="blur" and blurDataURL="..." for better loading experience
                />
            </div>
            <CardHeader className="flex-1 p-4 sm:p-6"> {/* Added padding for consistency */}
                <CardTitle className="text-lg font-bold text-primary mb-1">{title}</CardTitle> {/* Added margin-bottom */}
                <CardDescription className="text-sm text-gray-600 line-clamp-3">{description}</CardDescription> {/* Added line-clamp */}
            </CardHeader>
            {/* Render children (like CardFooter) if provided */}
            {children}
        </Card>
    );
}