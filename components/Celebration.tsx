"use client";

import React from "react";
import { motion } from "framer-motion";

const Celebration = () => {
  return (
    <div className="overflow-hidden min-h-screen">
      <motion.div 
        initial={{y: -100, x: 60, opacity: 0}}
        animate={{y: 600, x: 60, opacity: [0, 1, 0]}}
        transition={{duration: 1.5, repeat: Infinity, repeatType: "loop", repeatDelay: 0.2, delay: 0}}
        className="text-2xl"
      >
        🥳
    </motion.div>
    <motion.div 
        initial={{y: -100, x: 250, opacity: 0}}
        animate={{y: 800, x:250, opacity: [0, 1, 0]}}
        transition={{duration: 2, repeat: Infinity, repeatType: "loop", repeatDelay: 0.3, delay: 0.1}}
        className="text-3xl"
      >
        🎉
    </motion.div>
    <motion.div 
        initial={{y: -100, x: 150, opacity: 0}}
        animate={{y: 700, x:150, opacity: [0, 1, 0]}}
        transition={{duration: 1.7, repeat: Infinity, repeatType: "loop", repeatDelay: 0.3, delay: 0.4}}
        className="text-xl"
      >
        🥳
    </motion.div>
    <motion.div 
        initial={{y: -100, x: 500, opacity: 0}}
        animate={{y: 300, x:500, opacity: [0, 1, 0]}}
        transition={{duration: 1.2, repeat: Infinity, repeatType: "loop", repeatDelay: 0.4, delay: 0.3}}
        className="text-2xl"
      >
        ✨
    </motion.div>
    <motion.div 
        initial={{y: -100, x: 600, opacity: 0}}
        animate={{y: 400, x:600, opacity: [0, 1, 0]}}
        transition={{duration: 1.4, repeat: Infinity, repeatType: "loop", repeatDelay: 0.1, delay: 0.7}}
        className="text-lg"
      >
        🎉
    </motion.div>
    <motion.div 
        initial={{y: -100, x: 850, opacity: 0}}
        animate={{y: 600, x:850, opacity: [0, 1, 0]}}
        transition={{duration: 1.7, repeat: Infinity, repeatType: "loop", repeatDelay: 0.2, delay: 0.5}}
        className="text-2xl"
      >
        🥳
    </motion.div>
    <motion.div 
        initial={{y: -100, x: 1050, opacity: 0}}
        animate={{y: 800, x:1050, opacity: [0, 1, 0]}}
        transition={{duration: 1.9, repeat: Infinity, repeatType: "loop", repeatDelay: 0.1, delay: 0.3}}
        className="text-3xl"
      >
        🥳
    </motion.div>
    <motion.div 
        initial={{y: -100, x: 1150, opacity: 0}}
        animate={{y: 800, x:1150, opacity: [0, 1, 0]}}
        transition={{duration: 1.7, repeat: Infinity, repeatType: "loop", repeatDelay: 0.3, delay: 0.4}}
        className="text-xl"
      >
        🎉
    </motion.div>
    <motion.div 
        initial={{y: -100, x: 1300, opacity: 0}}
        animate={{y: 800, x:1300, opacity: [0, 1, 0]}}
        transition={{duration: 1.9, repeat: Infinity, repeatType: "loop", repeatDelay: 0.2, delay: 0.1}}
        className="text-3xl"
      >
        ✨
    </motion.div>
    </div>
  );
};

export default Celebration;
