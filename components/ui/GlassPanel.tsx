'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface GlassPanelProps {
    children: React.ReactNode;
    className?: string;
    animate?: boolean;
}

export function GlassPanel({ children, className, animate = true }: GlassPanelProps) {
    const Component = animate ? motion.div : 'div';

    return (
        <Component
            {...(animate && {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5 },
            })}
            className={cn(
                'glass rounded-lg p-6',
                'border border-neon-green/20',
                'shadow-[0_0_15px_rgba(0,255,0,0.1)]',
                className
            )}
        >
            {children}
        </Component>
    );
}
