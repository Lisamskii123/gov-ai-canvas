import React, { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Search, MapPin, Navigation, Info, X, Phone, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Office {
  id: string;
  name: string;
  address: string;
  type: 'Municipal' | 'Registry' | 'Health' | 'Education';
  status: 'Open' | 'Closed';
  hours: string;
  phone: string;
  coords: { x: number; y: number };
}

const OFFICES: Office[] = [
  { id: '1', name: 'City Hall - Municipal Center', address: '123 Government Plaza', type: 'Municipal', status: 'Open', hours: '08:00 - 17:00', phone: '+1 555-0101', coords: { x: 45, y: 30 } },
  { id: '2', name: 'Vital Records Registry', address: '456 Heritage Way', type: 'Registry', status: 'Open', hours: '09:00 - 16:00', phone: '+1 555-0102', coords: { x: 60, y: 55 } },
  { id: '3', name: 'Community Health Clinic', address: '789 Wellness Dr', type: 'Health', status: 'Open', hours: '07:00 - 19:00', phone: '+1 555-0103', coords: { x: 25, y: 70 } },
  { id: '4', name: 'District Education Board', address: '101 Scholar Lane', type: 'Education', status: 'Closed', hours: '08:30 - 16:30', phone: '+1 555-0104', coords: { x: 75, y: 25 } },
  { id: '5', name: 'Public Library & Archive', address: '202 Knowledge St', type: 'Education', status: 'Open', hours: '10:00 - 20:00', phone: '+1 555-0105', coords: { x: 35, y: 45 } },
];

export function OfficeMap() {
  const [search, setSearch] = useState('');
  const [selectedOffice, setSelectedOffice] = useState<Office | null>(null);

  const filteredOffices = useMemo(() => {
    return OFFICES.filter(office => 
      office.name.toLowerCase().includes(search.toLowerCase()) ||
      office.address.toLowerCase().includes(search.toLowerCase()) ||
      office.type.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="flex flex-col md:flex-row gap-4 h-[600px]">
      <Card className="w-full md:w-80 flex flex-col shadow-xl border-accent/10">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-xl font-black text-primary">Office Locator</CardTitle>
          <div className="relative mt-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search offices..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-3">
              {filteredOffices.map((office) => (
                <div
                  key={office.id}
                  className={cn(
                    "p-3 rounded-xl border cursor-pointer transition-all hover:shadow-md",
                    selectedOffice?.id === office.id ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border"
                  )}
                  onClick={() => setSelectedOffice(office)}
                >
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold text-sm">{office.name}</h4>
                    <Badge variant={office.status === 'Open' ? 'default' : 'secondary'} className={cn("text-[10px] px-1 h-4", office.status === 'Open' ? "bg-green-600" : "")}>
                      {office.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {office.address}
                  </p>
                </div>
              ))}
              {filteredOffices.length === 0 && (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No offices found matching your search.
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="flex-1 relative bg-muted rounded-xl border overflow-hidden">
        {/* Mock Map Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
           <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0,20 Q20,10 40,30 T80,20 T100,40" fill="none" stroke="currentColor" strokeWidth="0.5" />
             <path d="M10,0 Q30,40 20,60 T40,100" fill="none" stroke="currentColor" strokeWidth="0.5" />
             <path d="M70,0 Q60,30 90,50 T70,100" fill="none" stroke="currentColor" strokeWidth="0.5" />
             <circle cx="20" cy="20" r="15" fill="currentColor" opacity="0.1" />
             <circle cx="80" cy="70" r="20" fill="currentColor" opacity="0.1" />
           </svg>
        </div>

        {/* Map Grid Markers */}
        <div className="absolute inset-0">
          {filteredOffices.map((office) => (
            <button
              key={office.id}
              className={cn(
                "absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
                "hover:scale-125 hover:z-20"
              )}
              style={{ left: `${office.coords.x}%`, top: `${office.coords.y}%` }}
              onClick={() => setSelectedOffice(office)}
            >
              <div className={cn(
                "p-1.5 rounded-full shadow-lg border-2",
                selectedOffice?.id === office.id 
                  ? "bg-primary text-primary-foreground border-white scale-110 z-10" 
                  : "bg-white text-primary border-primary hover:border-accent"
              )}>
                <MapPin className="h-5 w-5" />
              </div>
            </button>
          ))}
        </div>

        {/* Detail Popup */}
        <AnimatePresence>
          {selectedOffice && (
            <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:bottom-4 md:w-80 glass-dark border-gold/30 rounded-2xl shadow-2xl p-6 animate-in slide-in-from-right-4 duration-500">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <Badge className="mb-1 bg-accent/20 text-gold border-gold/30">{selectedOffice.type}</Badge>
                  <h3 className="font-black text-lg leading-tight text-white">{selectedOffice.name}</h3>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 -mr-2 -mt-1" onClick={() => setSelectedOffice(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-2 mt-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-gold" />
                  <span>{selectedOffice.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 text-gold" />
                  <span>{selectedOffice.hours}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 text-gold" />
                  <span>{selectedOffice.phone}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4">
                <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                  <Navigation className="h-3 w-3 mr-1" /> Route
                </Button>
                <Button size="sm" variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  <Info className="h-3 w-3 mr-1" /> Details
                </Button>
              </div>
            </div>
          )}
        </AnimatePresence>

        <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm border rounded px-2 py-1 text-[10px] font-bold tracking-wider uppercase">
          Live Map Simulation
        </div>
      </div>
    </div>
  );
}
