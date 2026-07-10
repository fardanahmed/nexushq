"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { GraduationCap, CheckCircle2, Clock } from 'lucide-react';
import type { Certification, MentorshipContent } from '../../types';

interface ResourcesTabsProps {
  certifications: Certification[];
  mentorshipContent: MentorshipContent | null;
  mentorshipImgUrl: string;
}

export default function ResourcesTabs({
  certifications,
  mentorshipContent,
  mentorshipImgUrl,
}: ResourcesTabsProps) {
  return (
    <Tabs defaultValue="certifications" className="w-full">
      <div className="flex justify-center mb-12">
        <TabsList className="grid grid-cols-2 gap-1.5 w-full max-w-md rounded-full bg-muted p-1.5 border border-border/50 h-auto">
          <TabsTrigger value="certifications" className="rounded-full py-2.5 font-semibold text-base transition-all data-[state=active]:shadow-md">
            Certifications
          </TabsTrigger>
          <TabsTrigger value="mentorship" className="rounded-full py-2.5 font-semibold text-base transition-all data-[state=active]:shadow-md">
            Mentorship
          </TabsTrigger>
        </TabsList>
      </div>

      {/* Certifications Tab */}
      <TabsContent value="certifications" className="animate-fade-in duration-300 focus-visible:outline-none">
        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {certifications.map((program) => (
            <Card key={program.id || program.title} className="group relative overflow-hidden border-border bg-card/45 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/50 hover:bg-card flex flex-col justify-between">
              <div className="absolute left-0 top-0 h-full w-1.5 bg-primary scale-y-0 transition-transform duration-300 group-hover:scale-y-100" />
              
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-xs font-semibold">
                    <Clock className="h-3.5 w-3.5" />
                    {program.duration}
                  </span>
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary">
                  {program.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed text-base">
                  {program.description}
                </p>
                <Button variant="outline" className="w-full rounded-xl font-semibold border-border bg-card group-hover:border-primary/50 group-hover:bg-primary group-hover:text-white transition-all">
                  View Program Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      {/* Mentorship Tab */}
      <TabsContent value="mentorship" className="animate-fade-in duration-300 focus-visible:outline-none">
        {mentorshipContent && (
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center max-w-6xl mx-auto">
            
            {/* Mentorship Info */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
                  {mentorshipContent.title}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed font-light">
                  {mentorshipContent.description}
                </p>
              </div>
              
              <ul className="grid gap-4">
                {(mentorshipContent.benefits || []).map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3.5">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <span className="text-base md:text-lg text-foreground/80 font-medium">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-4">
                <a 
                  href="/contact?subject=Mentorship%20Application"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-bold text-white shadow-xl shadow-primary/10 transition-all duration-300 hover:scale-105 hover:bg-primary/95"
                >
                  Apply for Mentorship
                </a>
              </div>
            </div>

            {/* Mentorship Image Box */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-500 rounded-2xl blur opacity-15" />
              <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-2xl border border-border/50 shadow-2xl">
                <img 
                  src={mentorshipImgUrl} 
                  alt="Research Mentorship Program" 
                  className="h-full w-full object-cover transition-transform duration-[8000ms] hover:scale-105" 
                />
              </div>
            </div>

          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
