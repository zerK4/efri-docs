// components/PageTransition.tsx
"use client";

import { motion } from "framer-motion";

export default function PageTransition() {
  return (
    <motion.div
      className='fixed top-0 left-0 w-full h-full bg-black origin-bottom'
      initial={{ scaleY: 0 }}
      animate={{
        scaleY: [0, 1, 1, 0],
        originY: ["100%", "100%", "0%", "0%"],
      }}
      transition={{
        duration: 1.5,
        times: [0, 0.4, 0.6, 1],
        ease: "easeInOut",
      }}
      onAnimationComplete={() => {
        // Animation completed
      }}
    />
  );
}
