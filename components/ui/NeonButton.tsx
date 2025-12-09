'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    isLoading?: boolean;
    children: React.ReactNode;
}

export function NeonButton({
    variant = 'primary',
    isLoading,
    children,
    className,
    disabled,
    ...props
}: NeonButtonProps) {
    const variantStyles = {
        primary: 'bg-neon-green/10 hover:bg-neon-green/20 border-neon-green text-neon-green',
        secondary: 'bg-neon-blue/10 hover:bg-neon-blue/20 border-neon-blue text-neon-blue',
        danger: 'bg-neon-red/10 hover:bg-neon-red/20 border-neon-red text-neon-red',
    };

    return (
        <motion.button
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            className={cn(
                'relative px-6 py-3 rounded-md font-mono uppercase tracking-wider',
                'border-2 transition-all duration-300',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'shadow-[0_0_10px_currentColor] hover:shadow-[0_0_20px_currentColor]',
                variantStyles[variant],
                className
            )}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                </span>
            ) : (
                children
            )}
        </motion.button>
    );
}
