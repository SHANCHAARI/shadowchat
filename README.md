# 🕵️ ShadowChat - Encrypted Spy Messaging Platform

A production-ready, **private, encrypted, spy-themed** messaging web application built with Next.js 15, Supabase, and Framer Motion.

![ShadowChat Banner](https://img.shields.io/badge/SHADOWCHAT-ENCRYPTED-00ff00?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMkw0IDhWMTRDNCAxOC40MTggNy41ODIgMjIgMTIgMjJDMTYuNDE4IDIyIDIwIDE4LjQxOCAyMCAxNFY4TDEyIDJaIiBzdHJva2U9IiMwMGZmMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-green?style=for-the-badge&logo=supabase&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## ✨ Features

### 🔐 Security & Privacy
- **End-to-End Encryption**: All messages stored securely
- **Row-Level Security (RLS)**: Database-level access control via Supabase
- **Authenticated Sessions**: Secure email/password authentication

### 💬 Real-Time Messaging
- **Instant Delivery**: Real-time message sync using Supabase Realtime
- **Typing Indicators**: See when the other agent is typing
- **Read Receipts**: Know when your messages are read
- **Online/Offline Status**: Live presence indicators
- **Message Deletion**: Remove sent messages

### 🎨 Spy-Themed UI/UX
- **Dark Mode Only**: Pure black ops terminal aesthetic
- **Neon Accents**: Matrix-green and neon-red color scheme
- **Glass Morphism**: Blurred panels with glowing borders
- **Smooth Animations**: Framer Motion powered transitions
- **Futuristic Loading**: Spinning circle loader
- **Scanline Effect**: CRT monitor simulation overlay

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm
- **Supabase Account** ([Sign up free](https://supabase.com))

### 1. Clone & Install

```bash
cd shadow-chat
npm install
```

### 2. Set Up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run `supabase/schema.sql` to set up tables, RLS, and triggers
3. Copy your **Project URL** and **Anon Key** from Settings → API

### 3. Configure Environment

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

(See `env-example.txt` for reference)

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
shadow-chat/
├── app/
│   ├── (pages)
│   │   ├── login/         # Login page
│   │   ├── signup/        # Registration page
│   │   ├── dashboard/     # User list & chat selection
│   │   ├── chat/[id]/     # Real-time chat room
│   │   └── settings/      # User settings
│   ├── layout.tsx         # Root layout with AuthProvider
│   ├── page.tsx           # Landing page
│   └── globals.css        # Global styles (spy theme)
├── components/
│   ├── auth/              # (future) Auth components
│   ├── chat/
│   │   ├── MessageList.tsx
│   │   ├── MessageInput.tsx
│   │   └── TypingIndicator.tsx
│   └── ui/
│       ├── GlassPanel.tsx
│       ├── NeonButton.tsx
│       ├── NeonInput.tsx
│       └── LoadingScreen.tsx
├── context/
│   └── AuthContext.tsx    # User session management
├── hooks/
│   └── useRealtimeMessages.ts
├── lib/
│   ├── supabase.ts        # Supabase client
│   └── utils.ts           # Helper functions
├── types/
│   └── database.ts        # TypeScript interfaces
├── supabase/
│   └── schema.sql         # Database schema & RLS
└── tailwind.config.ts     # Tailwind spy theme config
```

---

## 🗄️ Database Schema

| Table | Description |
|-------|-------------|
| `profiles` | User profiles (username, avatar, status, last_seen) |
| `messages` | Chat messages (sender, receiver, content, is_read) |
| `typing_indicators` | Real-time typing status |

**RLS Policies**: Users can only read/write their own data or data in conversations they're part of.

---

## 🎯 Usage Guide

### Sign Up
1. Navigate to `/signup`
2. Create account with email, password, username
3. Auto-redirected to login after success

### Login
1. Navigate to `/login`
2. Enter credentials
3. Redirected to dashboard

### Dashboard
- View all registered users
- See online/offline status
- Click any user to start chatting

### Chat
- Send real-time messages
- See typing indicators
- Read receipts (✓ = sent, ✓✓ = read)
- Delete your messages
- Auto-scroll to latest message

### Settings
- Update username
- View security status

---

## 🔧 Configuration

### Tailwind Spy Theme

Customize colors in `tailwind.config.ts`:

```ts
colors: {
  neon: {
    green: "#00ff00",    // Primary
    red: "#ff0000",      // Danger
    blue: "#00ffff",     // Secondary
  },
  dark: {
    900: "#000000",
    800: "#0a0a0a",
    // ...
  },
}
```

### Animations

Modify in `tailwind.config.ts` → `theme.extend.animation`:
- `glow-pulse` - Pulsing glow effect
- `scan-line` - CRT scanline effect
- `flicker` - Text flicker
- `slide-in` - Slide animation

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

### Build for Production

```bash
npm run build
npm start
```

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Sign up new user
- [ ] Login with credentials
- [ ] Dashboard shows other users
- [ ] Online status updates
- [ ] Send message (appears instantly for recipient)
- [ ] Receive message (real-time)  
- [ ] Typing indicator appears
- [ ] Read receipt changes from ✓ to ✓✓
- [ ] Delete message
- [ ] Update username in settings
- [ ] Sign out

### Testing Real-Time Features

1. Open app in two browsers (or incognito + regular)
2. Sign up as User A and User B
3. User A: Navigate to User B's chat
4. User B: Navigate to User A's chat
5. Send messages from both - verify instant sync
6. Type on one side - verify typing indicator on other
7. Verify online status indicators update

---

## 🛡️ Security Features

### Supabase RLS Policies
- Users can only view profiles of all users (needed for chat list)
- Users can only read messages where they are sender OR receiver
- Users can only insert messages where they are the sender
- Users can only update/delete messages they sent
- Typing indicators enforce user_id = auth.uid()

### Authentication
- Secure password hashing by Supabase Auth
- Session tokens stored in httpOnly cookies
- Auto-refresh tokens

---

## 🎨 Design Philosophy

- **Minimal & Dark**: Pure black background, no light mode
- **Neon Glows**: All interactive elements have glowing borders
- **Terminal Aesthetic**: Monospace fonts, matrix-green text
- **Smooth Transitions**: Every state change is animated
- **Glass Morphism**: Frosted glass panels for depth

---

## 📦 Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | TailwindCSS v4 |
| **Animations** | Framer Motion |
| **Backend** | Supabase (PostgreSQL + Realtime) |
| **Auth** | Supabase Auth |
| **Icons** | Lucide React |
| **Deployment** | Vercel |

---

## 🐛 Troubleshooting

### "Missing Supabase environment variables"
- Ensure `.env.local` exists with correct keys
- Restart dev server after adding env vars

### Messages not appearing in real-time
- Check Supabase project is not paused (free tier sleeps after inactivity)
- Verify RLS policies are applied correctly
- Check browser console for Supabase errors

### Build errors
- Run `npm install` again
- Clear `.next` folder: `rm -rf .next` then rebuild
- Check Node version: `node -v` (needs 18+)

---

## 📝 License

MIT License - feel free to use for your own projects!

---

## 🙌 Credits

Built with ❤️ using:
- [Next.js](https://nextjs.org)
- [Supabase](https://supabase.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [Lucide Icons](https://lucide.dev)

---

## 🚀 Future Enhancements

- [ ] Image/file uploads
- [ ] Voice messages
- [ ] Group chats
- [ ] Message search
- [ ] Custom themes (red, purple, etc.)
- [ ] Push notifications
- [ ] Desktop app (Electron)

---

**SHADOWCHAT - WHERE PRIVACY MEETS THE SHADOWS** 🕵️‍♂️
#   s h a d o w c h a t  
 #   B u i l d   f i x  
 