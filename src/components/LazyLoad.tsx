"use client";
import { useEffect, useRef, useState, ReactNode } from "react";

interface LazyLoadProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function LazyLoad({ children, fallback = null }: LazyLoadProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Make sure the element exists before initializing the observer
    const currentTarget = containerRef.current;
    if (!currentTarget) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // 2. Stop observing immediately so it never triggers a second time
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "150px" }, // Starts loading slightly before the user reaches it for a smoother experience
    );

    // 3. Start observing our target div
    observer.observe(currentTarget);

    // 4. Cleanup function to disconnect the observer if the component unmounts early
    return () => {
      observer.disconnect();
    };
  }, []); // Empty array ensures this only runs once when the component mounts

  return <div ref={containerRef}>{isVisible ? children : fallback}</div>;
}
