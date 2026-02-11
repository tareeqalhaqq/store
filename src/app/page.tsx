import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { getProducts } from '@/lib/printify';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, ArrowRight, BookOpen, Shirt, NotebookPen } from 'lucide-react';

export default async function Home() {
  let products = [];
  let error = null;

  try {
    products = await getProducts();
  } catch (e: any) {
    error = e.message;
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden hero-gradient text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.12),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(200,170,100,0.08),_transparent_50%)]" />
        <div className="relative container px-4 py-24 md:px-6 md:py-36 lg:py-44">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-xs font-medium tracking-wide text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              New collection available
            </div>
            <h1 className="mt-8 text-5xl font-extrabold font-headline tracking-tight md:text-7xl lg:text-8xl leading-[0.95]">
              Tareeq
              <br />
              Al Haqq
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
              Apparel, notebooks, and books designed with intention for study, reflection, and community.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 h-12 text-sm"
              >
                <Link href="#products">
                  Shop now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/25 text-white hover:bg-white/10 backdrop-blur-sm h-12 px-8 text-sm"
              >
                <Link href="#story">Our story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories bento */}
      <section id="sections" className="py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">What we offer</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold font-headline tracking-tight">
              Curated for purpose
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Shirt,
                title: 'Clothing',
                description: 'Comfortable, modest essentials designed for everyday wear and calm focus.',
                color: 'bg-emerald-50 text-emerald-700',
              },
              {
                icon: NotebookPen,
                title: 'Notebooks',
                description: 'Quality journals for lessons, notes, and personal reflection.',
                color: 'bg-amber-50 text-amber-700',
              },
              {
                icon: BookOpen,
                title: 'Books',
                description: 'Carefully chosen titles to guide study and deepen understanding.',
                color: 'bg-sky-50 text-sky-700',
              },
            ].map(item => (
              <div
                key={item.title}
                className="group relative rounded-2xl border border-border/60 bg-card p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${item.color} mb-5`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold font-headline">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                <ArrowRight className="mt-4 h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design ethos */}
      <section id="story" className="py-20 md:py-28 bg-secondary/40">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Our philosophy</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold font-headline tracking-tight">
                Simple. Reverent.
                <br />
                Intentional.
              </h2>
              <p className="mt-6 text-muted-foreground leading-relaxed max-w-lg">
                Every product at Tareeq Al Haqq is designed to feel serene and focused. We believe in clarity of structure, warm materials, and purposeful curation that supports study, remembrance, and community.
              </p>
              <Button asChild variant="outline" className="mt-8 rounded-full px-6">
                <Link href="#products">
                  Explore the collection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '100%', label: 'Ethically sourced materials' },
                { value: 'Curated', label: 'Weekly new additions' },
                { value: 'Purpose', label: 'In every design choice' },
                { value: 'Community', label: 'Built for connection' },
              ].map(stat => (
                <div key={stat.label} className="rounded-2xl border border-border/60 bg-card p-6">
                  <p className="text-2xl font-bold font-headline text-primary">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Featured</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold font-headline tracking-tight">
                The collection
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              A focused assortment of apparel, notebooks, and books for purposeful everyday living.
            </p>
          </div>
          {error && (
            <Alert variant="destructive" className="max-w-2xl mx-auto">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Error Fetching Products</AlertTitle>
              <AlertDescription>
                <p>{error}</p>
                <p className="mt-2 text-xs">
                  Please ensure your Printify API key is set correctly in the <code className="font-mono">.env</code> file.
                </p>
              </AlertDescription>
            </Alert>
          )}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : !error ? (
            <div className="text-center text-muted-foreground py-20">
              <p>No products found. Please add products to your Printify store.</p>
            </div>
          ) : null}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="relative overflow-hidden rounded-3xl hero-gradient p-12 md:p-20 text-center text-white">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.08),_transparent_60%)]" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">
                Stay on the path
              </h2>
              <p className="mt-4 text-white/70 max-w-md mx-auto">
                Join the community for new releases, curated reading lists, and updates from Tareeq Al Haqq.
              </p>
              <Button
                asChild
                size="lg"
                className="mt-8 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 h-12"
              >
                <Link href="/account">
                  Create your account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
