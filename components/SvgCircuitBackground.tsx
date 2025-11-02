"use client";

import { motion } from "framer-motion";

export function SvgNeuralNetworkBackground() {
  const nodes = [
    { x: 150, y: 200, delay: 0 },
    { x: 400, y: 150, delay: 0.2 },
    { x: 650, y: 250, delay: 0.4 },
    { x: 300, y: 400, delay: 0.6 },
    { x: 550, y: 450, delay: 0.8 },
    { x: 800, y: 350, delay: 1.0 },
    { x: 200, y: 600, delay: 1.2 },
    { x: 450, y: 650, delay: 1.4 },
    { x: 700, y: 550, delay: 1.6 },
    { x: 900, y: 700, delay: 1.8 },
  ];

  const connections = [
    [0, 1],
    [1, 2],
    [0, 3],
    [3, 4],
    [4, 2],
    [2, 5],
    [3, 6],
    [4, 7],
    [7, 8],
    [8, 9],
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        className="w-full h-full opacity-25"
        viewBox="0 0 1000 800"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Connection lines */}
        {connections.map(([a, b], i) => {
          const start = nodes[a];
          const end = nodes[b];
          return (
            <motion.line
              key={i}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke="rgba(139,92,246,0.3)"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0.1, 0.6, 0.1] }}
              transition={{
                duration: 3,
                delay: i * 0.2,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            />
          );
        })}

        {/* Glowing nodes */}
        {nodes.map((node, i) => (
          <g key={i}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="5"
              fill="rgba(167,139,250,0.9)"
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
              transition={{
                duration: 2,
                delay: node.delay,
                repeat: Infinity,
              }}
            />
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="10"
              stroke="rgba(167,139,250,0.4)"
              fill="none"
              animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{
                duration: 3,
                delay: node.delay,
                repeat: Infinity,
              }}
            />
          </g>
        ))}

        {/* Moving pulse along connections */}
        {connections.map(([a, b], i) => {
          const start = nodes[a];
          const end = nodes[b];
          const dx = end.x - start.x;
          const dy = end.y - start.y;
          const path = `M${start.x},${start.y} L${end.x},${end.y}`;

          return (
            <motion.circle
              key={`pulse-${i}`}
              r="3"
              fill="rgba(167,139,250,0.8)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              <animateMotion
                path={path}
                dur="2.5s"
                repeatCount="indefinite"
                begin={`${i * 0.3}s`}
              />
            </motion.circle>
          );
        })}
      </svg>
    </div>
  );
}
