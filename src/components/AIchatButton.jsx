import React, { useState, useRef, useEffect } from 'react';
import { mainAPI } from '../api/mainAPI';
import { ChatBotIcon } from '../icons';
import { Link } from 'react-router';
import { addDays, format } from 'date-fns';

const AIchatButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([
        { role: 'ai', text: 'Welcome to Pich & Go. I am Pichy, your dedicated concierge. How may I assist you with your luxury travel plans today?' }
    ]);
    console.log('chatHistory', chatHistory)

    const today = new Date();
    const checkinStr = format(today, "yyyy-MM-dd");             
    const checkoutStr = format(addDays(today, 1), "yyyy-MM-dd");

    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef(null);

    const createSlug = (text) => {
        return text?.toLowerCase().replace(/\s+/g, '-')
    }

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [chatHistory, isOpen]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim() || isLoading) return;

        const userMsg = { role: 'user', text: message };
        setChatHistory(prev => [...prev, userMsg]);
        setMessage('');
        setIsLoading(true);

        try {
            const response = await mainAPI.post('/ai', { message: userMsg.text });
            
            let aiData;
            try {
                // Remove markdown code blocks if AI included them
                const cleanJson = response.data.aiAnswer.replace(/```json|```/g, '').trim();
                aiData = JSON.parse(cleanJson);
            } catch (e) {
                console.error("Failed to parse AI JSON:", e);
                aiData = { aiMessage: response.data.aiAnswer, hotel: null };
            }

            setChatHistory(prev => [...prev, { role: 'ai', text: aiData.aiMessage }]);

            if (aiData.hotel) {
                setChatHistory(prev => [...prev, { role: 'ai', hotel: aiData.hotel }]);
            }

        } catch (error) {
            console.error('Chat error:', error);
            setChatHistory(prev => [...prev, { role: 'ai', text: 'I apologize, but I am experiencing a temporary connection issue. Please contact our support team at support@pichngo.com.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 font-sans">
            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-20 right-0 w-[90vw] md:w-96 h-[500px] flex flex-col bg-white/80 backdrop-blur-md border border-white/20 shadow-2xl rounded-3xl overflow-hidden transition-all duration-300 ease-out animate-in fade-in slide-in-from-bottom-4">
                    {/* Header */}
                    <div className="p-5 bg-gradient-to-r from-primary to-secondary text-white flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                                <span className="text-xl">✨</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm tracking-wide uppercase">Pichy Assistant</h3>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                                    <span className="text-[10px] text-neutral-300 uppercase tracking-tighter">Elite Concierge</span>
                                </div>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>

                    {/* Message Area */}
                    <div 
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide"
                    >
                        {chatHistory.map((chat, index) => (
                            <div 
                                key={index} 
                                className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {chat.text ? (
                                    <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm
                                        ${chat.role === 'user' 
                                            ? 'bg-[#e5945e] text-white rounded-tr-none' 
                                            : 'bg-white text-neutral-800 border border-neutral-100 rounded-tl-none'}`}
                                    >
                                        {chat.text}
                                    </div>
                                ) : chat.hotel ? (
                                    <Link 
                                        to={`/hotels/${createSlug(chat.hotel.city)}/${createSlug(chat.hotel.name)}?checkin=${checkinStr}&checkout=${checkoutStr}&room=1&adult=1`}
                                        onClick={() => setIsOpen(false)}
                                        className="w-[85%] bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
                                    >
                                        <div className="relative h-32 overflow-hidden">
                                            <img 
                                                src={chat.hotel.hotelImg?.[0]?.img1} 
                                                alt={chat.hotel.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-[10px] font-bold text-primary shadow-sm">
                                                {chat.hotel.price}
                                            </div>
                                        </div>
                                        <div className="p-3">
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className="font-bold text-neutral-900 text-sm leading-tight">{chat.hotel.name}</h4>
                                                <svg className="w-4 h-4 text-primary shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                                            </div>
                                            <p className="text-[10px] text-neutral-400 uppercase tracking-widest mb-2">{chat.hotel.city}</p>
                                            <p className="text-[11px] text-neutral-600 line-clamp-2 italic">"{chat.hotel.details}"</p>
                                        </div>
                                    </Link>
                                ) : null}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-neutral-100 p-4 rounded-2xl rounded-tl-none shadow-sm">
                                    <div className="flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce"></span>
                                        <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                        <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Bar */}
                    <form 
                        onSubmit={handleSendMessage}
                        className="p-4 bg-white/50 border-t border-neutral-100"
                    >
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Consult your concierge..."
                                className="w-full bg-white border border-neutral-200 rounded-full py-3 pl-5 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all placeholder:text-neutral-400 font-sans"
                            />
                            <button 
                                type="submit"
                                disabled={!message.trim() || isLoading}
                                className={`absolute right-1.5 p-2 rounded-full transition-all ${message.trim() && !isLoading ? 'bg-primary text-white hover:scale-105 shadow-md shadow-primary/20' : 'bg-neutral-100 text-neutral-400'}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* FAB Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 hover:scale-110 active:scale-100
                    ${isOpen ? 'bg-white text-neutral-900 rotate-90' : 'bg-primary text-white hover:bg-[#b5390e]'}`}
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                ) : (
                    <ChatBotIcon className="w-8"/>
                )}
            </button>
        </div>
    );
};

export default AIchatButton;

