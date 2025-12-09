'use client';

import { motion } from 'framer-motion';

interface TypingIndicatorProps {
    username?: string;
}

export function TypingIndicator({ username }: TypingIndicatorProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex items-center gap-2 px-4 py-2 text-sm text-neon-green/70 font-mono"
        >
            <span>{username || 'Agent'} is typing</span>
            <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="w-1.5 h-1.5 bg-neon-green/70 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.2,
                        }}
                    />
                ))}
            </div>
        </motion.div>
    );
}
