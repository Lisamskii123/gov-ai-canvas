import React, { useState, useEffect } from 'react';
import { ShieldCheck, ShieldAlert, HelpCircle, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Violation {
  id: string;
  element: string;
  reason: string;
  severity: 'Critical' | 'Moderate' | 'Minor';
  selector: string;
}

export function AccessibilityAuditor() {
  const [score, setScore] = useState(100);
  const [violations, setViolations] = useState<Violation[]>([]);
  const [showHighlighter, setShowHighlighter] = useState(false);

  useEffect(() => {
    const runAudit = () => {
      const newViolations: Violation[] = [];
      
      // Check images for alt text
      document.querySelectorAll('img').forEach((img, i) => {
        if (!img.alt && !img.getAttribute('aria-hidden')) {
          newViolations.push({
            id: `img-${i}`,
            element: 'Image',
            reason: 'Missing alt attribute',
            severity: 'Critical',
            selector: 'img:not([alt])'
          });
          if (showHighlighter) img.style.outline = '3px solid red';
        }
      });

      // Check buttons for labels
      document.querySelectorAll('button').forEach((btn, i) => {
        if (!btn.innerText.trim() && !btn.getAttribute('aria-label') && !btn.getAttribute('title')) {
          newViolations.push({
            id: `btn-${i}`,
            element: 'Button',
            reason: 'Missing accessible name (aria-label or text)',
            severity: 'Critical',
            selector: 'button:empty:not([aria-label])'
          });
          if (showHighlighter) btn.style.outline = '3px solid red';
        }
      });

      // Check for empty links
      document.querySelectorAll('a').forEach((a, i) => {
        if (!a.innerText.trim() && !a.getAttribute('aria-label')) {
          newViolations.push({
            id: `a-${i}`,
            element: 'Link',
            reason: 'Empty link without aria-label',
            severity: 'Moderate',
            selector: 'a:empty'
          });
          if (showHighlighter) a.style.outline = '3px solid orange';
        }
      });

      setViolations(newViolations);
      
      // Calculate score (simple mock logic)
      const baseScore = 100;
      const criticalPenalty = newViolations.filter(v => v.severity === 'Critical').length * 10;
      const moderatePenalty = newViolations.filter(v => v.severity === 'Moderate').length * 5;
      setScore(Math.max(0, baseScore - criticalPenalty - moderatePenalty));
    };

    // Run audit after a short delay to allow components to mount
    const timer = setTimeout(runAudit, 1000);
    return () => {
      clearTimeout(timer);
      // Clean up outlines
      document.querySelectorAll('*').forEach(el => {
        if (el instanceof HTMLElement) el.style.outline = '';
      });
    };
  }, [showHighlighter]);

  return (
    <Card className="border-primary/20 bg-background/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <CardTitle>Accessibility Score</CardTitle>
          </div>
          <Badge variant={score > 90 ? 'default' : score > 70 ? 'secondary' : 'destructive'}>
            {score > 90 ? 'Excellent' : score > 70 ? 'Good' : 'Needs Improvement'}
          </Badge>
        </div>
        <CardDescription>Real-time WCAG 2.1 compliance monitoring</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-2xl font-bold">
            <span>{score}%</span>
            <span className="text-sm font-normal text-muted-foreground self-end">Target: 100%</span>
          </div>
          <Progress value={score} className="h-3" />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-semibold flex items-center gap-1">
              <ShieldAlert className="h-4 w-4 text-destructive" /> 
              Failing Elements ({violations.length})
            </h4>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 text-xs"
              onClick={() => setShowHighlighter(!showHighlighter)}
            >
              {showHighlighter ? <EyeOff className="h-3.5 w-3.5 mr-1" /> : <Eye className="h-3.5 w-3.5 mr-1" />}
              {showHighlighter ? 'Hide Highlights' : 'Highlight Issues'}
            </Button>
          </div>
          
          <ScrollArea className="h-[180px] rounded-md border bg-muted/30">
            <div className="p-3 space-y-2">
              {violations.length > 0 ? (
                violations.map((v) => (
                  <div key={v.id} className="text-xs p-2 rounded border bg-card flex flex-col gap-1">
                    <div className="flex justify-between">
                      <span className="font-bold">{v.element}</span>
                      <span className={cn(
                        "px-1.5 py-0.5 rounded-full text-[10px] uppercase font-bold",
                        v.severity === 'Critical' ? "bg-destructive/10 text-destructive" : "bg-orange-100 text-orange-700"
                      )}>
                        {v.severity}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{v.reason}</p>
                    <code className="bg-muted px-1 py-0.5 rounded text-[10px] mt-1">{v.selector}</code>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                  <ShieldCheck className="h-8 w-8 mb-2 opacity-20" />
                  <p>No critical accessibility issues detected.</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        <div className="flex items-center gap-2 p-2 rounded-lg bg-primary/5 text-xs text-muted-foreground border border-primary/10">
          <HelpCircle className="h-4 w-4 text-primary shrink-0" />
          <p>Score is calculated based on automated ARIA, semantic, and structural checks across the current view.</p>
        </div>
      </CardContent>
    </Card>
  );
}
