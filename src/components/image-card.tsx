// src/components/image-card.tsx
import Image from "next/image";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

export default function ImageCard({src, title, description, children}: {
    src: string,
    title: string,
    description: string,
    children?: ReactNode
}) {
    return (
        <Card className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden bg-white h-full flex flex-col">
            {/* Image container with fixed aspect ratio */}
            <div className="relative w-full aspect-[1/1.2] overflow-hidden bg-gray-100">
                <Image
                    src={src}
                    fill={true}
                    className="object-cover object-center transition-transform duration-500 hover:scale-105"
                    alt={title}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    priority={false}
                />
            </div>
            <CardHeader className="flex-1">
                <CardTitle className="text-lg font-bold text-primary">{title}</CardTitle>
                <CardDescription className="text-sm text-gray-600">{description}</CardDescription>
            </CardHeader>
            {children}
        </Card>
    );
}