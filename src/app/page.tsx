"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { CheckCircle2, Layout, Zap, Users, ArrowRight, Star, BarChart3, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-dashboard");
  const featureTasks = PlaceHolderImages.find(img => img.id === "feature-tasks");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden hero-gradient">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="secondary" className="mb-6 px-4 py-1 text-sm rounded-full bg-primary/10 text-primary border-primary/20">
              AtlasDesk AI 2.0 is now live ✨
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
              Productivity, Reimagined <br /> For Modern Teams.
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Plan, track, and manage all your team's work in one place. ATLAS is the project management tool you've been waiting for.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="h-14 px-8 text-lg rounded-2xl shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 transition-all hover:scale-105" asChild>
                <Link href="/register">Start free trial <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-2xl glass" asChild>
                <Link href="/#preview">View Demo</Link>
              </Button>
            </div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            id="preview"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-20 relative mx-auto max-w-6xl"
          >
            <div className="rounded-2xl border bg-card/50 p-2 shadow-2xl backdrop-blur-sm relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent pointer-events-none" />
              <Image
                src={heroImage?.imageUrl || "https://picsum.photos/seed/atlas1/1200/800"}
                alt="AtlasDesk Dashboard Preview"
                width={1200}
                height={800}
                className="rounded-xl shadow-lg border"
                priority
                data-ai-hint="SaaS dashboard"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary/20 blur-3xl rounded-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to ship faster.</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our powerful feature set helps teams stay organized and focused on what matters most.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Layout, title: "Project Management", desc: "Organize your workflow into flexible boards, lists, or timelines." },
              { icon: Zap, title: "AI-Powered Tasks", desc: "Automate sub-task creation and refinement using our GenAI engine." },
              { icon: Users, title: "Team Collaboration", desc: "Communicate in context with comments, @mentions, and real-time feeds." },
              { icon: BarChart3, title: "Advanced Analytics", desc: "Track velocity and burndown with beautiful, interactive charts." },
              { icon: ShieldCheck, title: "Enterprise Security", desc: "Role-based access control and top-tier data encryption." },
              { icon: CheckCircle2, title: "Daily Productivity", desc: "A personalized view for every team member to focus on their priorities." },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                {...fadeIn}
                className="group p-8 rounded-2xl border bg-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto rounded-3xl p-12 md:p-20 glass border shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
            <h2 className="text-3xl md:text-5xl font-bold mb-8 relative z-10">Ready to boost your <br /> team's productivity?</h2>
            <p className="text-xl text-muted-foreground mb-10 relative z-10">
              Join 5,000+ teams who use AtlasDesk to get things done.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Button size="lg" className="rounded-xl h-14 px-10 text-lg shadow-xl shadow-primary/20" asChild>
                <Link href="/register">Start your free trial</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl h-14 px-10 text-lg" asChild>
                <Link href="/contact">Talk to sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-semibold">Is there a free trial available?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes! We offer a 14-day free trial for all our premium plans. No credit card required to start.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-semibold">Can I collaborate with external guests?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Absolutely. On our Pro and Enterprise plans, you can invite unlimited read-only guests or specific project collaborators.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-semibold">How does the AI assistant work?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Our AI assistant analyzes your project goals and task descriptions to suggest sub-tasks, clarify scope, and automate tedious documentation.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <Footer />
    </div>
  );
}
