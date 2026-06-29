import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Cell, PieChart, Pie } from 'recharts';
import { Clock, CheckSquare, TrendingUp, ArrowUpRight, Zap } from 'lucide-react';

const TIME_SAVED_DATA = [
  { month: 'Jan', value: 450, growth: 12 },
  { month: 'Feb', value: 520, growth: 15 },
  { month: 'Mar', value: 480, growth: -5 },
  { month: 'Apr', value: 610, growth: 20 },
  { month: 'May', value: 750, growth: 25 },
  { month: 'Jun', value: 890, growth: 18 },
];

const SERVICE_DATA = [
  { name: 'ID Registry', value: 2400 },
  { name: 'Tax filings', value: 4567 },
  { name: 'Health Services', value: 1398 },
  { name: 'Education', value: 9800 },
  { name: 'Permits', value: 3908 },
];

const COLORS = ['#2563eb', '#7c3aed', '#db2777', '#ea580c', '#16a34a'];

export function ImpactOverview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-bold">Impact Overview</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                +24% <ArrowUpRight className="h-3 w-3 inline ml-0.5" />
              </Badge>
            </div>
            <div className="text-2xl font-bold">12,450 hrs</div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">
              Estimated Citizen Time Saved
            </p>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <CheckSquare className="h-5 w-5 text-primary" />
              </div>
              <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                +18% <ArrowUpRight className="h-3 w-3 inline ml-0.5" />
              </Badge>
            </div>
            <div className="text-2xl font-bold">85,290</div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">
              Total Services Delivered
            </p>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                Active
              </Badge>
            </div>
            <div className="text-2xl font-bold">98.4%</div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">
              Digital Efficiency Rating
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Citizen Time Saved Trends</CardTitle>
            <CardDescription>Monthly cumulative hours saved through digital services</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TIME_SAVED_DATA}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Area type="monotone" dataKey="value" stroke="#2563eb" fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Service Distribution</CardTitle>
            <CardDescription>Delivery breakdown across major government sectors</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center">
            <div className="flex-1 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={SERVICE_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {SERVICE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-48 space-y-2">
              {SERVICE_DATA.map((item, i) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-bold">{(item.value / 1000).toFixed(1)}k</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
