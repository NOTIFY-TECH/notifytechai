import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { MessageSquare, Send, CheckCheck, Clock } from 'lucide-react';

const LiveDemo = () => {
  const [channel, setChannel] = useState('whatsapp');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ text: string; time: string; status: string }>>([]);
  const [isSending, setIsSending] = useState(false);

  const handleSendDemo = () => {
    if (!phoneNumber || !message) return;
    
    setIsSending(true);
    
    setTimeout(() => {
      const newMessage = {
        text: message,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        status: 'sending'
      };
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
      setIsSending(false);
      
      // Simulate delivery
      setTimeout(() => {
        setMessages(prev => prev.map((msg, idx) => 
          idx === prev.length - 1 ? { ...msg, status: 'delivered' } : msg
        ));
      }, 1000);
      
      // Simulate read
      setTimeout(() => {
        setMessages(prev => prev.map((msg, idx) => 
          idx === prev.length - 1 ? { ...msg, status: 'read' } : msg
        ));
      }, 2000);
    }, 500);
  };

  const channelConfig = {
    whatsapp: {
      color: 'success',
      label: 'WhatsApp Business',
      placeholder: 'Enter message with rich media support...'
    },
    sms: {
      color: 'primary',
      label: 'SMS',
      placeholder: 'Enter SMS message (160 characters)...'
    },
    rcs: {
      color: 'accent',
      label: 'RCS Message',
      placeholder: 'Enter RCS message with interactive buttons...'
    }
  };

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Try It Live</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience our messaging platform in action. Send a demo message and see real-time delivery tracking.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Control Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 shadow-xl">
              <h3 className="text-2xl font-semibold mb-6">Send Demo Message</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Select Channel</label>
                  <Select value={channel} onValueChange={setChannel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="whatsapp">WhatsApp Business API</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="rcs">RCS Messaging</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Phone Number</label>
                  <Input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Message</label>
                  <Textarea
                    placeholder={channelConfig[channel as keyof typeof channelConfig].placeholder}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                  />
                </div>

                <Button 
                  className="w-full bg-gradient-primary" 
                  size="lg"
                  onClick={handleSendDemo}
                  disabled={isSending || !phoneNumber || !message}
                >
                  <Send className="mr-2" size={20} />
                  {isSending ? 'Sending...' : 'Send Demo Message'}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  This is a simulation. No actual messages are sent.
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Message Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 shadow-xl bg-accent/5">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                  <MessageSquare className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold">
                    {channelConfig[channel as keyof typeof channelConfig].label}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {phoneNumber || 'No number selected'}
                  </p>
                </div>
              </div>

              <div className="space-y-3 min-h-[300px] max-h-[400px] overflow-y-auto">
                <AnimatePresence>
                  {messages.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-end"
                    >
                      <div className="bg-primary text-primary-foreground rounded-lg rounded-tr-none px-4 py-3 max-w-[80%]">
                        <p className="text-sm mb-1">{msg.text}</p>
                        <div className="flex items-center justify-end gap-1 text-xs opacity-80">
                          <span>{msg.time}</span>
                          {msg.status === 'sending' && <Clock size={14} />}
                          {msg.status === 'delivered' && <CheckCheck size={14} />}
                          {msg.status === 'read' && <CheckCheck size={14} className="text-success" />}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {messages.length === 0 && (
                  <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                    <p className="text-center">
                      Your demo messages will appear here<br />
                      <span className="text-sm">with real-time delivery tracking</span>
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">Ready to integrate into your application?</p>
          <Button variant="outline" size="lg">
            View API Documentation →
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default LiveDemo;
