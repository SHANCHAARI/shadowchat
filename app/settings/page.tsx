'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { NeonButton } from '@/components/ui/NeonButton';
import { NeonInput } from '@/components/ui/NeonInput';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { ArrowLeft, User as UserIcon } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SettingsPage() {
    const router = useRouter();
    const { user, profile, loading, updateProfile } = useAuth();
    const [username, setUsername] = useState(profile?.username || '');
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    if (loading) {
        return <LoadingScreen />;
    }

    if (!user || !profile) {
        router.push('/login');
        return null;
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage('');

        try {
            await updateProfile({ username });
            setMessage('Settings saved successfully!');
        } catch (error) {
            setMessage('Failed to save settings');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-black scanline">
            <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />

            <div className="relative max-w-3xl mx-auto p-4 min-h-screen flex flex-col justify-center">
                <GlassPanel>
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                        <Link href="/dashboard">
                            <motion.button
                                whileHover={{ scale: 1.05, x: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 text-neon-green hover:text-neon-green/80 transition-colors"
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </motion.button>
                        </Link>
                        <h1 className="text-3xl font-mono font-bold text-neon-green neon-text">
                            AGENT SETTINGS
                        </h1>
                    </div>

                    {/* Success/Error Message */}
                    {message && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 bg-neon-green/10 border border-neon-green/50 rounded-md"
                        >
                            <p className="text-sm text-neon-green font-mono">{message}</p>
                        </motion.div>
                    )}

                    {/* Profile Section */}
                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-24 h-24 bg-neon-green/10 rounded-full flex items-center justify-center border-4 border-neon-green/50">
                                <UserIcon className="w-12 h-12 text-neon-green" />
                            </div>
                            <p className="text-sm text-neon-green/70 font-mono">
                                Agent ID: {user.id.slice(0, 8)}...
                            </p>
                        </div>

                        <NeonInput
                            label="Username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            icon={UserIcon}
                            required
                        />

                        <NeonInput
                            label="Email"
                            type="email"
                            value={user.email || ''}
                            disabled
                        />

                        <NeonInput
                            label="Status"
                            type="text"
                            value={profile.status}
                            disabled
                        />

                        <div className="pt-4">
                            <NeonButton
                                type="submit"
                                className="w-full"
                                isLoading={isSaving}
                            >
                                Save Changes
                            </NeonButton>
                        </div>
                    </form>

                    {/* Additional Info */}
                    <div className="mt-8 pt-6 border-t border-neon-green/20">
                        <h3 className="text-sm font-mono text-neon-green/70 mb-2">
                            Security Features
                        </h3>
                        <ul className="space-y-2 text-xs text-neon-green/50 font-mono">
                            <li>✓ End-to-end encryption enabled</li>
                            <li>✓ Row-level database security</li>
                            <li>✓ Real-time message delivery</li>
                            <li>✓ Secure authentication</li>
                        </ul>
                    </div>
                </GlassPanel>
            </div>
        </div>
    );
}
