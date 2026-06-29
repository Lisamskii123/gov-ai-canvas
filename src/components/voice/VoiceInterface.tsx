import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Volume2, Square, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

type VoiceState = 'idle' | 'listening' | 'processing' | 'speaking';

export function VoiceInterface() {
  const [state, setState] = useState<VoiceState>('idle');
  const [transcript, setTranscript] = useState('');

  const startListening = () => {
    setState('listening');
    setTranscript('Listening...');
    
    // Simulate end of listening after 3 seconds
    setTimeout(() => {
      setState('processing');
      setTranscript('Processing your request...');
      
      // Simulate processing
      setTimeout(() => {
        setState('speaking');
        setTranscript('I found three government offices near your location. Would you like the addresses?');
        toast.info("Audio Feedback: Playing response...");
        
        // Return to idle
        setTimeout(() => {
          setState('idle');
          setTranscript('');
        }, 5000);
      }, 2000);
    }, 3000);
  };

  const stopListening = () => {
    setState('idle');
    setTranscript('');
  };

  return (
    <Card className="p-6 flex flex-col items-center gap-4 bg-card/50 backdrop-blur-sm border-dashed">
      <div className="relative">
        <AnimatePresence mode="wait">
          {state === 'listening' && (
            <motion.div
              key="listening-ring"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 bg-primary/20 rounded-full"
            />
          )}
        </AnimatePresence>

        <Button
          size="lg"
          variant={state === 'listening' ? 'destructive' : 'default'}
          className="rounded-full h-16 w-16 shadow-lg transition-all duration-300"
          onClick={state === 'idle' ? startListening : stopListening}
        >
          {state === 'idle' && <Mic className="h-8 w-8" />}
          {state === 'listening' && <Square className="h-6 w-6" />}
          {state === 'processing' && <Loader2 className="h-8 w-8 animate-spin" />}
          {state === 'speaking' && <Volume2 className="h-8 w-8 animate-bounce" />}
        </Button>
      </div>

      <div className="text-center h-12 flex items-center justify-center">
        <p className="text-sm font-medium text-muted-foreground animate-in fade-in slide-in-from-bottom-2">
          {state === 'idle' && "Tap the mic to talk to your AI assistant"}
          {state === 'listening' && "Listening..."}
          {state === 'processing' && "Analyzing voice..."}
          {state === 'speaking' && transcript}
        </p>
      </div>

      {state === 'listening' && (
        <div className="flex gap-1 h-8 items-end">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1.5 bg-primary rounded-full"
              animate={{ height: [8, 24, 8] }}
              transition={{
                repeat: Infinity,
                duration: 0.5,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      )}
    </Card>
  );
}
