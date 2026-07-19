// ============================================================
//  GalleryLightbox — Full-screen image viewer for gallery items
//  Extracted from JourneyPage. Behaviour-preserving.
// ============================================================
'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import type { GalleryItem } from '@/data/types';

interface GalleryLightboxProps {
  item: GalleryItem | null;
  isLight: boolean;
  onClose: () => void;
}

export default function GalleryLightbox({ item, isLight, onClose }: GalleryLightboxProps) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="relative h-[70vh] w-full max-w-4xl">
            <Image
              src={item.image}
              alt={item.caption}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-contain rounded-2xl shadow-2xl"
            />
          </div>
          <p className={`font-body text-sm ${isLight ? 'text-black/85' : 'text-[#f4e8d3]/70'} mt-4 text-center max-w-md`}>
            {item.caption}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
