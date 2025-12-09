'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { NeonButton } from '@/components/ui/NeonButton';
import { NeonInput } from '@/components/ui/NeonInput';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
    const router = useRouter();
    const { signIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const { error } = await signIn(email, password);

        if (error) {
            setError(error.message || 'Failed to sign in');
            setIsLoading(false);
        } else {
            router.push('/dashboard');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 scanline">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-md"
            >
                <GlassPanel>
                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.h1
                            className="text-4xl font-mono font-bold text-neon-green neon-text mb-2"
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            SHADOWCHAT
                        </motion.h1>
                        <p className="text-sm text-neon-green/70 font-mono">
                            SECURE ACCESS TERMINAL
                        </p>
                    </div>

                    {/* Error message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 bg-neon-red/10 border border-neon-red/50 rounded-md flex items-start gap-3"
                        >
                            <AlertCircle className="w-5 h-5 text-neon-red flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-neon-red font-mono">{error}</p>
                        </motion.div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <NeonInput
                            label="Email"
                            type="email"
                            placeholder="agent@shadowchat.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            icon={Mail}
                            required
                        />

                        <NeonInput
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            icon={Lock}
                            required
                        />

                        <div className="flex items-center justify-between text-sm">
                            <Link
                                href="/forgot-password"
                                className="text-neon-green/70 hover:text-neon-green font-mono transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <NeonButton
                            type="submit"
                            className="w-full"
                            isLoading={isLoading}
                        >
                            Initialize Login
                        </NeonButton>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-neon-green/70 font-mono">
                            New operative?{' '}
                            <Link href="/signup" className="text-neon-green hover:underline">
                                Create Account
                            </Link>
                        </p>
                    </div>
                </GlassPanel>

                {/* Decorative elements */}
                <motion.div
                    className="absolute -top-20 -left-20 w-40 h-40 bg-neon-green/5 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                    className="absolute -bottom-20 -right-20 w-40 h-40 bg-neon-red/5 rounded-full blur-3xl"
                    animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />
            </motion.div>
        </div>
    );
}
