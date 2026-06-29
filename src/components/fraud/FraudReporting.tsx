import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  AlertTriangle, 
  Shield, 
  Upload, 
  CheckCircle2, 
  Search, 
  Info,
  ArrowRight,
  EyeOff,
  User,
  History
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

export function FraudReporting() {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [trackingId, setTrackingId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = 'FRAUD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    setTrackingId(id);
    setStep('success');
    toast.success("Report submitted securely.");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-red-500/10 p-6 rounded-2xl border border-red-500/20">
        <div className="flex gap-4">
          <div className="h-12 w-12 bg-red-500 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-red-600">Report Fraud & Corruption</h2>
            <p className="text-sm text-red-600/80">Help us build a better Nigeria. Your reports are secure and can be anonymous.</p>
          </div>
        </div>
        <Button variant="outline" className="border-red-500/50 text-red-600 hover:bg-red-500/10">
          <History className="h-4 w-4 mr-2" /> Track Report
        </Button>
      </div>

      {step === 'form' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 shadow-xl border-accent/10">
            <CardHeader>
              <CardTitle>Report Details</CardTitle>
              <CardDescription>Please provide as much information as possible about the incident.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl border border-dashed">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${isAnonymous ? 'bg-primary/20 text-primary' : 'bg-accent/20 text-accent-foreground'}`}>
                      {isAnonymous ? <EyeOff className="h-5 w-5" /> : <User className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="font-bold text-sm">Anonymous Reporting</p>
                      <p className="text-xs text-muted-foreground">Your identity will not be shared with anyone.</p>
                    </div>
                  </div>
                  <Switch checked={isAnonymous} onCheckedChange={setIsAnonymous} />
                </div>

                {!isAnonymous && (
                  <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-top-2 duration-300">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Enter your name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="Enter your email" />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="agency">Government Agency / Entity involved</Label>
                  <Input id="agency" placeholder="e.g., FIRS, Police, Local Government" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="incident">Description of Incident</Label>
                  <Textarea 
                    id="incident" 
                    placeholder="Describe what happened, who was involved, and the location..." 
                    className="min-h-[150px]"
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label>Evidence Upload (Optional)</Label>
                  <div className="border-2 border-dashed rounded-xl p-8 text-center hover:bg-accent/5 hover:border-accent/40 transition-all cursor-pointer group">
                    <Upload className="h-10 w-10 mx-auto text-muted-foreground group-hover:scale-110 transition-transform mb-2" />
                    <p className="text-sm font-medium">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">Images, PDFs, or Videos (Max 20MB)</p>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold h-12 rounded-xl shadow-lg">
                  Submit Secure Report
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-primary/5 border-primary/10">
              <CardHeader>
                <div className="flex items-center gap-2 text-primary">
                  <Shield className="h-5 w-5" />
                  <CardTitle className="text-sm uppercase tracking-widest">Our Commitment</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm font-bold">100% Confidentiality</p>
                  <p className="text-xs text-muted-foreground">Encryption protocols ensure your report reaches the right authorities without leaks.</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold">Action Guaranteed</p>
                  <p className="text-xs text-muted-foreground">Every report is reviewed by the Anti-Corruption Agency within 48 hours.</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold">Whistleblower Protection</p>
                  <p className="text-xs text-muted-foreground">Protected under the Federal Whistleblower Policy of Nigeria.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Info className="h-4 w-4 text-accent" /> Did you know?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Reporting corruption saves Nigeria billions of Naira annually. Your action directly impacts the quality of healthcare, education, and infrastructure in your community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <Card className="border-green-500/50 bg-green-500/5 text-center p-12 shadow-2xl animate-in zoom-in-95 duration-500">
          <CardContent className="space-y-6">
            <div className="h-24 w-24 bg-green-500 rounded-full flex items-center justify-center text-white mx-auto shadow-lg shadow-green-500/20">
              <CheckCircle2 className="h-12 w-12" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-green-700">Report Successfully Filed</h2>
              <p className="text-muted-foreground">Thank you for your courage. Your report has been securely transmitted to the authorities.</p>
            </div>

            <div className="p-6 bg-white dark:bg-black/40 rounded-2xl border max-w-sm mx-auto shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Your Tracking ID</p>
              <p className="text-2xl font-black text-primary font-mono">{trackingId}</p>
              <p className="text-[10px] text-muted-foreground mt-2">Save this ID to track the status of your report anonymously.</p>
            </div>

            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={() => setStep('form')}>File Another Report</Button>
              <Button onClick={() => window.location.reload()}>Back to Dashboard</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
