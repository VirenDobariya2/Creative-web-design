"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// interface LoadingScreenProps {
//   onLoadingComplete: () => void;
// }

export default function LoadingScreen({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onLoadingComplete(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-white z-50 flex flex-col justify-between p-8"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-4xl md:text-6xl font-bold text-black">
          creative web
          <span className="text-green-400 text-6xl animate-pulse">.</span>design
        </h1>
        <div className="text-right">
          <h2 className="text-2xl font-medium">India</h2>
          <p className="text-gray-500">India</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-16">
        <motion.div
          className="w-full bg-gray-200 rounded-full h-2 mb-4"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
        <div className="flex justify-between w-full text-black text-xl">
          <span>Loading...</span>
          <span className="text-3xl font-bold">{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
}
