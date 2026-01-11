import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { getProducts } from '@/lib/printify';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

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
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.2),_transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/90 to-primary" />
        <div className="relative container px-4 py-20 md:px-6 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-primary-foreground/70">Haqq Apparel</p>
              <h1 className="mt-4 text-4xl font-semibold font-headline md:text-6xl">
                Apparel, notebooks, and books with intention.
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                Haqq Apparel blends modern form with timeless purpose, offering everyday pieces for study, reflection, and
                community.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild size="lg" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href="#products">Shop the collection</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Link href="#story">Our design ethos</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-3xl border border-primary-foreground/20 bg-primary-foreground/10 p-8 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.35em] text-primary-foreground/60">What you&apos;ll find</p>
              <ul className="mt-6 space-y-5 text-base">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  Clothing built for comfort and calm focus.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  Notebooks for lessons, notes, and reflection.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  Books to guide study and strengthen understanding.
                </li>
              </ul>
              <div className="mt-8 border-t border-primary-foreground/20 pt-6 text-sm text-primary-foreground/70">
                Curated weekly with intentional design and ethical sourcing.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="story" className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.6fr_1fr] lg:items-center">
            <div className="rounded-3xl border border-border/60 bg-secondary/40 p-8">
              <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Design principles</p>
              <h2 className="mt-4 text-3xl font-semibold font-headline">Simple. Reverent. Intentional.</h2>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Haqq Apparel is designed to feel serene and focused. Every element is placed for clarity, comfort, and
                purpose.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: 'Clarity in structure',
                  description: 'Open layouts, intentional spacing, and calm typography.',
                },
                {
                  title: 'Warm materials',
                  description: 'Soft neutrals with deep green and gold accents.',
                },
                {
                  title: 'Purposeful curation',
                  description: 'Products that support study, remembrance, and community.',
                },
              ].map(item => (
                <div key={item.title} className="rounded-2xl border border-border/60 bg-background p-6 shadow-sm">
                  <h3 className="font-semibold text-lg font-headline">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="sections" className="bg-secondary/40 py-14">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Clothing',
                description: 'Soft essentials and modest staples crafted for daily wear.',
              },
              {
                title: 'Notebooks',
                description: 'Lined and blank journals for lessons, notes, and reflection.',
              },
              {
                title: 'Books',
                description: 'Carefully chosen titles to guide study and deepen understanding.',
              },
            ].map(item => (
              <div key={item.title} className="rounded-2xl border border-border/60 bg-background p-6">
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Featured collection</p>
            <h2 className="mt-3 text-3xl font-semibold font-headline tracking-tight">Shop the curated edit</h2>
            <p className="mt-3 text-lg text-muted-foreground">
              A focused assortment of apparel, notebooks, and books for everyday study.
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
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : !error ? (
            <div className="text-center text-muted-foreground">
              <p>No products found. Please add products to your Printify store.</p>
            </div>
          ) : null}
        </div>
      </section>

      <section className="border-t border-border/60 bg-background py-14">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center gap-6 rounded-3xl border border-border/60 bg-secondary/30 p-10 text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Stay connected</p>
            <h2 className="text-3xl font-semibold font-headline">Receive new releases & community notes.</h2>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Join the mailing list for seasonal drops, curated reading lists, and updates from Haqq Apparel.
            </p>
            <Button asChild size="lg" className="rounded-full">
              <Link href="/account">Create your account</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
