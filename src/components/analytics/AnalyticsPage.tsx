import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  CheckSquare, 
  MessageSquare, 
  AlertTriangle, 
  Clock, 
  ArrowUpRight, 
  TrendingUp,
  Zap,
  Globe
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const TIME_SAVED_DATA = [
  { month: 'Jan', value: 4500 },
  { month: 'Feb', value: 5200 },
  { month: 'Mar', value: 4800 },
  { month: 'Apr', value: 6100 },
  { month: 'May', value: 7500 },
  { month: 'Jun', value: 8900 },
];

const SERVICE_DISTRIBUTION = [
  { name: 'Passports', value: 35 },
  { name: 'NIN Registry', value: 25 },
  { name: 'Business Reg', value: 20 },
  { name: 'Taxes', value: 15 },
  { name: 'Health', value: 5 },
];

const COLORS = ['#008751', '#CFB53B', '#1E3A8A', '#DC2626', '#7C3AED'];

export function AnalyticsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-black text-primary">National Governance Analytics</h2>
        <p className="text-muted-foreground">Real-time impact metrics of the SmartGov AI digital platform across Nigeria.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          { label: 'Citizens Served', value: '1.2M', growth: '+12%', icon: Users, color: 'text-blue-600' },
          { label: 'Apps Processed', value: '850K', growth: '+8%', icon: CheckSquare, color: 'text-green-600' },
          { label: 'Fraud Reports', value: '2,450', growth: '-15%', icon: AlertTriangle, color: 'text-red-600' },
          { label: 'AI AI Conversations', value: '4.8M', growth: '+24%', icon: MessageSquare, color: 'text-purple-600' },
        ].map((kpi, i) => (
          <Card key={i} className="hover:shadow-lg transition-all border-accent/10">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-xl bg-muted ${kpi.color}`}>
                  <kpi.icon className="h-5 w-5" />
                </div>
                <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                  {kpi.growth} <ArrowUpRight className="h-3 w-3 inline ml-0.5" />
                </Badge>
              </div>
              <div className="text-3xl font-black">{kpi.value}</div>
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mt-1">
                {kpi.label}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 glass">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" /> Estimated Citizen Time Saved
            </CardTitle>
            <CardDescription>Monthly cumulative hours saved compared to physical office visits.</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TIME_SAVED_DATA}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#008751" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#008751" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Area type="monotone" dataKey="value" stroke="#008751" fillOpacity={1} fill="url(#colorValue)" strokeWidth={4} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" /> Service Usage
            </CardTitle>
            <CardDescription>Volume distribution across sectors.</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SERVICE_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {SERVICE_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {SERVICE_DISTRIBUTION.map((item, i) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-bold">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-primary text-primary-foreground overflow-hidden relative border-none">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Zap className="h-32 w-32" />
          </div>
          <CardHeader>
            <CardTitle className="text-2xl">Digital Efficiency Rating</CardTitle>
            <CardDescription className="text-primary-foreground/70">Platform-wide optimization score.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 mb-6">
              <span className="text-6xl font-black">98.4</span>
              <span className="text-2xl font-bold opacity-70 mb-2">/ 100</span>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Server Uptime</span>
                  <span>99.99%</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-accent w-[99.99%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>AI Accuracy</span>
                  <span>94.2%</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-accent w-[94.2%]" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gold/30 bg-gold/5 relative overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Globe className="h-6 w-6 text-gold" /> Multi-Lingual Impact
            </CardTitle>
            <CardDescription>Breakdown of AI assistant language usage.</CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'English', val: 45 },
                { name: 'Hausa', val: 22 },
                { name: 'Yoruba', val: 18 },
                { name: 'Igbo', val: 15 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="val" fill="#CFB53B" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
