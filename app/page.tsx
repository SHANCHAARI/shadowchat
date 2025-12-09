'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Lock, Zap, Eye, MessageSquare, UserCheck } from "lucide-react";
import { NeonButton } from "@/components/ui/NeonButton";

export default function Home() {
  const features = [
    { icon: Lock, title: "End-to-End Encryption", description: "Military-grade encryption" },
    { icon: Shield, title: "Row-Level Security", description: "Database isolation" },
    { icon: Zap, title: "Real-Time Messaging", description: "Instant delivery" },
    { icon: Eye, title: "Read Receipts", description: "Know when messages are read" },
    { icon: MessageSquare, title: "Typing Indicators", description: "Live typing status" },
    { icon: UserCheck, title: "Online Status", description: "See who's available" },
  ];

  return (
    <div className="min-h-screen bg-black scanline overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo and Title */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-7xl md:text-9xl font-mono font-bold text-neon-green neon-text mb-4">
              SHADOWCHAT
            </h1>
            <div className="h-1 w-64 mx-auto bg-gradient-to-r from-transparent via-neon-green to-transparent" />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-neon-green/80 font-mono mb-12 tracking-wide"
          >
            ENCRYPTED. PRIVATE. UNTRACEABLE.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/signup">
              <NeonButton variant="primary" className="min-w-[200px]">
                Join Network
              </NeonButton>
            </Link>
            <Link href="/login">
              <NeonButton variant="secondary" className="min-w-[200px]">
                Access Terminal
              </NeonButton>
            </Link>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="glass rounded-lg p-6 border border-neon-green/20 group hover:border-neon-green/50 transition-all duration-300"
              >
                <feature.icon className="w-10 h-10 text-neon-green mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-neon-green font-mono font-bold mb-2 text-lg">
                  {feature.title}
                </h3>
                <p className="text-neon-green/70 font-mono text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Decorative glowing orbs */}
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-neon-green/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-64 h-64 bg-neon-red/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>
    </div>
  );
}
