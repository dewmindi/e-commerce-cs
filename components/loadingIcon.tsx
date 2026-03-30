// Example in a _app.js or main layout component (Next.js)
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';


function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => (url !== router.asPath) && setLoading(true);
    const handleComplete = (url: string) => (url === router.asPath) && setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <>
      {loading && (
        <div className="loader-overlay flex items-center justify-center fixed inset-0 bg-[#F5F5F5] z-[9999] transition-opacity duration-500">
          <div className="loader-spinner w-16 h-16 border-8 border-[#007BFF] border-t-[#FFC107] rounded-full animate-spin"></div>
          {/* Optional: Add your logo or a subtle text below the spinner */}
          <span className="sr-only">Loading projects...</span>
        </div>
      )}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;