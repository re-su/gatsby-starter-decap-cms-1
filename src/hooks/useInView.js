import { useEffect, useRef, useState } from "react";

export function useInView(options = {}) {
  const ref = useRef(null);
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    if (!ref.current || hasBeenInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasBeenInView(true);
          observer.disconnect(); // Stop observing after it's visible once
        }
      },
      options
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, hasBeenInView, options]);

  return [ref, hasBeenInView];
}
