'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MessageInputProps {
    onSend: (message: string) => void;
    onTyping?: (isTyping: boolean) => void;
    disabled?: boolean;
}

export function MessageInput({ onSend, onTyping, disabled }: MessageInputProps) {
    const [message, setMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);

        if (!isTyping && e.target.value.length > 0) {
            setIsTyping(true);
            onTyping?.(true);
        } else if (isTyping && e.target.value.length === 0) {
            setIsTyping(false);
            onTyping?.(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || disabled) return;

        onSend(message.trim());
        setMessage('');
        setIsTyping(false);
        onTyping?.(false);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border-t border-neon-green/20">
            <div className="flex items-center gap-3">
                <input
                    type="text"
                    value={message}
                    onChange={handleChange}
                    placeholder="Type encrypted message..."
                    disabled={disabled}
                    className={cn(
                        'flex-1 px-4 py-3 bg-dark-800/50 border-2 border-neon-green/30',
                        'rounded-md font-mono text-neon-green placeholder:text-neon-green/30',
                        'focus:outline-none focus:border-neon-green focus:shadow-[0_0_15px_rgba(0,255,0,0.3)]',
                        'transition-all duration-300',
                        'disabled:opacity-50 disabled:cursor-not-allowed'
                    )}
                />
                <motion.button
                    type="submit"
                    disabled={!message.trim() || disabled}
                    whileHover={{ scale: disabled || !message.trim() ? 1 : 1.05 }}
                    whileTap={{ scale: disabled || !message.trim() ? 1 : 0.95 }}
                    className={cn(
                        'p-3 bg-neon-green/10 border-2 border-neon-green rounded-md',
                        'text-neon-green hover:bg-neon-green/20',
                        'shadow-[0_0_10px_rgba(0,255,0,0.3)] hover:shadow-[0_0_20px_rgba(0,255,0,0.5)]',
                        'transition-all duration-300',
                        'disabled:opacity-50 disabled:cursor-not-allowed'
                    )}
                >
                    <Send className="w-5 h-5" />
                </motion.button>
            </div>
        </form>
    );
}
