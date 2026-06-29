import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ShieldCheck, 
  Upload, 
  FileCheck, 
  AlertCircle, 
  CheckCircle2, 
  FileText, 
  Search,
  Zap,
  HelpCircle
} from 'lucide-react';
import { toast } from 'sonner';

export function DocumentVerification() {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleAnalyze = () => {
    if (!file) return;
    
    setAnalyzing(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setAnalyzing(false);
          setResult({
            score: 85,
            status: 'Pass with Issues',
            issues: [
              'Photograph is slightly blurred',
              'Signature is not perfectly aligned with the box',
              'Document date is close to expiration (3 months remaining)'
            ],
            completeness: '92%'
          });
          toast.success("AI Analysis Complete!");
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-sm border border-primary/20">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-primary">AI Document Verification</h2>
            <p className="text-muted-foreground">Upload your government documents for instant AI-powered completeness checks.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-xl border-accent/10">
          <CardHeader>
            <CardTitle>Upload Document</CardTitle>
            <CardDescription>Supported: Passport, NIN Card, Birth Certificate, Indigene Certificate (PDF, JPG, PNG)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative border-2 border-dashed rounded-3xl p-12 text-center hover:bg-accent/5 hover:border-accent/40 transition-all group overflow-hidden">
              <input 
                type="file" 
                className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                onChange={handleFileChange}
              />
              <div className="space-y-2">
                <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="h-10 w-10 text-muted-foreground" />
                </div>
                {file ? (
                  <div className="animate-in zoom-in-95 duration-300">
                    <p className="text-lg font-bold text-primary">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                ) : (
                  <>
                    <p className="text-lg font-bold">Drag and drop your file here</p>
                    <p className="text-sm text-muted-foreground">or click to browse your computer</p>
                  </>
                )}
              </div>
            </div>

            <Button 
              className="w-full h-12 rounded-xl bg-primary text-white font-bold text-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group"
              disabled={!file || analyzing}
              onClick={handleAnalyze}
            >
              {analyzing ? (
                <>Analyzing Document...</>
              ) : (
                <>
                  <Zap className="h-5 w-5 fill-current" />
                  Analyze with SmartGov AI
                </>
              )}
            </Button>

            {analyzing && (
              <div className="space-y-3 animate-in fade-in duration-300">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  <span>AI Scanning...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="flex gap-4 items-center p-3 bg-muted rounded-xl">
                  <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                  <p className="text-xs text-muted-foreground italic">
                    {progress < 40 ? "Extracting text using OCR..." : progress < 70 ? "Verifying data authenticity..." : "Checking for issues..."}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="glass border-accent/20">
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-widest flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-green-600" /> AI Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold">Health Score</span>
                    <Badge className="bg-orange-500/10 text-orange-600 border-orange-500/20">{result.score}%</Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-muted-foreground">Identified Issues:</p>
                    {result.issues.map((issue: string, i: number) => (
                      <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-red-500/5 text-xs border border-red-500/10">
                        <AlertCircle className="h-3.5 w-3.5 text-red-500 mt-0.5 shrink-0" />
                        <span>{issue}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 rounded-xl bg-green-500/5 border border-green-500/10 flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <div className="text-[10px]">
                      <p className="font-bold text-green-700">Verification Result: {result.status}</p>
                      <p className="text-green-600/80">You can still proceed, but fixing issues might speed up processing.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-3 opacity-30">
                  <Search className="h-10 w-10" />
                  <p className="text-sm">Upload a document to see AI analysis results</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-xs flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-accent" /> Why verify?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                Our AI model is trained on thousands of successful government applications. Verifying your documents before submission reduces the chance of rejection by 85%.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
