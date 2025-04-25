"use client";

import { motion } from "framer-motion";
import ScrollIndicator from "./ScrollIndicator";

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-center space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-gray-800">Reference Stocker</h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="space-y-2 text-gray-600"
      >
        <p>
          学習に使った参考記事や動画のリンクを保存・共有するためのサイトです。
        </p>
        <p className="font-medium ">
          ログインして、学んだ知識をストックしよう！
        </p>
      </motion.div>
      <ScrollIndicator />
    </div>
  );
}
