import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Briefcase, 
  FileText, 
  ShieldCheck, 
  AlertTriangle, 
  Bell, 
  Search,
  ArrowRight,
  TrendingUp,
  Clock,
  Calendar
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { AccessibilityAuditor } from '@/components/accessibility/AccessibilityAuditor';

interface CitizenDashboardProps {
  onNavigate: (id: string) => void;
}

export function CitizenDashboard({ onNavigate }: CitizenDashboardProps) {
  const announcements = [
    { id: 1, title: "New CAC Registration Guidelines", date: "2 hours ago", category: "Business" },
    { id: 2, title: "Nationwide Digital Literacy Initiative", date: "5 hours ago", category: "Education" },
    { id: 3, title: "Updated Tax Compliance Requirements", date: "1 day ago", category: "Finance" },
  ];

  const emergencyAlerts = [
    { id: 1, type: "Flood Warning", location: "Lagos State", severity: "High" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Hero Section */}
      <div className="relative h-64 rounded-3xl overflow-hidden shadow-2xl">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/77d3ec53-7ac5-42ad-8f7b-4347113e2857/smartgov-ai-hero-efa06de2-1782704218443.webp" 
          alt="SmartGov AI Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent flex flex-col justify-center p-8 text-white">
          <h2 className="text-4xl font-black mb-2">SmartGov AI</h2>
          <p className="text-lg opacity-90 max-w-md">Your gateway to intelligent digital governance in Nigeria. Access services, track applications, and report issues with AI-powered support.</p>
          <div className="mt-6 flex gap-3">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-full px-6" onClick={() => onNavigate('assistant')}>
              Ask AI Assistant
            </Button>
            <Button variant="outline" className="text-white border-white/50 hover:bg-white/10 rounded-full px-6" onClick={() => onNavigate('services')}>
              Browse Services
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Actions & Emergency */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { id: 'assistant', label: 'AI Assistant', icon: MessageSquare, color: 'bg-blue-500' },
              { id: 'services', label: 'Services', icon: Briefcase, color: 'bg-green-600' },
              { id: 'applications', label: 'Applications', icon: FileText, color: 'bg-orange-500' },
              { id: 'fraud', label: 'Report Fraud', icon: AlertTriangle, color: 'bg-red-500' },
            ].map((action) => (
              <Card key={action.id} className="cursor-pointer hover:shadow-lg transition-all group" onClick={() => onNavigate(action.id)}>
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className={`${action.color} p-3 rounded-2xl text-white mb-3 group-hover:scale-110 transition-transform`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-bold">{action.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-6 glass">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Recent Government Announcements</CardTitle>
                <Button variant="ghost" size="sm" className="text-primary font-bold">View All</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {announcements.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-accent/50 transition-colors cursor-pointer border border-transparent hover:border-accent/20">
                  <div className="flex gap-4 items-center">
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">{item.category}</Badge>
                    <span className="font-medium text-sm">{item.title}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {emergencyAlerts.length > 0 && (
            <Card className="border-red-500/50 bg-red-500/10 animate-pulse">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-red-600 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" /> Emergency Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                {emergencyAlerts.map(alert => (
                  <div key={alert.id} className="space-y-1">
                    <p className="font-bold">{alert.type}</p>
                    <p className="text-sm text-red-600/80">{alert.location} - {alert.severity} Severity</p>
                    <Button variant="link" className="p-0 h-auto text-red-600 underline">Read Safety Instructions</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          <Card className="bg-primary text-primary-foreground overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <TrendingUp className="h-24 w-24" />
            </div>
            <CardHeader>
              <CardTitle className="text-lg">Smart Search</CardTitle>
              <CardDescription className="text-primary-foreground/70">Find services, news, or documents instantly.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-primary" />
                <Input placeholder="Search everything..." className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/50 focus:bg-white/30 transition-all rounded-full" />
              </div>
            </CardContent>
          </Card>

          <AccessibilityAuditor />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card className="glass-dark border-gold/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-2xl">
                <Briefcase className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Active Services</p>
                <p className="text-2xl font-black">12 Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-dark border-gold/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-2xl">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">My Applications</p>
                <p className="text-2xl font-black">4 Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-dark border-gold/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-500/10 rounded-2xl">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Appointments</p>
                <p className="text-2xl font-black">2 Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-dark border-gold/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/10 rounded-2xl">
                <Clock className="h-6 w-6 text-gold" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Time Saved</p>
                <p className="text-2xl font-black">18.5 hrs</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
