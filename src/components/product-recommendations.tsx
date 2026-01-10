import { getProductRecommendations } from "@/ai/flows/product-recommendation";
import { ProductCard } from "./product-card";
import { Lightbulb } from "lucide-react";
import type { Product } from "@/lib/types";

export async function ProductRecommendations({ currentProductId, allProducts }: { currentProductId: string, allProducts: Product[] }) {
  const currentProduct = allProducts.find(p => p.id === currentProductId);
  
  if (!currentProduct || allProducts.length <= 1) {
    return null;
  }
  
  const allProductsInfo = allProducts.map(p => ({ id: p.id, name: p.name }));
  const currentProductInfo = {
    id: currentProduct.id,
    name: currentProduct.name,
    description: currentProduct.description,
    category: currentProduct.category,
  }

  try {
    const recommendations = await getProductRecommendations({ 
      currentProduct: currentProductInfo,
      allProducts: allProductsInfo 
    });
    
    // Filter out the current product from the recommendations
    const recommendedProducts = allProducts
      .filter(p => recommendations.recommendedProductIds.includes(p.id) && p.id !== currentProductId);

    if (recommendedProducts.length === 0) {
      return null;
    }

    return (
      <div className="bg-secondary/30 rounded-lg p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <Lightbulb className="w-6 h-6 text-accent" />
          <h2 className="text-2xl md:text-3xl font-bold font-headline">You Might Also Like</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to get product recommendations:", error);
    return null;
  }
}
