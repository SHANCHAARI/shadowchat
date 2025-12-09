'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Message } from '@/types/database';

export function useRealtimeMessages(userId: string, recipientId: string) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchMessages = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .or(`and(sender_id.eq.${userId},receiver_id.eq.${recipientId}),and(sender_id.eq.${recipientId},receiver_id.eq.${userId})`)
                .order('created_at', { ascending: true });

            if (error) throw error;
            setMessages(data || []);
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    }, [userId, recipientId]);

    useEffect(() => {
        fetchMessages();

        // Subscribe to new messages
        const channel = supabase
            .channel(`messages:${userId}:${recipientId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: `or(and(sender_id=eq.${userId},receiver_id=eq.${recipientId}),and(sender_id=eq.${recipientId},receiver_id=eq.${userId}))`,
                },
                (payload) => {
                    setMessages((current) => [...current, payload.new as Message]);
                }
            )
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'messages',
                },
                (payload) => {
                    setMessages((current) =>
                        current.map((msg) =>
                            msg.id === (payload.new as Message).id ? (payload.new as Message) : msg
                        )
                    );
                }
            )
            .on(
                'postgres_changes',
                {
                    event: 'DELETE',
                    schema: 'public',
                    table: 'messages',
                },
                (payload) => {
                    setMessages((current) =>
                        current.filter((msg) => msg.id !== (payload.old as Message).id)
                    );
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [userId, recipientId, fetchMessages]);

    const sendMessage = async (content: string) => {
        try {
            const { error } = await supabase.from('messages').insert({
                sender_id: userId,
                receiver_id: recipientId,
                content,
            });

            if (error) throw error;
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    };

    const markAsRead = async (messageId: string) => {
        try {
            const { error } = await supabase
                .from('messages')
                .update({ is_read: true })
                .eq('id', messageId);

            if (error) throw error;
        } catch (error) {
            console.error('Error marking message as read:', error);
        }
    };

    const deleteMessage = async (messageId: string) => {
        try {
            const { error } = await supabase
                .from('messages')
                .delete()
                .eq('id', messageId);

            if (error) throw error;
        } catch (error) {
            console.error('Error deleting message:', error);
            throw error;
        }
    };

    return {
        messages,
        loading,
        sendMessage,
        markAsRead,
        deleteMessage,
    };
}
