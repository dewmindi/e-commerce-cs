// app/components/GlobalLoader.tsx
'use client'; // This directive marks it as a client component

import React, { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function GlobalLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // This effect runs on every route change (pathname or searchParams change)
    // We set loading to true immediately on change, then false after a short delay
    // to ensure the loader is visible even for very fast page loads.

    // On route change start (or whenever pathname/searchParams update)
    setLoading(true);

    // Set a timeout to hide the loader. You might adjust this delay
    // based on typical page load times or desired animation length.
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Loader visible for at least 500ms

    // Clean up the timer on component unmount or if dependencies change again
    return () => clearTimeout(timer);

  }, [pathname, searchParams]); // Re-run effect whenever route changes

  if (!loading) return null; // Don't render if not loading

  return (
    <div className="global-loader-overlay flex items-center justify-center fixed inset-0 bg-[#F5F5F5] z-[9999] transition-opacity duration-500 opacity-100 pointer-events-auto">
      <div className="global-loader-spinner w-16 h-16 border-8 border-[#007BFF] border-t-[#FFC107] rounded-full animate-spin"></div>
      <span className="sr-only">Loading content...</span>
    </div>
  );
}