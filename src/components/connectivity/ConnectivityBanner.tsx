import React, { useState, useEffect } from 'react';
import { useOnlineStatus } from '@/hooks/use-online-status';
import { Wifi, WifiOff, RefreshCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ConnectivityBanner() {
  const isOnline = useOnlineStatus();
  const [showSyncing, setShowSyncing] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setVisible(true);
      setShowSyncing(false);
    } else {
      // Transition to syncing when coming back online
      setShowSyncing(true);
      const timer = setTimeout(() => {
        setShowSyncing(false);
        setVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline]);

  if (!visible && !showSyncing) return null;

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-2 text-sm font-medium transition-all duration-500",
        !isOnline ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground"
      )}
    >
      <div className="flex items-center gap-2">
        {!isOnline ? (
          <>
            <WifiOff className="h-4 w-4 animate-pulse" />
            <span><strong>Disconnected</strong> — You are currently offline. Data is being cached locally.</span>
          </>
        ) : (
          <>
            <RefreshCcw className="h-4 w-4 animate-spin" />
            <span><strong>Syncing...</strong> Back online! Syncing your cached data.</span>
          </>
        )}
      </div>
    </div>
  );
}
