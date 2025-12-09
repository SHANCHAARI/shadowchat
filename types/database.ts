export interface Profile {
    id: string;
    username: string;
    avatar_url?: string;
    status: 'online' | 'offline' | 'away';
    last_seen: string;
    created_at: string;
    updated_at: string;
}

export interface Message {
    id: string;
    sender_id: string;
    receiver_id: string;
    content: string;
    is_read: boolean;
    created_at: string;
    updated_at: string;
}

export interface TypingIndicator {
    id: string;
    user_id: string;
    chat_with_id: string;
    is_typing: boolean;
    updated_at: string;
}

export interface ChatConversation {
    profile: Profile;
    lastMessage?: Message;
    unreadCount: number;
}
