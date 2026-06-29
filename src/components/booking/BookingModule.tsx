import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export interface Appointment {
  id: string;
  date: string;
  time: string;
  service: string;
  status: 'confirmed' | 'pending' | 'completed';
  reminders: boolean;
}

export function BookingModule() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState('09:00');
  const [service, setService] = useState('Passport Renewal');
  const [appointments, setAppointments] = useLocalStorage<Appointment[]>('citizen-appointments', []);
  const [step, setStep] = useState<'selection' | 'confirmation'>('selection');

  const handleBooking = () => {
    if (!date) return;

    const newAppointment: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      date: date.toISOString(),
      time,
      service,
      status: 'confirmed',
      reminders: true,
    };

    setAppointments([...appointments, newAppointment]);
    setStep('confirmation');
    toast.success("Appointment Booked Successfully!");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        {step === 'selection' ? (
          <Card>
            <CardHeader>
              <CardTitle>Book an Appointment</CardTitle>
              <CardDescription>Select a service, date and time for your visit.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Service</Label>
                    <Select value={service} onValueChange={setService}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Passport Renewal">Passport Renewal</SelectItem>
                        <SelectItem value="ID Card Application">ID Card Application</SelectItem>
                        <SelectItem value="Driver License">Driver's License Service</SelectItem>
                        <SelectItem value="Tax Consultations">Tax Consultation</SelectItem>
                        <SelectItem value="Housing Permit">Housing Permit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Select Time</Label>
                    <Select value={time} onValueChange={setTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a time" />
                      </SelectTrigger>
                      <SelectContent>
                        {['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'].map(t => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="border rounded-md p-3 flex justify-center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                    className="rounded-md"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t">
                <Button 
                  onClick={handleBooking}
                  disabled={!date}
                >
                  Confirm Selection
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-green-500/50 bg-green-50/50 dark:bg-green-900/10">
            <CardContent className="pt-10 pb-10 flex flex-col items-center text-center">
              <div className="h-20 w-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
              <p className="text-muted-foreground mb-8 max-w-sm">
                Your appointment for <span className="font-semibold text-foreground">{service}</span> on 
                <span className="font-semibold text-foreground"> {date && format(date, 'PPP')} at {time}</span> has been successfully scheduled.
              </p>
              <div className="flex gap-4">
                <Button onClick={() => setStep('selection')}>Book Another</Button>
                <Button variant="outline" onClick={() => window.location.hash = '#my-appointments'}>View My Appointments</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="lg:col-span-1">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" /> My Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-4 pr-3">
                {appointments.length === 0 ? (
                  <div className="text-center py-12">
                    <AlertCircle className="h-10 w-10 text-muted-foreground/30 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No upcoming appointments</p>
                  </div>
                ) : (
                  [...appointments].reverse().map((apt) => (
                    <div key={apt.id} className="p-3 border rounded-lg bg-card/50">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-primary">{apt.service}</span>
                        <Badge variant="outline" className="text-[10px]">{apt.status}</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm mt-2">
                        <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{format(new Date(apt.date), 'MMM d, yyyy')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm mt-1">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{apt.time}</span>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] text-muted-foreground">Reminder active (Email + SMS)</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
