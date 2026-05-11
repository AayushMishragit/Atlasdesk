import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-20">
            <div className="space-y-12">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Get in touch with our team.</h1>
                <p className="text-xl text-muted-foreground">
                  Have questions about AtlasDesk? We're here to help you scale your team's productivity.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                {[
                  { icon: Mail, label: "Email", value: "support@atlasdesk.com" },
                  { icon: MessageSquare, label: "Live Chat", value: "Available 24/7" },
                  { icon: MapPin, label: "Office", value: "San Francisco, CA" },
                  { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center gap-3 text-primary">
                      <item.icon size={20} />
                      <span className="font-bold text-sm uppercase tracking-wider">{item.label}</span>
                    </div>
                    <p className="font-medium">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border rounded-[2rem] p-8 md:p-12 shadow-2xl">
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="John" className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Doe" className="rounded-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">How can we help?</Label>
                  <Textarea id="message" placeholder="Tell us more about your needs..." className="rounded-xl min-h-[150px]" />
                </div>
                <Button className="w-full h-12 rounded-xl text-lg font-bold shadow-lg shadow-primary/20">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
