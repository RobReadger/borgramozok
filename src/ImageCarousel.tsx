import React, { useState, useEffect, useRef } from "react";
import { Box, Paper } from "@mui/material";

// Define types for component props
interface ImageItem {
  src: string;
  alt?: string;
}

type ImageType = string | ImageItem;

interface ImageCarouselProps {
  images: ImageType[];
  autoplayInterval?: number;
  height?: number;
  width?: string | number;
  pauseOnHover?: boolean;
}

const AutoplayCarousel: React.FC<ImageCarouselProps> = ({
  images = [],
  autoplayInterval = 5000,
  height = 400,
  width = "100%",
  pauseOnHover = true,
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const maxSteps = images.length;
  const timerRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  // Update container width when component mounts or window resizes
  useEffect(() => {
    const updateWidth = (): void => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    // Initial width calculation
    updateWidth();

    // Recalculate on window resize
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  const advanceSlide = (): void => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  // Setup autoplay
  useEffect(() => {
    if (images.length > 1) {
      timerRef.current = window.setInterval(() => {
        advanceSlide();
      }, autoplayInterval);
    }

    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    };
  }, [autoplayInterval, images.length, activeStep]);

  // Pause autoplay on hover functions
  const pauseAutoplay = (): void => {
    if (pauseOnHover && timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resumeAutoplay = (): void => {
    if (pauseOnHover && images.length > 1 && timerRef.current === null) {
      timerRef.current = window.setInterval(() => {
        advanceSlide();
      }, autoplayInterval);
    }
  };

  // Helper function to get image src and alt
  const getImageProps = (image: ImageType): { src: string; alt: string } => {
    if (typeof image === "string") {
      return { src: image, alt: `Image ${activeStep + 1}` };
    }
    return { src: image.src, alt: image.alt || `Image ${activeStep + 1}` };
  };

  if (images.length === 0) {
    return (
      <Box
        sx={{
          height,
          width,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "grey.200",
        }}
      >
        No images to display
      </Box>
    );
  }

  return (
    <Box sx={{ width, maxWidth: "100%", borderRadius: "5px" }}>
      <Paper
        square
        elevation={3}
        sx={{
          position: "relative",
          overflow: "hidden",
          height,
          width: "100%",
          borderRadius: "5px",
        }}
        onMouseEnter={pauseAutoplay}
        onMouseLeave={resumeAutoplay}
        ref={containerRef}
      >
        {/* Fixed-width image track for consistent sliding */}
        <Box
          sx={{
            display: "flex",
            transition: "transform 0.8s ease",
            height: "100%",
            width: `${images.length * 100}%`,
            transform: containerWidth
              ? `translateX(-${activeStep * containerWidth}px)`
              : "none",
          }}
        >
          {images.map((image, index) => {
            const { src, alt } = getImageProps(image);
            const itemWidth = containerWidth
              ? `${containerWidth}px`
              : `${100 / images.length}%`;

            return (
              <Box
                key={index}
                sx={{
                  width: itemWidth,
                  height: "100%",
                  flexShrink: 0,
                  position: "relative",
                }}
              >
                <Box
                  component="img"
                  sx={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                  src={src}
                  alt={alt}
                />
              </Box>
            );
          })}
        </Box>
      </Paper>
    </Box>
  );
};

export default AutoplayCarousel;
