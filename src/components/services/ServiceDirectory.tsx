import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Briefcase, 
  Users, 
  Building2, 
  BookOpen, 
  HeartPulse, 
  ShieldCheck,
  FileText,
  Clock,
  ArrowRight,
  Filter
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SERVICES = [
  {
    id: '1',
    title: 'Passport Application & Renewal',
    category: 'Citizenship',
    description: 'Apply for a new Nigerian passport or renew your existing one online.',
    eligibility: 'Nigerian Citizens by birth, registration or naturalization.',
    documents: ['Birth Certificate', 'NIN Card', 'Old Passport (for renewal)'],
    time: '3 - 6 weeks',
    icon: ShieldCheck,
    color: 'text-blue-600'
  },
  {
    id: '2',
    title: 'NIN Registration',
    category: 'Identity',
    description: 'Enrol for your National Identification Number (NIN) to access social services.',
    eligibility: 'Every Nigerian citizen and legal residents.',
    documents: ['Valid ID', 'Proof of Address'],
    time: 'Instant enrollment',
    icon: Users,
    color: 'text-green-600'
  },
  {
    id: '3',
    title: 'CAC Business Registration',
    category: 'Business',
    description: 'Register your company, NGO or business name with the Corporate Affairs Commission.',
    eligibility: 'Individuals above 18 years or corporate bodies.',
    documents: ['NIN', 'Passport Photograph', 'Address of Business'],
    time: '2 - 7 days',
    icon: Building2,
    color: 'text-orange-600'
  },
  {
    id: '4',
    title: 'Personal Income Tax Filing',
    category: 'Finance',
    description: 'File your annual tax returns with the FIRS or your State Internal Revenue Service.',
    eligibility: 'Every person earning income in Nigeria.',
    documents: ['Income statements', 'TIN'],
    time: 'Annual filing',
    icon: FileText,
    color: 'text-red-600'
  },
  {
    id: '5',
    title: 'NHIA Health Enrollment',
    category: 'Healthcare',
    description: 'Enrol for the National Health Insurance Authority programme for affordable healthcare.',
    eligibility: 'All residents of Nigeria.',
    documents: ['NIN', 'Passport Photograph'],
    time: 'Instant enrollment',
    icon: HeartPulse,
    color: 'text-pink-600'
  },
  {
    id: '6',
    title: 'UBE Scholarship Application',
    category: 'Education',
    description: 'Apply for the Universal Basic Education scholarship programmes for students.',
    eligibility: 'Students in public primary and secondary schools.',
    documents: ['School ID', 'Indigene Certificate'],
    time: 'Seasonal',
    icon: BookOpen,
    color: 'text-purple-600'
  }
];

export function ServiceDirectory() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Citizenship', 'Identity', 'Business', 'Finance', 'Healthcare', 'Education'];

  const filteredServices = SERVICES.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(search.toLowerCase()) || 
                         service.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || service.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-primary">Government Services</h2>
          <p className="text-muted-foreground">Access all Nigerian federal and state digital services from one place.</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search services..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 rounded-full"
            />
          </div>
          <Button variant="outline" size="icon" className="rounded-full">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="All" className="w-full">
        <TabsList className="bg-transparent h-auto p-0 flex flex-wrap gap-2">
          {categories.map(category => (
            <TabsTrigger 
              key={category} 
              value={category}
              onClick={() => setActiveCategory(category)}
              className="rounded-full px-4 py-2 border data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id} className="hover:shadow-2xl transition-all border-accent/20 hover:-translate-y-1 overflow-hidden flex flex-col">
            <div className="h-2 bg-primary w-full" />
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <div className={`p-2 rounded-xl bg-muted ${service.color}`}>
                  <service.icon className="h-6 w-6" />
                </div>
                <Badge variant="secondary" className="bg-accent/10 text-gold border-accent/20">{service.category}</Badge>
              </div>
              <CardTitle className="text-xl leading-tight">{service.title}</CardTitle>
              <CardDescription className="line-clamp-2">{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex-1">
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-xs">
                  <Users className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold">Eligibility: </span>
                    <span className="text-muted-foreground">{service.eligibility}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <FileText className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold">Documents: </span>
                    <span className="text-muted-foreground">{service.documents.join(', ')}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
                  <div>
                    <span className="font-bold">Time: </span>
                    <span className="text-muted-foreground">{service.time}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button className="w-full group">
                Apply Now <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardFooter>
          </Card>
        ))}
        {filteredServices.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <Search className="h-12 w-12 mx-auto text-muted-foreground opacity-20 mb-4" />
            <h3 className="text-xl font-bold">No services found</h3>
            <p className="text-muted-foreground">Try adjusting your search or category filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
