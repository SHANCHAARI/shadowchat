'use client';

import { motion } from 'framer-motion';

export function LoadingScreen() {
    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
            <div className="text-center">
                <motion.div
                    className="relative w-24 h-24 mx-auto mb-8"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                    <div className="absolute inset-0 border-4 border-neon-green/20 rounded-full" />
                    <div className="absolute inset-0 border-4 border-transparent border-t-neon-green rounded-full animate-spin" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="space-y-2"
                >
                    <h2 className="text-2xl font-mono text-neon-green neon-text uppercase tracking-widest">
                        ShadowChat
                    </h2>
                    <p className="text-sm font-mono text-neon-green/70">
                        Initializing secure connection...
                    </p>
                </motion.div>

                <div className="mt-8 flex justify-center gap-2">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="w-2 h-2 bg-neon-green rounded-full"
                            animate={{ y: [0, -10, 0] }}
                            transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: i * 0.2,
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
