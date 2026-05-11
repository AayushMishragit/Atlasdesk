import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Share2, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

export default function BlogDetailPage() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        <article className="container mx-auto px-4 max-w-3xl">
          <Link href="/blog">
            <Button variant="ghost" className="mb-8 rounded-xl gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft size={16} /> Back to Blog
            </Button>
          </Link>

          <header className="space-y-6 mb-12 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground font-medium">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-widest text-[10px] font-bold">Productivity</span>
              <span className="flex items-center gap-1"><Clock size={14} /> 6 min read</span>
              <span>March 15, 2024</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              The Future of AI in Team Productivity
            </h1>
            <div className="flex items-center justify-center md:justify-start gap-3 pt-4">
              <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden">
                <img src="https://picsum.photos/seed/author/100/100" alt="Author" />
              </div>
              <div className="text-left">
                <p className="font-bold">Alex Rivers</p>
                <p className="text-xs text-muted-foreground">Product Designer at AtlasDesk</p>
              </div>
            </div>
          </header>

          <div className="aspect-video rounded-3xl overflow-hidden mb-12 shadow-2xl">
            <img src="https://picsum.photos/seed/blog-hero/1200/800" alt="Article Header" className="w-full h-full object-cover" />
          </div>

          <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-6">
            <p>
              Generative AI is no longer a futuristic concept—it's actively reshaping how high-performance teams collaborate and deliver software. In this post, we explore the intersection of LLMs and daily workflows.
            </p>
            <h2 className="text-3xl font-bold text-foreground">Beyond Simple Chat</h2>
            <p>
              The first wave of AI in the workplace focused on basic chat interfaces. Today, the integration is much deeper. At AtlasDesk, we believe the best AI is the one that works in the background, refining tasks and surfacing insights before you even ask.
            </p>
            <blockquote className="border-l-4 border-primary pl-6 py-2 italic text-xl text-foreground">
              "The goal isn't just to work faster, but to eliminate the work that shouldn't exist in the first place."
            </blockquote>
            <p>
              By leveraging semantic search and intelligent task decomposition, teams can now bridge the gap between high-level goals and actionable daily tasks with unprecedented speed.
            </p>
          </div>

          <footer className="mt-20 pt-10 border-t flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="font-bold text-lg">Share this article</p>
            <div className="flex gap-4">
              <Button variant="outline" size="icon" className="rounded-xl"><Twitter size={18} /></Button>
              <Button variant="outline" size="icon" className="rounded-xl"><Linkedin size={18} /></Button>
              <Button variant="outline" size="icon" className="rounded-xl"><Share2 size={18} /></Button>
            </div>
          </footer>
        </article>
      </main>
      <Footer />
    </div>
  );
}
