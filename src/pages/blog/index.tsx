import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

const posts = [
  {
    slug: "future-of-ai-productivity",
    title: "The Future of AI in Team Productivity",
    desc: "How generative AI is changing the way high-performance teams collaborate and ship software.",
    date: "March 15, 2024",
    image: "https://picsum.photos/seed/blog1/800/500",
    category: "AI & Future"
  },
  {
    slug: "building-better-workflows",
    title: "10 Tips for Building Resilient Team Workflows",
    desc: "Structure your team's processes to withstand scaling and remote work challenges.",
    date: "March 10, 2024",
    image: "https://picsum.photos/seed/blog2/800/500",
    category: "Productivity"
  },
  {
    slug: "why-we-built-atlasdesk",
    title: "The Story Behind AtlasDesk",
    desc: "Why we decided to build a productivity platform from the ground up in 2024.",
    date: "March 5, 2024",
    image: "https://picsum.photos/seed/blog3/800/500",
    category: "Inside Atlas"
  }
];

export default function BlogListingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center space-y-4 mb-20">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">AtlasDesk <span className="text-primary">Insights</span></h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our latest thoughts on productivity, AI, and building great software.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="group overflow-hidden rounded-3xl border-none soft-shadow bg-card hover:bg-accent/5 transition-colors cursor-pointer flex flex-col h-full">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <CardHeader className="space-y-3 flex-grow">
                    <p className="text-xs text-muted-foreground font-medium">{post.date}</p>
                    <CardTitle className="text-2xl leading-tight group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-base line-clamp-3">
                      {post.desc}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
