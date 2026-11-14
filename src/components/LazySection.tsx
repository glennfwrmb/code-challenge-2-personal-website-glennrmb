
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

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '300px 0px',
        threshold: 0,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={isVisible ? 'w-full' : 'w-full min-h-[200px]'}
    >
      {isVisible && (
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      )}
    </div>
  );
}
