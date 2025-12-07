import { useState, useEffect, useRef } from 'react';
import { X, Send, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
}

export const ChatWidget = ({ isOpen, onClose, onMinimize }: ChatWidgetProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [conversationId, setConversationId] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeConversation = async (newSessionId: string) => {
      const { data, error } = await supabase
        .from('chat_conversations')
        .insert({ session_id: newSessionId })
        .select()
        .single();

      if (!error && data) {
        setConversationId(data.id);
        // Add welcome message
        const welcomeMsg = {
          role: 'assistant' as const,
          content: "Hi 👋 I'm Textora Sales Assistant. How can I help you today?",
        };
        setMessages([welcomeMsg]);
        await saveMessage(data.id, welcomeMsg);
      }
    };

    if (isOpen && !sessionId) {
      const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setSessionId(newSessionId);
      initializeConversation(newSessionId);
    }
  }, [isOpen, sessionId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const saveMessage = async (convId: string, message: Message) => {
    // Non-blocking background save for better performance at scale
    supabase.from('chat_messages').insert({
      conversation_id: convId,
      role: message.role,
      content: message.content,
    }).then(({ error }) => {
      if (error) console.error('Message save error:', error);
    });
  };

  const trackAnalytics = async (query: string) => {
    if (!conversationId) return;
    
    // Non-blocking analytics tracking
    supabase
      .from('chatbot_analytics')
      .select('id, message_count, user_queries')
      .eq('conversation_id', conversationId)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) {
          // Create new analytics record
          supabase.from('chatbot_analytics').insert({
            conversation_id: conversationId,
            session_id: sessionId,
            message_count: 1,
            user_queries: [query],
            lead_captured: false,
          });
        } else if (data) {
          // Update existing analytics
          supabase.from('chatbot_analytics').update({
            message_count: data.message_count + 1,
            user_queries: [...(data.user_queries || []), query],
          }).eq('id', data.id);
        }
      });
  };

  const streamChat = async (userMessage: string) => {
    const newMessages = [...messages, { role: 'user' as const, content: userMessage }];
    setMessages(newMessages);
    await saveMessage(conversationId, { role: 'user', content: userMessage });
    trackAnalytics(userMessage);

    setIsLoading(true);
    let assistantMessage = '';

    try {
      const response = await supabase.functions.invoke('textora-chat', {
        body: { messages: newMessages, sessionId },
      });

      if (response.error) throw response.error;

      const reader = response.data.body?.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        let newlineIndex: number;

        while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantMessage += content;
              setMessages([...newMessages, { role: 'assistant', content: assistantMessage }]);
            }
          } catch {
            buffer = line + '\n' + buffer;
            break;
          }
        }
      }

      // Check for lead capture
      if (assistantMessage.includes('LEAD_CAPTURED:')) {
        const leadDataMatch = assistantMessage.match(/LEAD_CAPTURED:(\{[^}]+\})/);
        if (leadDataMatch) {
          const leadData = JSON.parse(leadDataMatch[1]);
          await submitLead(leadData);
          
          // Mark lead as captured in analytics
          supabase
            .from('chatbot_analytics')
            .update({ lead_captured: true })
            .eq('conversation_id', conversationId);
          
          assistantMessage = "Thank you! I'm sharing your enquiry with our sales team. You'll receive a call shortly 😊";
          setMessages([...newMessages, { role: 'assistant', content: assistantMessage }]);
        }
      }

      await saveMessage(conversationId, { role: 'assistant', content: assistantMessage });
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg = 'Sorry, I encountered an error. Please try again.';
      setMessages([...newMessages, { role: 'assistant', content: errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  const submitLead = async (leadData: string) => {
    await supabase.functions.invoke('submit-lead', {
      body: { leadData, conversationId },
    });
  };

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    streamChat(input);
    setInput('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-24 right-6 w-96 h-[600px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col z-50"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary to-primary/80 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <span className="text-primary font-bold">T</span>
              </div>
              <div>
                <h3 className="font-semibold text-white">TEXTORA AI</h3>
                <p className="text-xs text-white/80">Sales Assistant</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" onClick={onMinimize} className="text-white hover:bg-white/20">
                <Minimize2 size={18} />
              </Button>
              <Button size="icon" variant="ghost" onClick={onClose} className="text-white hover:bg-white/20">
                <X size={18} />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p
                      className="text-sm whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{
                        __html: msg.content
                          .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-blue-600 font-bold">$1</strong>')
                          .replace(/\*([^*]+)\*/g, '<em class="text-green-600 italic">$1</em>')
                          .replace(/₹(\d+(?:,\d+)?)/g, '<span class="font-semibold text-primary">₹$1</span>')
                          .replace(/(Silver|Gold|Platinum)/g, '<span class="font-semibold text-primary">$1</span>')
                          .replace(/Reasoning:/g, '<span class="font-medium text-accent">Reasoning:</span>')
                      }}
                    />
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted p-3 rounded-2xl">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
                <Send size={18} />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
