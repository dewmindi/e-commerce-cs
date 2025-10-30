// Example in a _app.js or main layout component (Next.js)
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

// CSS for the loader (example, can be in a global CSS file or component-specific)
/*
.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #F5F5F5; // Light background
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: opacity 0.5s ease-out;
  opacity: 1;
  pointer-events: all;
}

.loader-overlay.hidden {
  opacity: 0;
  pointer-events: none; // Allow clicks through once hidden
}

.loader-spinner {
  width: 60px;
  height: 60px;
  border: 8px solid #007BFF; // Primary Blue
  border-top-color: #FFC107; // Vibrant Yellow
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

// For a more complex animation:
// You could use Lottie animations with a JSON file,
// or a more elaborate SVG animation.
*/

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => (url !== router.asPath) && setLoading(true);
    const handleComplete = (url) => (url === router.asPath) && setLoading(false);

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