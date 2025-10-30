// components/MaintenanceOverlay.jsx
'use client';
import React from 'react';

const MaintenanceOverlay = () => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-3xl flex items-center justify-center text-white p-6">
      <div className="text-center max-w-xl">
        <h1 className="text-3xl font-bold mb-4">We're currently working on a new interface</h1>
        <p className="text-lg">
          Due to this, some features are temporarily unavailable on the site.
          <br />
          We’ll be back soon — thank you for your patience.
          <br />
          We apologize for the inconvenience.
        </p>
      </div>
    </div>
  );
};

export default MaintenanceOverlay;
