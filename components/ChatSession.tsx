'use client';

import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { ATATURK_SYSTEM_INSTRUCTION } from '@/lib/gemini';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, RotateCcw, MessageSquare } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function ChatSession() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: 'Evladım, Milli Mücadelemizin o çetin yollarını öğrenmek için buradasın. Ben Mustafa Kemal. Samsun kıyılarından İzmir dağlarına uzanan bu büyük destanı benden dinlemeye hazır mısın? Hangi harekatı merak edersin?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY! });
      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: ATATURK_SYSTEM_INSTRUCTION,
        },
        history: messages.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
      });

      const response = await chat.sendMessage({ message: userMessage });
      const botText = response.text || '';
      setMessages(prev => [...prev, { role: 'model', text: botText }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'Evladım, bir ses kesikliği yaşıyoruz. Lütfen sualini tekrar eyle.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([
      {
        role: 'model',
        text: 'Tekrar merhaba genç vatansever. Şanlı tarihimizden başka neyi muhavere etmek istersin?'
      }
    ]);
  };

  return (
    <div className="flex flex-col flex-1 glass rounded-3xl overflow-hidden relative border border-white/5 shadow-2xl">
      {/* Header */}
      <div className="p-6 bg-white/5 border-b border-white/10 flex justify-between items-center backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center border border-gold/30">
            <MessageSquare className="w-4 h-4 text-gold" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-lg text-slate-100">Hasbihal Odası</h2>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Mustafa Kemal Atatürk ile Canlı Sohbet</p>
          </div>
        </div>
        <button 
          onClick={resetChat}
          className="p-2.5 hover:bg-white/10 rounded-xl transition-all text-slate-400 hover:text-gold"
          title="Sohbeti Sıfırla"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth custom-scrollbar relative"
      >
        <AnimatePresence>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`flex gap-4 max-w-[85%] ${m.role === 'user' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${
                  m.role === 'model' 
                    ? 'bg-[#1a1a1e] border-gold text-gold font-serif font-bold text-sm' 
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}>
                  {m.role === 'model' ? 'MK' : <User className="w-5 h-5" />}
                </div>
                <div className="flex flex-col gap-1">
                  <span className={`text-[10px] uppercase tracking-widest font-bold ${
                    m.role === 'model' ? 'text-right text-gold' : 'text-left text-slate-500'
                  }`}>
                    {m.role === 'model' ? 'Mustafa Kemal Atatürk' : 'Öğrenci'}
                  </span>
                  <div className={`p-5 rounded-2xl shadow-xl ${
                    m.role === 'model' 
                      ? 'ataturk-bubble serif italic text-lg leading-relaxed text-slate-100' 
                      : 'bg-slate-800 rounded-tl-none text-slate-300 text-sm md:text-base border border-slate-700/50'
                  }`}>
                    <div className="markdown-body">
                      <ReactMarkdown>{m.text}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <div className="flex justify-end">
            <div className="flex flex-row-reverse gap-4 items-center">
              <div className="w-10 h-10 rounded-full bg-[#1a1a1e] border border-gold animate-pulse" />
              <div className="bg-white/5 p-4 rounded-2xl w-24 h-10 border border-white/10 animate-pulse" />
            </div>
          </div>
        )}
        
        {/* Bottom Fade Gradient */}
        <div className="sticky bottom-0 left-0 right-0 h-12 chat-gradient pointer-events-none" />
      </div>

      {/* Form */}
      <div className="p-6 bg-white/5 border-t border-white/10">
        <form onSubmit={handleSubmit} className="flex gap-4 bg-white/5 p-2 rounded-2xl border border-white/10 focus-within:border-gold/50 transition-all backdrop-blur-sm">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Gazi Mustafa Kemal Paşa'ya sorunu sor..."
            className="flex-1 bg-transparent border-none outline-none text-slate-200 placeholder:text-slate-600 text-sm px-4 py-2"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-gold hover:bg-gold-hover text-[#0a0a0c] font-bold py-2.5 px-8 rounded-xl transition-all text-xs uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(180,145,106,0.3)] hover:shadow-gold/40 active:scale-95 disabled:opacity-50 disabled:grayscale"
          >
            Gönder
          </button>
        </form>
      </div>
    </div>
  );
}
