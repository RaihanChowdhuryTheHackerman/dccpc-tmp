// File: src/components/ui/scroll-area.tsx
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  width?: string
  height?: string
}

export function ScrollArea({ 
  children, 
  className, 
  width = "100%", 
  height = "300px", 
  ...props 
}: ScrollAreaProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={scrollRef}
      style={{ width, height }}
      className={cn(
        "relative overflow-hidden", 
        className
      )}
      {...props}
    >
      <div 
        className="h-full w-full overflow-y-auto pr-2 
        scrollbar-thin scrollbar-track-gray-100 
        scrollbar-thumb-primary/50 hover:scrollbar-thumb-primary/70 
        break-words"
      >
        {children}
      </div>
    </div>
  )
}