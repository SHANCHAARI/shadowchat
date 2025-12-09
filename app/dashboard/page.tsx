'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { supabase } from '@/lib/supabase';
import { Profile } from '@/types/database';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Users, Settings as SettingsIcon, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
    const router = useRouter();
    const { user, profile, loading: authLoading, signOut } = useAuth();
    const [users, setUsers] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (!user) return;

        // Update status to online
        supabase
            .from('profiles')
            .update({ status: 'online' })
            .eq('id', user.id);

        fetchUsers();

        // Subscribe to user status changes
        const channel = supabase
            .channel('profiles')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'profiles',
                },
                () => {
                    fetchUsers();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user]);

    const fetchUsers = async () => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .neq('id', user?.id)
                .order('status', { ascending: false });

            if (error) throw error;
            setUsers(data || []);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        await signOut();
        router.push('/login');
    };

    if (authLoading || loading) {
        return <LoadingScreen />;
    }

    if (!user || !profile) {
        return null;
    }

    return (
        <div className="min-h-screen bg-black scanline">
            <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />

            <div className="relative max-w-7xl mx-auto p-4 h-screen flex flex-col">
                {/* Header */}
                <header className="mb-6">
                    <GlassPanel className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-mono font-bold text-neon-green neon-text">
                                SHADOWCHAT
                            </h1>
                            <p className="text-sm text-neon-green/70 font-mono">
                                Agent: {profile.username}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link href="/settings">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-3 bg-neon-blue/10 border-2 border-neon-blue rounded-md text-neon-blue hover:bg-neon-blue/20 transition-all"
                                >
                                    <SettingsIcon className="w-5 h-5" />
                                </motion.button>
                            </Link>
                            <motion.button
                                onClick={handleSignOut}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-3 bg-neon-red/10 border-2 border-neon-red rounded-md text-neon-red hover:bg-neon-red/20 transition-all"
                            >
                                <LogOut className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </GlassPanel>
                </header>

                {/* Main Content */}
                <div className="flex-1 overflow-hidden">
                    <GlassPanel className="h-full flex flex-col">
                        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-neon-green/20">
                            <Users className="w-5 h-5 text-neon-green" />
                            <h2 className="text-xl font-mono font-bold text-neon-green">
                                Active Agents ({users.length})
                            </h2>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-3">
                            <AnimatePresence>
                                {users.length === 0 ? (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-center py-12"
                                    >
                                        <Users className="w-16 h-16 text-neon-green/30 mx-auto mb-4" />
                                        <p className="text-neon-green/70 font-mono">
                                            No other agents online
                                        </p>
                                    </motion.div>
                                ) : (
                                    users.map((contactUser, index) => (
                                        <motion.div
                                            key={contactUser.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <Link href={`/chat/${contactUser.id}`}>
                                                <motion.div
                                                    whileHover={{ scale: 1.02, x: 5 }}
                                                    className="glass p-4 rounded-lg border border-neon-green/20 hover:border-neon-green/50 transition-all cursor-pointer group"
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className="relative">
                                                                <div className="w-12 h-12 bg-neon-green/10 rounded-full flex items-center justify-center border-2 border-neon-green/50">
                                                                    <span className="text-neon-green font-mono font-bold text-lg">
                                                                        {contactUser.username.charAt(0).toUpperCase()}
                                                                    </span>
                                                                </div>
                                                                <div
                                                                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-dark-800 ${contactUser.status === 'online'
                                                                            ? 'bg-neon-green'
                                                                            : 'bg-neon-green/30'
                                                                        }`}
                                                                />
                                                            </div>
                                                            <div>
                                                                <h3 className="font-mono font-bold text-neon-green group-hover:text-neon-green/80">
                                                                    {contactUser.username}
                                                                </h3>
                                                                <p className="text-xs text-neon-green/50 font-mono">
                                                                    {contactUser.status === 'online'
                                                                        ? 'Online'
                                                                        : `Last seen: ${new Date(
                                                                            contactUser.last_seen
                                                                        ).toLocaleString()}`}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <MessageSquare className="w-5 h-5 text-neon-green/50 group-hover:text-neon-green transition-colors" />
                                                    </div>
                                                </motion.div>
                                            </Link>
                                        </motion.div>
                                    ))
                                )}
                            </AnimatePresence>
                        </div>
                    </GlassPanel>
                </div>
            </div>
        </div>
    );
}
