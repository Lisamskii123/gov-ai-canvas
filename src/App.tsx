import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  MapPin, 
  MessageSquare, 
  Menu, 
  Bell, 
  User, 
  Settings, 
  LogOut,
  Sun,
  Moon,
  Briefcase,
  FileText,
  ShieldCheck,
  AlertTriangle,
  BarChart3,
  Search,
  Globe
} from 'lucide-react';
import { CitizenDashboard } from '@/components/dashboard/CitizenDashboard';
import { AIAssistant } from '@/components/assistant/AIAssistant';
import { ServiceDirectory } from '@/components/services/ServiceDirectory';
import { FraudReporting } from '@/components/fraud/FraudReporting';
import { DocumentVerification } from '@/components/verification/DocumentVerification';
import { AnalyticsPage } from '@/components/analytics/AnalyticsPage';
import { OfficeMap } from '@/components/map/OfficeMap';
import { BookingModule } from '@/components/booking/BookingModule';
import { ConnectivityBanner } from '@/components/connectivity/ConnectivityBanner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState('English');

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'assistant', label: 'AI Assistant', icon: MessageSquare },
    { id: 'services', label: 'Government Services', icon: Briefcase },
    { id: 'applications', label: 'My Applications', icon: FileText },
    { id: 'verification', label: 'Document Verification', icon: ShieldCheck },
    { id: 'fraud', label: 'Report Fraud', icon: AlertTriangle },
    { id: 'map', label: 'Office Locator', icon: MapPin },
    { id: 'booking', label: 'Appointments', icon: CalendarCheck },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
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
              <span className="text-primary-foreground font-black text-xl text-gold">S</span>
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">SmartGov AI</h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Citizen Portal</p>
            </div>
          </div>

          <nav className="flex-1 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsSidebarOpen(false);
                }}
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
              <User className="h-5 w-5" />
              My Profile
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors">
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-background/50">
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
            <div className="hidden md:flex items-center bg-accent/50 rounded-full px-3 py-1 mr-2 border border-accent/20">
              <Globe className="h-3.5 w-3.5 mr-2 text-primary" />
              <span className="text-xs font-medium">{language}</span>
            </div>
            <Button variant="outline" size="icon" className="rounded-full" onClick={toggleTheme}>
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="icon" className="rounded-full relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-destructive rounded-full border-2 border-background" />
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-2 pl-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs border-2 border-gold shadow-sm">
                JO
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6 overflow-auto">
          {activeTab === 'dashboard' && <CitizenDashboard onNavigate={setActiveTab} />}
          {activeTab === 'assistant' && <AIAssistant />}
          {activeTab === 'services' && <ServiceDirectory />}
          {activeTab === 'applications' && (
            <div className="p-8 text-center bg-card rounded-xl border shadow-sm">
              <FileText className="h-12 w-12 text-primary mx-auto mb-4 opacity-50" />
              <h2 className="text-2xl font-bold">My Applications</h2>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto">Track your active government applications, submitted forms, and pending requests in one place.</p>
              <Button className="mt-6">Submit New Application</Button>
            </div>
          )}
          {activeTab === 'verification' && <DocumentVerification />}
          {activeTab === 'fraud' && <FraudReporting />}
          {activeTab === 'map' && <OfficeMap />}
          {activeTab === 'booking' && <BookingModule />}
          {activeTab === 'analytics' && <AnalyticsPage />}
          {activeTab === 'settings' && (
            <div className="p-8 text-center bg-card rounded-xl border shadow-sm">
              <Settings className="h-12 w-12 text-primary mx-auto mb-4 opacity-50" />
              <h2 className="text-2xl font-bold">Settings</h2>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto">Manage your profile, account security, notification preferences, and application theme.</p>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
                <Card className="p-4 hover:bg-accent/50 cursor-pointer transition-colors">
                  <h3 className="font-bold">Security</h3>
                  <p className="text-xs text-muted-foreground">Manage your 2FA and passwords</p>
                </Card>
                <Card className="p-4 hover:bg-accent/50 cursor-pointer transition-colors" onClick={() => setLanguage(language === 'English' ? 'Hausa' : 'English')}>
                  <h3 className="font-bold">Language</h3>
                  <p className="text-xs text-muted-foreground">Current: {language}</p>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
