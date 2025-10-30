// components/CursorFollower.tsx
'use client'; // This component needs to run on the client-side as it interacts with the browser's mouse events.

import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

const CursorFollower = () => {
  // We'll use a state to ensure the component only renders client-side.
  // This prevents issues with server-side rendering trying to access 'window'.
  const [isClient, setIsClient] = useState(false);

  // useSpring provides a smoothly animated value, perfect for cursor following.
  // We'll use it for both X and Y coordinates.
  const mouseX = useSpring(0, { stiffness: 100, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 100, damping: 20 });

  useEffect(() => {
    // Set isClient to true once the component mounts on the client.
    setIsClient(true);

    const handleMouseMove = (e: MouseEvent) => {
      // Update the motion values with the current mouse position.
      // useSpring will then animate the circle to these new positions.
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    // Add the mousemove event listener to the entire window.
    window.addEventListener('mousemove', handleMouseMove);

    // Clean up the event listener when the component unmounts.
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]); // Dependencies ensure the latest motion values are used in the event handler.

  // Only render the cursor follower if we are on the client side.
  if (!isClient) {
    return null;
  }

  return (
    <motion.div
      className="fixed z-[9999] w-6 h-6 rounded-full bg-[#ebc247fc] pointer-events-none opacity-60"
      style={{
        left: mouseX, // X position from mouseX motion value
        top: mouseY,  // Y position from mouseY motion value
        // These translate values ensure the center of the circle follows the cursor,
        // rather than its top-left corner.
        translateX: '-50%',
        translateY: '-50%',
      }}
    />
  );
};

export default CursorFollower;