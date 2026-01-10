import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { getProducts } from '@/lib/printify';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

export default async function Home() {
  const heroImage = {
    src: 'https://picsum.photos/seed/200/1600/600',
    alt: 'Islamic geometric pattern banner',
    hint: 'islamic pattern',
  };

  let products = [];
  let error = null;

  try {
    products = await getProducts();
  } catch (e: any) {
    error = e.message;
  }

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center text-center text-primary-foreground">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          className="object-cover -z-10 brightness-50"
          data-ai-hint={heroImage.hint}
        />
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold font-headline md:text-6xl text-white drop-shadow-lg">
              Curated for the Seeker
            </h1>
            <p className="mt-4 text-lg text-gray-200 drop-shadow-md">
              Discover a collection of goods that inspire, educate, and adorn
              the path of truth.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Link href="#products">Shop Now</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="products" className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-headline tracking-tight">
              Featured Products
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Handpicked items for your journey.
            </p>
          </div>
          {error && (
            <Alert variant="destructive" className="max-w-2xl mx-auto">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Error Fetching Products</AlertTitle>
              <AlertDescription>
                <p>{error}</p>
                <p className="mt-2 text-xs">
                  Please ensure your Printify API key is set correctly in the{' '}
                  <code className="font-mono">.env</code> file.
                </p>
              </AlertDescription>
            </Alert>
          )}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : !error ? (
            <div className="text-center text-muted-foreground">
              <p>
                No products found. Please add products to your Printify store.
              </p>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
