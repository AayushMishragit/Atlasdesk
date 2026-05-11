"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "$0",
      description: "Perfect for individuals and side projects.",
      features: ["Up to 3 projects", "Unlimited tasks", "Basic AI assistant", "Team activity feed", "Community support"],
      button: "Start for free",
      popular: false,
    },
    {
      name: "Pro",
      price: "$19",
      description: "Everything you need to grow your team.",
      features: ["Unlimited projects", "Advanced AI workflow", "Custom roles & permissions", "Priority support", "Analytics dashboard"],
      button: "Try Pro free",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Scalable solutions for large organizations.",
      features: ["Dedicated account manager", "SSO & SAML", "Advanced security logs", "Onboarding & training", "Unlimited guests"],
      button: "Contact sales",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing.</h1>
            <p className="text-xl text-muted-foreground">
              Choose the plan that's right for your team. All plans include a 14-day free trial of Pro features.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, idx) => (
              <Card 
                key={idx} 
                className={`flex flex-col rounded-3xl relative overflow-hidden transition-all duration-300 hover:shadow-2xl ${plan.popular ? 'border-primary ring-2 ring-primary/20 scale-105 z-10' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <Badge className="bg-primary text-white rounded-none rounded-bl-xl px-4 py-1">MOST POPULAR</Badge>
                  </div>
                )}
                <CardHeader className="pt-10">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="flex items-baseline gap-1 mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-muted-foreground">/mo</span>}
                  </div>
                  <CardDescription className="mt-4 text-base">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-4">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-sm">
                        <Check className="h-5 w-5 text-primary shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pb-10">
                  <Button className={`w-full h-12 rounded-xl text-lg ${plan.popular ? 'bg-primary shadow-lg shadow-primary/20' : 'variant-outline'}`} variant={plan.popular ? 'default' : 'outline'}>
                    {plan.button}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
