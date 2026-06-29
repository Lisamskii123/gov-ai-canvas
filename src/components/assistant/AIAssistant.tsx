import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Send, 
  Bot, 
  User, 
  Globe, 
  Languages, 
  Mic, 
  Paperclip,
  Search,
  CheckCircle2,
  Clock,
  ExternalLink
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { VoiceInterface } from '@/components/voice/VoiceInterface';

type Language = 'English' | 'Hausa' | 'Yoruba' | 'Igbo';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      role: 'assistant', 
      content: 'Welcome to SmartGov AI. I am your intelligent digital governance assistant. How can I help you today with passports, NIN, CAC registration, taxes, or healthcare?', 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState<Language>('English');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I understand you're asking about "${input}". Based on the latest government guidelines for Nigeria, here is what you need to know... [Simulated AI Knowledge Base Response for ${language} language]`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  const languageMap: Record<Language, string> = {
    'English': 'English',
    'Hausa': 'Hausa',
    'Yoruba': 'Yorùbá',
    'Igbo': 'Asụsụ Igbo'
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-w-5xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center text-white shadow-lg">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">SmartGov AI Assistant</h2>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Online & Ready
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-card border rounded-full px-4 py-1.5 shadow-sm">
          <Languages className="h-4 w-4 text-primary" />
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="bg-transparent text-sm font-medium border-none focus:ring-0 cursor-pointer outline-none"
          >
            {(Object.keys(languageMap) as Language[]).map(lang => (
              <option key={lang} value={lang}>{languageMap[lang]}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
        <Card className="lg:col-span-3 flex flex-col overflow-hidden glass shadow-xl">
          <CardContent className="flex-1 p-0 overflow-hidden flex flex-col">
            <ScrollArea className="flex-1 p-6" ref={scrollRef}>
              <div className="space-y-6">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                        msg.role === 'user' ? 'bg-primary text-white' : 'bg-accent text-accent-foreground'
                      }`}>
                        {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </div>
                      <div className={`p-4 rounded-2xl shadow-sm ${
                        msg.role === 'user' 
                          ? 'bg-primary text-white rounded-tr-none' 
                          : 'bg-card border rounded-tl-none'
                      }`}>
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                        <span className={`text-[10px] mt-2 block opacity-50 ${msg.role === 'user' ? 'text-white' : 'text-muted-foreground'}`}>
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 bg-background/50 border-t backdrop-blur-sm">
              <div className="flex gap-2 relative">
                <Button variant="ghost" size="icon" className="shrink-0 rounded-full hover:bg-accent/20">
                  <Paperclip className="h-4 w-4 text-muted-foreground" />
                </Button>
                <div className="relative flex-1">
                  <Input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={`Ask SmartGov AI in ${language}...`}
                    className="pr-12 bg-white/50 dark:bg-black/20 border-accent/20 rounded-full focus:ring-accent"
                  />
                  <Button 
                    size="icon" 
                    className="absolute right-1 top-1 h-8 w-8 rounded-full shadow-md"
                    onClick={handleSend}
                    disabled={!input.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="ghost" size="icon" className="shrink-0 rounded-full hover:bg-accent/20">
                  <Mic className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
              <p className="text-[10px] text-center text-muted-foreground mt-3">
                SmartGov AI can make mistakes. Check important government information.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="hidden lg:flex flex-col gap-4">
          <Card className="bg-primary/5 border-primary/10">
            <CardHeader className="p-4">
              <CardTitle className="text-sm uppercase tracking-widest text-primary">Suggestions</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-2">
              {[
                "Passport renewal process",
                "NIN registration centers",
                "CAC business registration",
                "FIRS tax compliance"
              ].map(q => (
                <Button key={q} variant="outline" className="w-full justify-start text-xs bg-white/50 hover:bg-primary/10 hover:text-primary transition-all border-accent/10" onClick={() => setInput(q)}>
                  <Search className="h-3 w-3 mr-2 opacity-50" />
                  {q}
                </Button>
              ))}
            </CardContent>
          </Card>

          <VoiceInterface />

          <Card className="flex-1 border-gold/20 bg-gold/5">
            <CardHeader className="p-4">
              <CardTitle className="text-sm">Knowledge Base</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-3">
              <div className="flex items-start gap-2 text-xs">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-600 mt-0.5" />
                <span>Updated with 2024 Federal Budget info</span>
              </div>
              <div className="flex items-start gap-2 text-xs">
                <Clock className="h-3.5 w-3.5 text-orange-600 mt-0.5" />
                <span>Processing times for NIN updated</span>
              </div>
              <Button variant="link" size="sm" className="p-0 text-xs text-primary h-auto">
                Explore Resources <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
