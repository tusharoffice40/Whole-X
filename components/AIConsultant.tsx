
import React, { useState } from 'react';
import { getWholesaleInsights } from '../services/geminiService';

const AIConsultant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    const aiResponse = await getWholesaleInsights(userMsg);
    setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="bg-white w-80 sm:w-96 h-[450px] rounded-2xl shadow-2xl flex flex-col border border-slate-200 overflow-hidden">
          <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center space-x-2">
              <i className="fas fa-robot text-xl"></i>
              <div>
                <h4 className="font-bold text-sm">WholeX AI Advisor</h4>
                <p className="text-[10px] opacity-80">Online & Ready to Help</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-blue-700 p-1 rounded">
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-slate-50">
            {messages.length === 0 && (
              <div className="text-center mt-10">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-comment-dots text-blue-600 text-2xl"></i>
                </div>
                <p className="text-sm text-slate-500 px-4">
                  Ask me about market trends, bulk pricing strategies, or business growth!
                </p>
              </div>
            )}
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  m.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-white text-slate-700 shadow-sm border border-slate-200 rounded-bl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 rounded-bl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t bg-white">
            <div className="flex items-center space-x-2">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your query..."
                className="flex-grow bg-slate-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button 
                onClick={handleSend}
                disabled={loading}
                className="bg-blue-600 text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-blue-700 transition disabled:opacity-50"
              >
                <i className="fas fa-paper-plane text-sm"></i>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform ring-4 ring-white"
        >
          <i className="fas fa-magic text-xl"></i>
        </button>
      )}
    </div>
  );
};

export default AIConsultant;
