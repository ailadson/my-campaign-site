"use client"

import { useState, useEffect, useCallback } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function PhotoGallery() {
  const [open, setOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const images = [
    "https://res.cloudinary.com/dakqk73zf/image/upload/v1739829173/FB_IMG_1671455823155-EDIT_fsad6p.jpg",
    "https://res.cloudinary.com/dakqk73zf/image/upload/v1739829173/20241130_155507_udvjaq.jpg",
    "https://res.cloudinary.com/dakqk73zf/image/upload/v1739829173/20240118_201145_t8lck1.jpg",
    "https://res.cloudinary.com/dakqk73zf/image/upload/v1739829172/20210701_094054_zfgce4.jpg",
    "https://res.cloudinary.com/dakqk73zf/image/upload/v1739828462/unnamed_1_r7cvoy.jpg",
    "https://res.cloudinary.com/dakqk73zf/image/upload/v1739828462/unnamed_gd4vqh.jpg",
    "https://res.cloudinary.com/dakqk73zf/image/upload/v1739064092/OPT_B_edzxzg.png",
  ]

  const navigateImage = useCallback((direction: "prev" | "next") => {
    setCurrentIndex((prevIndex) => {
      if (direction === "prev") {
        return prevIndex > 0 ? prevIndex - 1 : images.length - 1
      } else {
        return prevIndex < images.length - 1 ? prevIndex + 1 : 0
      }
    })
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return
      if (e.key === "ArrowLeft") navigateImage("prev")
      if (e.key === "ArrowRight") navigateImage("next")
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, navigateImage])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => {
              setCurrentIndex(index)
              setOpen(true)
            }}
            className="aspect-square relative overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity w-full max-w-[300px]"
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`Gallery image ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] bg-white">
          <div className="relative w-full h-full min-h-[50vh]">
            <img
              src={images[currentIndex] || "/placeholder.svg"}
              alt={`Gallery image ${currentIndex + 1}`}
              className="absolute inset-0 w-full h-full object-contain"
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[rgba(0,0,0,0.5)]"
              onClick={() => navigateImage("prev")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[rgba(0,0,0,0.5)]"
              onClick={() => navigateImage("next")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

