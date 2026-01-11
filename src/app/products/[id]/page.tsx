import { getProduct, getProducts } from "@/lib/printify";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { AddToCartForm } from "@/components/add-to-cart-form";
import { ProductRecommendations } from "@/components/product-recommendations";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.id);
  if (!product) {
    return { title: "Product not found" };
  }
  return {
    title: `${product.name} | Haqq Apparel`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }
  
  const allProducts = await getProducts();

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <Card className="overflow-hidden">
            <Carousel className="w-full">
              <CarouselContent>
                {product.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-square">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                        priority={index === 0}
                        data-ai-hint={image.hint}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {product.images.length > 1 && (
                <>
                  <CarouselPrevious className="left-4" />
                  <CarouselNext className="right-4" />
                </>
              )}
            </Carousel>
          </Card>
        </div>

        <div className="flex flex-col justify-center">
          <div>
            <p className="text-sm font-medium text-primary">{product.category}</p>
            <h1 className="text-3xl md:text-4xl font-bold font-headline mt-1">{product.name}</h1>
            <p className="text-2xl font-bold text-primary mt-4">${product.price.toFixed(2)}</p>
            <p className="mt-4 text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          <div className="mt-6">
            <AddToCartForm product={product} />
          </div>
        </div>
      </div>
      
      <div className="mt-16 md:mt-24">
        <ProductRecommendations currentProductId={product.id} allProducts={allProducts} />
      </div>
    </div>
  );
}
