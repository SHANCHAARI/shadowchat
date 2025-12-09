'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Message } from '@/types/database';
import { Check, CheckCheck, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
    message: Message;
    isSent: boolean;
    senderName?: string;
    onDelete?: (messageId: string) => void;
}

export function MessageBubble({ message, isSent, senderName, onDelete }: MessageBubbleProps) {
    const time = new Date(message.created_at).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <motion.div
            initial={{ opacity: 0, x: isSent ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={cn(
                'flex items-end gap-2 group',
                isSent ? 'flex-row-reverse' : 'flex-row'
            )}
        >
            <div
                className={cn(
                    'max-w-[70%] px-4 py-3 rounded-lg relative',
                    'border transition-all duration-300',
                    isSent
                        ? 'bg-neon-green/10 border-neon-green/30 text-neon-green'
                        : 'bg-dark-700/50 border-neon-blue/30 text-neon-blue'
                )}
            >
                {!isSent && senderName && (
                    <p className="text-xs text-neon-blue/70 font-mono mb-1 font-bold">
                        {senderName}
                    </p>
                )}
                <p className="font-mono text-sm break-words">{message.content}</p>
                <div className="flex items-center gap-2 mt-2 text-xs opacity-70">
                    <span>{time}</span>
                    {isSent && (
                        <span>
                            {message.is_read ? (
                                <CheckCheck className="w-3 h-3" />
                            ) : (
                                <Check className="w-3 h-3" />
                            )}
                        </span>
                    )}
                </div>

                {/* Delete button (only for sent messages) */}
                {isSent && onDelete && (
                    <button
                        onClick={() => onDelete(message.id)}
                        className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <Trash2 className="w-4 h-4 text-neon-red hover:text-neon-red/70" />
                    </button>
                )}
            </div>
        </motion.div>
    );
}

interface MessageListProps {
    messages: Message[];
    currentUserId: string;
    senderName?: string;
    onDeleteMessage?: (messageId: string) => void;
}

export function MessageList({ messages, currentUserId, senderName, onDeleteMessage }: MessageListProps) {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
                {messages.map((message) => (
                    <MessageBubble
                        key={message.id}
                        message={message}
                        isSent={message.sender_id === currentUserId}
                        senderName={message.sender_id !== currentUserId ? senderName : undefined}
                        onDelete={onDeleteMessage}
                    />
                ))}
            </AnimatePresence>
            <div ref={bottomRef} />
        </div>
    );
}
