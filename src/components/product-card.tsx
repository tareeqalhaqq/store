import type { Product } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group">
      <Card className="h-full flex flex-col overflow-hidden border-border/50 bg-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-border">
        <CardHeader className="p-0">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-secondary/30">
            <Image
              src={product.images[0].src}
              alt={product.images[0].alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              data-ai-hint={product.images[0].hint}
            />
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-accent">{product.category}</p>
          <h3 className="mt-1.5 font-bold text-base font-headline leading-tight">{product.name}</h3>
        </CardContent>
        <CardFooter className="p-5 pt-0 flex items-center justify-between">
          <p className="font-bold text-lg text-foreground">${product.price.toFixed(2)}</p>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
            View
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
