import type { Product } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from './ui/button';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group">
      <Card className="h-full flex flex-col overflow-hidden border-border/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-secondary/40">
            <Image
              src={product.images[0].src}
              alt={product.images[0].alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={product.images[0].hint}
            />
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{product.category}</p>
          <h3 className="mt-2 font-semibold text-lg font-headline leading-tight">{product.name}</h3>
        </CardContent>
        <CardFooter className="p-5 pt-0 flex items-center justify-between">
          <p className="font-semibold text-lg text-primary">${product.price.toFixed(2)}</p>
          <Button
            variant="outline"
            className="rounded-full border-primary/30 px-4 text-xs uppercase tracking-[0.2em] group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          >
            View
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
