'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { MessageList } from '@/components/chat/MessageList';
import { MessageInput } from '@/components/chat/MessageInput';
import { TypingIndicator } from '@/components/chat/TypingIndicator';
import { useRealtimeMessages } from '@/hooks/useRealtimeMessages';
import { supabase } from '@/lib/supabase';
import { Profile } from '@/types/database';
import { ArrowLeft, User } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ChatPage() {
    const router = useRouter();
    const params = useParams();
    const recipientId = params.id as string;
    const { user, profile, loading: authLoading } = useAuth();
    const [recipient, setRecipient] = useState<Profile | null>(null);
    const [isTyping, setIsTyping] = useState(false);
    const [recipientTyping, setRecipientTyping] = useState(false);

    const { messages, loading, sendMessage, markAsRead, deleteMessage } = useRealtimeMessages(
        user?.id || '',
        recipientId
    );

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (!recipientId) return;

        fetchRecipient();

        // Subscribe to typing indicators
        const channel = supabase
            .channel(`typing:${recipientId}`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'typing_indicators',
                    filter: `user_id=eq.${recipientId}`,
                },
                (payload: any) => {
                    if (payload.new?.chat_with_id === user?.id) {
                        setRecipientTyping(payload.new?.is_typing || false);
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
            updateTypingStatus(false);
        };
    }, [recipientId, user]);

    // Mark messages as read
    useEffect(() => {
        messages
            .filter((msg) => msg.receiver_id === user?.id && !msg.is_read)
            .forEach((msg) => {
                markAsRead(msg.id);
            });
    }, [messages, user, markAsRead]);

    const fetchRecipient = async () => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', recipientId)
                .single();

            if (error) throw error;
            setRecipient(data);
        } catch (error) {
            console.error('Error fetching recipient:', error);
        }
    };

    const updateTypingStatus = async (typing: boolean) => {
        if (!user) return;

        try {
            await supabase.from('typing_indicators').upsert({
                user_id: user.id,
                chat_with_id: recipientId,
                is_typing: typing,
            });
        } catch (error) {
            console.error('Error updating typing status:', error);
        }
    };

    const handleSend = async (message: string) => {
        try {
            await sendMessage(message);
            updateTypingStatus(false);
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    const handleTyping = (typing: boolean) => {
        updateTypingStatus(typing);
    };

    const handleDelete = async (messageId: string) => {
        try {
            await deleteMessage(messageId);
        } catch (error) {
            console.error('Failed to delete message:', error);
        }
    };

    if (authLoading || loading || !recipient) {
        return <LoadingScreen />;
    }

    if (!user || !profile) {
        return null;
    }

    return (
        <div className="min-h-screen bg-black scanline">
            <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />

            <div className="relative max-w-5xl mx-auto p-4 h-screen flex flex-col">
                {/* Header */}
                <header className="mb-4">
                    <GlassPanel className="flex items-center justify-between py-4">
                        <div className="flex items-center gap-4">
                            <Link href="/dashboard">
                                <motion.button
                                    whileHover={{ scale: 1.05, x: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-2 text-neon-green hover:text-neon-green/80 transition-colors"
                                >
                                    <ArrowLeft className="w-6 h-6" />
                                </motion.button>
                            </Link>

                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 bg-neon-green/10 rounded-full flex items-center justify-center border-2 border-neon-green/50">
                                        <User className="w-5 h-5 text-neon-green" />
                                    </div>
                                    <div
                                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-dark-800 ${recipient.status === 'online'
                                                ? 'bg-neon-green'
                                                : 'bg-neon-green/30'
                                            }`}
                                    />
                                </div>
                                <div>
                                    <h2 className="font-mono font-bold text-neon-green">
                                        {recipient.username}
                                    </h2>
                                    <p className="text-xs text-neon-green/50 font-mono">
                                        {recipient.status === 'online'
                                            ? 'Online'
                                            : `Last seen: ${new Date(recipient.last_seen).toLocaleString()}`}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="text-xs text-neon-green/50 font-mono">
                            ENCRYPTED CHANNEL
                        </div>
                    </GlassPanel>
                </header>

                {/* Chat Area */}
                <div className="flex-1 overflow-hidden flex flex-col">
                    <GlassPanel className="flex-1 flex flex-col p-0 overflow-hidden">
                        {/* Messages */}
                        <MessageList
                            messages={messages}
                            currentUserId={user.id}
                            senderName={recipient.username}
                            onDeleteMessage={handleDelete}
                        />

                        {/* Typing Indicator */}
                        {recipientTyping && <TypingIndicator username={recipient.username} />}

                        {/* Input */}
                        <MessageInput onSend={handleSend} onTyping={handleTyping} />
                    </GlassPanel>
                </div>
            </div>
        </div>
    );
}
