"use client"

import { motion } from "framer-motion";

interface PathData {
    path: string;
    delay: number;
}

export default function AnimatedDots({ paths }: { paths: PathData[] }) {
    return paths.map((pathData, index) => (
        <motion.circle
            key={`dot-${index}`}
            r="3"
            fill="rgba(124, 58, 237, 0.8)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
                duration: 3,
                delay: pathData.delay,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
            }}
        >
            <animateMotion path={pathData.path} dur="3s" repeatCount="indefinite" begin={`${pathData.delay}s`} />
        </motion.circle>
    ));
}