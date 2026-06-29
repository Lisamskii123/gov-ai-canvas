import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  Map as MapIcon, 
  Mic2, 
  Menu, 
  Bell, 
  User, 
  Settings, 
  LogOut,
  Wifi,
  WifiOff,
  Sun,
  Moon
} from 'lucide-react';
import { ConnectivityBanner } from '@/components/connectivity/ConnectivityBanner';
import { VoiceInterface } from '@/components/voice/VoiceInterface';
import { OfficeMap } from '@/components/map/OfficeMap';
import { BookingModule } from '@/components/booking/BookingModule';
import { AccessibilityAuditor } from '@/components/accessibility/AccessibilityAuditor';
import { ImpactOverview } from '@/components/analytics/ImpactOverview';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'booking', label: 'Appointments', icon: CalendarCheck },
    { id: 'map', label: 'Office Map', icon: MapIcon },
    { id: 'assistant', label: 'AI Assistant', icon: Mic2 },
  ];

  return (
    <div className={cn("min-h-screen bg-background text-foreground flex", isDark && "dark")}>
      <ConnectivityBanner />
      <Toaster position="top-right" />

      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-card border-r transition-transform duration-300 lg:relative lg:translate-x-0",
        !isSidebarOpen && "-translate-x-full"
      )}>
        <div className="h-full flex flex-col p-4">
          <div className="flex items-center gap-3 px-2 mb-8">
            <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-primary-foreground font-black text-xl">C</span>
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">CitizenPortal</h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Government Services</p>
            </div>
          </div>

          <nav className="flex-1 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  activeTab === item.id 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-4 border-t space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
              <Settings className="h-5 w-5" />
              Settings
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors">
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b flex items-center justify-between px-6 sticky top-0 bg-background/80 backdrop-blur-md z-30">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
            <h2 className="text-xl font-bold capitalize">
              {navItems.find(i => i.id === activeTab)?.label}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="rounded-full" onClick={toggleTheme}>
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="icon" className="rounded-full relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-destructive rounded-full border-2 border-background" />
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-2 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold">John Citizen</p>
                <p className="text-[10px] text-muted-foreground">ID: 8829-XJ</p>
              </div>
              <div className="h-9 w-9 bg-accent rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6 overflow-auto">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-primary/5 p-6 rounded-2xl border border-primary/10">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-bold">Welcome back, John!</h3>
                      <p className="text-muted-foreground">You have 2 upcoming appointments and 1 pending notification.</p>
                    </div>
                    <Button onClick={() => setActiveTab('booking')}>New Appointment</Button>
                  </div>
                  
                  <ImpactOverview />
                </div>
                <div className="xl:col-span-1 space-y-6">
                  <AccessibilityAuditor />
                  
                  <Card>
                    <div className="p-6">
                      <h4 className="font-bold mb-4">Network Simulator</h4>
                      <p className="text-xs text-muted-foreground mb-4">Toggle offline mode to test the connectivity banner and local caching.</p>
                      <Button 
                        variant="outline" 
                        className="w-full justify-between"
                        onClick={() => {
                           // Mocking navigator.onLine is hard, so we just trigger the banner manually in a real app
                           // But for this demo, we'll use a custom event or just trust the window event
                           window.dispatchEvent(new Event(navigator.onLine ? 'offline' : 'online'));
                        }}
                      >
                        {navigator.onLine ? <Wifi className="h-4 w-4 mr-2" /> : <WifiOff className="h-4 w-4 mr-2" />}
                        Simulate {navigator.onLine ? 'Offline' : 'Online'}
                        <Badge variant="secondary" className="ml-2">TEST</Badge>
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'booking' && <BookingModule />}
          {activeTab === 'map' && <OfficeMap />}
          {activeTab === 'assistant' && (
            <div className="max-w-2xl mx-auto py-12 space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold">AI Voice Assistant</h2>
                <p className="text-muted-foreground">Ask questions about government services, office hours, or book appointments using your voice.</p>
              </div>
              <VoiceInterface />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Where is the nearest Registry office?",
                  "When does City Hall close today?",
                  "I want to book a passport renewal",
                  "What is my accessibility score?"
                ].map((q) => (
                  <button key={q} className="p-4 text-left rounded-xl border bg-card hover:bg-accent transition-colors text-sm font-medium">
                    "{q}"
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
