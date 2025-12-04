import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Sparkles } from 'lucide-react';
import { chatWithTeaMaster } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '客官好，在下灵叶。有关茶道、养生或茶礼的疑惑，尽管问我。', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      const responseText = await chatWithTeaMaster(userMsg.text, history);
      setMessages(prev => [...prev, { role: 'model', text: responseText, timestamp: Date.now() }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "茶室风大，请再说一遍。", timestamp: Date.now() }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#fcfbf7] relative">
      {/* Header */}
      <div className="p-4 bg-white/80 backdrop-blur-md border-b border-stone-200 flex justify-between items-center z-10 sticky top-0">
        <h2 className="text-lg font-serif font-bold text-stone-800">茶室</h2>
        <Sparkles size={16} className="text-emerald-700" />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold border ${
              msg.role === 'user' ? 'bg-stone-200 border-stone-300' : 'bg-stone-800 text-[#fcfbf7] border-stone-800'
            }`}>
              {msg.role === 'user' ? <User size={14} /> : '茶'}
            </div>
            <div className={`max-w-[80%] rounded-2xl p-3 text-sm leading-6 shadow-sm ${
              msg.role === 'user' 
                ? 'bg-stone-800 text-white rounded-tr-none' 
                : 'bg-white text-stone-800 border border-stone-200 rounded-tl-none font-serif'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 pl-12">
            <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce" />
            <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce delay-75" />
            <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce delay-150" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="absolute bottom-20 left-0 right-0 p-4 bg-gradient-to-t from-[#fcfbf7] via-[#fcfbf7] to-transparent">
        <div className="flex gap-2 bg-white p-1.5 rounded-full shadow-lg border border-stone-200">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="问问茶文化..."
            className="flex-1 pl-4 bg-transparent outline-none text-sm text-stone-800 placeholder-stone-400"
          />
          <button 
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="w-9 h-9 bg-[#3C5A50] text-white rounded-full flex items-center justify-center disabled:opacity-50"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;