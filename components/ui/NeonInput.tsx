'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface NeonInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: LucideIcon;
}

export function NeonInput({
    label,
    error,
    icon: Icon,
    className,
    ...props
}: NeonInputProps) {
    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-mono text-neon-green uppercase tracking-wider">
                    {label}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neon-green/50">
                        <Icon className="w-5 h-5" />
                    </div>
                )}
                <motion.input
                    whileFocus={{ scale: 1.01 }}
                    className={cn(
                        'w-full px-4 py-3 bg-dark-800/50 border-2 border-neon-green/30',
                        'rounded-md font-mono text-neon-green placeholder:text-neon-green/30',
                        'focus:outline-none focus:border-neon-green focus:shadow-[0_0_15px_rgba(0,255,0,0.3)]',
                        'transition-all duration-300',
                        Icon && 'pl-12',
                        error && 'border-neon-red/50 focus:border-neon-red',
                        className
                    )}
                    {...props}
                />
            </div>
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-neon-red font-mono"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
}
