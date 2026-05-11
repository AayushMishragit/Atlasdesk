import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Globe, Heart, Rocket } from "lucide-react";

export default function AboutPage() {
  const values = [
    { title: "Team First", icon: Users, desc: "We build tools that bring people together, not just manage tasks." },
    { title: "Global Impact", icon: Globe, desc: "Empowering teams across 120+ countries to achieve more." },
    { title: "Innovation", icon: Rocket, desc: "Pushing the boundaries of what's possible with AI and collaboration." },
    { title: "User Love", icon: Heart, desc: "Every feature we ship starts with a deep understanding of our users." }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center space-y-6 mb-20">
            <h1 className="text-4xl md:text-6xl font-bold">Our mission is to help teams <span className="text-primary">ship the future</span>.</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              AtlasDesk was founded on the belief that productivity shouldn't be painful. We're building the infrastructure for modern, high-performance teams.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-32">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">The AtlasDesk Story</h2>
              <p className="text-muted-foreground leading-relaxed">
                Started in 2023 by a group of engineers and designers who were tired of bloated project management tools, AtlasDesk was born from a simple idea: what if your workspace actually helped you work?
              </p>
              <p className="text-muted-foreground leading-relaxed">
                By integrating cutting-edge AI directly into the project lifecycle, we've helped over 5,000 teams reduce meeting time by 40% and increase velocity by 2x.
              </p>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-xl border">
              <img 
                src="https://picsum.photos/seed/team-atlas/800/600" 
                alt="The AtlasDesk Team" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <Card key={i} className="rounded-2xl border-none soft-shadow p-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto">
                  <v.icon size={24} />
                </div>
                <h3 className="font-bold text-lg">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
