"use client"

import { useEffect, useRef, useState } from "react";

export function useScrollAnimation({ threshold = 0.1 }: { threshold?: number }) {
  const ref = useRef<HTMLDivElement>(null); // Explicitly type as HTMLDivElement
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
}

export function useStaggeredAnimation(itemCount: number, delay = 100) {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  useEffect(() => {
    if (isVisible) {
      const timeouts: NodeJS.Timeout[] = []

      for (let i = 0; i < itemCount; i++) {
        const timeout = setTimeout(() => {
          setVisibleItems((prev) => [...prev, i])
        }, i * delay)
        timeouts.push(timeout)
      }

      return () => {
        timeouts.forEach(clearTimeout)
      }
    }
  }, [isVisible, itemCount, delay])

  return { ref, visibleItems, isVisible }
}
