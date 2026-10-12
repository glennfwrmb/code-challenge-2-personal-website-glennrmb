import { Suspense, useEffect, useRef, useState } from 'react';

type LazySectionProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export default function LazySection({
  children,
  fallback = null,
}: LazySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px 0px' },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef}>
      {isVisible && (
        <Suspense fallback={fallback}>{children}</Suspense>
      )}
    </div>
  );
}
