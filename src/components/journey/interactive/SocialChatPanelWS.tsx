'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/app/store';
import { useT } from '@/hooks/useT';

interface ChatMessage {
  id: string;
  uid: string;
  displayName: string;
  photoURL: string | null;
  text: string;
  timestamp: number;
}

interface SocialChatPanelProps {
  open: boolean;
  isLight: boolean;
  onClose: () => void;
}

export default function SocialChatPanelWS({ open, isLight, onClose }: SocialChatPanelProps) {
  const { t } = useT();
  const user = useStore((s) => s.user);
  const authLoading = useStore((s) => s.authLoading);
  const signInWithGoogle = useStore((s) => s.signInWithGoogle);
  const signOutUser = useStore((s) => s.signOutUser);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const socketRef = useRef<WebSocket | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Subscribe to real-time WebSockets via load-balanced Nginx
  useEffect(() => {
    if (!open) return;

    // Connect to WebSocket server behind Nginx load-balancer on Port 80
    const ws = new WebSocket('ws://localhost:80');
    socketRef.current = ws;

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data) as ChatMessage;
        setMessages((prev) => [...prev.slice(-59), msg]); // keep last 60 messages
      } catch (err) {
        console.error('Failed to parse WebSocket message packet:', err);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed.');
    };

    ws.onerror = (err) => {
      console.error('WebSocket connection error:', err);
    };

    return () => {
      ws.close();
      socketRef.current = null;
    };
  }, [open]);

  // Auto-resize textarea according to text length
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = '40px';
    const scrollHeight = textarea.scrollHeight;
    if (scrollHeight > 40) {
      textarea.style.height = `${Math.min(scrollHeight, 120)}px`;
    }
  }, [inputText]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !inputText.trim() || !socketRef.current) return;

    if (socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          uid: user.uid,
          displayName: user.displayName || 'Anonymous Pilgrim',
          photoURL: user.photoURL,
          text: inputText.trim().substring(0, 300),
        })
      );
      setInputText('');
    } else {
      console.warn('Cannot send message, WebSocket is not open.');
    }
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black cursor-pointer"
        />

        {/* Sidebar Drawer */}
        <motion.aside
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 280 }}
          className={`relative z-10 w-full max-w-full md:max-w-[360px] h-[100dvh] border-l flex flex-col ${
            isLight
              ? 'bg-[#faf6f0] border-black/10 text-[#2b251f]'
              : 'bg-[#0a0907] border-white/10 text-[#f4e8d3]'
          }`}
        >
          {/* Header */}
          <div className={`p-4 border-b flex items-center justify-between shrink-0 ${isLight ? 'border-black/10' : 'border-white/10'}`}>
            <div>
              <h3 className="font-display text-sm uppercase tracking-wider font-bold">
                संसद • SAMVAD CHAT (WS)
              </h3>
              <p className={`font-body text-[8px] uppercase tracking-widest mt-0.5 ${isLight ? 'text-black/45' : 'text-white/40'}`}>
                Scaled WebSocket Cluster Mode
              </p>
            </div>

            <div className="flex items-center gap-2">
              {user && (
                <button
                  onClick={() => signOutUser()}
                  className={`text-[8px] font-body uppercase tracking-wider px-2 py-1 border rounded-md transition-colors ${
                    isLight 
                      ? 'border-black/15 text-black/60 hover:bg-black/5 hover:text-black' 
                      : 'border-white/10 text-white/50 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  Sign Out
                </button>
              )}
              <button
                onClick={onClose}
                className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all ${
                  isLight
                    ? 'border-black/10 text-black/60 hover:bg-black/5'
                    : 'border-white/10 text-white/60 hover:bg-white/5'
                }`}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                <svg className="w-8 h-8 mb-2 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p className="font-body text-[10px] uppercase tracking-wider">No messages yet. Be the first!</p>
              </div>
            ) : (
              messages.map((msg) => {
                const isMe = user && msg.uid === user.uid;
                return (
                  <div key={msg.id} className={`flex items-start gap-2.5 ${isMe ? 'flex-row-reverse' : ''}`}>
                    {/* User Avatar */}
                    {msg.photoURL ? (
                      <img
                        src={msg.photoURL}
                        alt={msg.displayName}
                        referrerPolicy="no-referrer"
                        className="w-7 h-7 rounded-full border border-white/10 shrink-0"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-[#ff7900]/10 border border-[#ff7900]/30 text-[#ff7900] flex items-center justify-center font-display text-[10px] font-bold uppercase shrink-0">
                        {msg.displayName.charAt(0)}
                      </div>
                    )}

                    {/* Chat Bubble */}
                    <div className={`flex flex-col max-w-[70%] ${isMe ? 'items-end' : 'items-start'}`}>
                      {!isMe && (
                        <span className={`font-body text-[8px] font-semibold mb-0.5 ${isLight ? 'text-black/60' : 'text-white/50'}`}>
                          {msg.displayName}
                        </span>
                      )}
                      <div
                        className={`px-3 py-2 rounded-2xl text-[11px] font-body leading-relaxed break-words text-left ${
                          isMe
                            ? 'bg-[#ff7900] text-white rounded-tr-none'
                            : isLight
                            ? 'bg-black/[0.04] text-black rounded-tl-none border border-black/5'
                            : 'bg-white/[0.04] text-white rounded-tl-none border border-white/[0.04]'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Bar / Login Gate */}
          <div className={`p-4 border-t shrink-0 ${isLight ? 'border-black/10 bg-white/50' : 'border-white/10 bg-black/40'} backdrop-blur-md pb-8`}>
            {authLoading ? (
              <div className="flex items-center justify-center h-10">
                <div className="w-5 h-5 border-2 border-t-transparent border-[#ff7900] rounded-full animate-spin" />
              </div>
            ) : !user ? (
              <div className="flex flex-col gap-3 items-center text-center">
                <p className={`font-body text-[9px] uppercase tracking-wider ${isLight ? 'text-black/60' : 'text-white/60'}`}>
                  Sign in with Google to post devotion
                </p>
                <button
                  onClick={() => signInWithGoogle()}
                  className="w-full h-10 rounded-xl bg-white text-black font-semibold font-body text-[11px] uppercase tracking-wider shadow-md hover:bg-gray-50 flex items-center justify-center gap-2 border border-gray-200 transition-all active:scale-[0.98] cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M23.49 12.27c0-.81-.07-1.59-.2-2.35H12v4.46h6.44c-.28 1.48-1.12 2.73-2.38 3.58v2.98h3.84c2.25-2.07 3.59-5.11 3.59-8.67z"
                    />
                    <path
                      fill="#4285F4"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.84-2.98c-1.07.72-2.45 1.15-4.09 1.15-3.15 0-5.81-2.13-6.76-5.01H1.36v3.08C3.34 21.28 7.37 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.24 14.25c-.24-.72-.38-1.49-.38-2.25s.14-1.53.38-2.25V6.67H1.36C.49 8.42 0 10.15 0 12s.49 3.58 1.36 5.33l3.88-3.08z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.34 2.72 1.36 6.67l3.88 3.08c.95-2.88 3.61-5.01 6.76-5.01z"
                    />
                  </svg>
                  Google Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="flex items-end gap-2 w-full">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  maxLength={300}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                  placeholder="Share a thought or verse..."
                  className={`flex-1 min-h-[40px] max-h-[120px] py-2.5 px-4 rounded-xl font-body text-[11px] outline-none border focus:border-[#ff7900] transition-colors resize-none overflow-y-auto ${
                    isLight
                      ? 'bg-black/[0.03] border-black/10 text-black'
                      : 'bg-white/[0.04] border-white/10 text-white'
                  }`}
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="h-10 px-4 rounded-xl bg-[#ff7900] text-white hover:bg-[#e06b00] disabled:bg-[#ff7900]/40 disabled:cursor-not-allowed flex items-center justify-center transition-all cursor-pointer shrink-0"
                >
                  <svg className="w-4 h-4 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </motion.aside>
      </div>
    </AnimatePresence>
  );
}
