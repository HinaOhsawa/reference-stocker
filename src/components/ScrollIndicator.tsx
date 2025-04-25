"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ScrollIndicator() {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [0, 10, 0] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="flex justify-center mt-8"
    >
      <ChevronDown className="w-6 h-6 text-gray-400 animate-bounce" />
    </motion.div>
  );
}
