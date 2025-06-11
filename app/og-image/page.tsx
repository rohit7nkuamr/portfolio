'use client';

import React from 'react';
import OgImageGenerator from '../../components/OgImageGenerator';

export default function OgImagePage() {
  return (
    <div className="w-full min-h-screen bg-black p-4">
      <h1 className="text-2xl font-bold mb-6 text-white">OpenGraph Image Generator</h1>
      <p className="text-gray-400 mb-8">
        Take a screenshot of this canvas and save it as og-image.png in the public folder
        for social media sharing previews.
      </p>
      <OgImageGenerator />
    </div>
  );
}
