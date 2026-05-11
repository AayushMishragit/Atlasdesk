import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  Rocket, 
  Zap, 
  Users, 
  BarChart, 
  Shield, 
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function LandingPage() {
  const features = [
    {
      title: "AI-Powered Workflows",
      description: "Automate repetitive tasks and get intelligent project insights with our built-in Gemini engine.",
      icon: Zap,
    },
    {
      title: "Real-time Collaboration",
      description: "Work together seamlessly with live cursors, instant notifications, and integrated team chat.",
      icon: Users,
    },
    {
      title: "Advanced Analytics",
      description: "Visualize team velocity and project health with beautiful, interactive charts and data dashboards.",
      icon: BarChart,
    },
    {
      title: "Enterprise Security",
      description: "Role-based access control, SSO, and audit logs keep your team's sensitive data safe and compliant.",
      icon: Shield,
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow">
        <section className="pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold"
              >
                <Rocket size={16} />
                <span>Reimagined for high-performance teams</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-tight"
              >
                Project management <span className="text-primary">evolved</span> with AI.
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-muted-foreground max-w-2xl leading-relaxed"
              >
                AtlasDesk combines intuitive task management with powerful generative AI to help your team ship faster, smarter, and together.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-4 pt-4"
              >
                <Button asChild size="lg" className="h-14 px-8 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20">
                  <Link href="/register">Get Started for Free</Link>
                </Button>
                <Button variant="outline" size="lg" className="h-14 px-8 rounded-2xl text-lg font-bold">
                  Book a Demo
                </Button>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-20 relative max-w-6xl mx-auto rounded-3xl overflow-hidden border shadow-2xl"
            >
              <Image 
                src="https://picsum.photos/seed/atlas-hero/1200/800"
                alt="AtlasDesk Dashboard Preview"
                width={1200}
                height={800}
                className="w-full object-cover"
              />
            </motion.div>
          </div>
        </section>

        <section id="features" className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Everything you need to ship faster</h2>
              <p className="text-muted-foreground text-lg">Powerful features built for teams of all sizes.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-3xl bg-background border hover:shadow-xl transition-shadow space-y-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <feature.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 overflow-hidden relative">
          <div className="absolute inset-0 hero-gradient opacity-50" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto p-12 md:p-20 rounded-[3rem] bg-primary text-primary-foreground text-center space-y-8 shadow-2xl">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">Ready to transform your productivity?</h2>
              <p className="text-xl opacity-90 max-w-xl mx-auto">
                Join thousands of teams who are already building the future with AtlasDesk.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button asChild size="lg" variant="secondary" className="h-14 px-10 rounded-2xl text-lg font-bold">
                  <Link href="/register">Sign Up Now</Link>
                </Button>
                <Link href="/pricing" className="text-lg font-bold hover:underline inline-flex items-center gap-2">
                  View Pricing <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
