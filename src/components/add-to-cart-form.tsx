"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/use-cart";
import { Plus, Minus, ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";

export function AddToCartForm({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: string }>(() => {
    const defaultVariants: { [key: string]: string } = {};
    product.variants?.forEach(v => {
      if(v.options.length > 0) {
        defaultVariants[v.type] = v.options[0].value;
      }
    });
    return defaultVariants;
  });
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      quantity,
      variant: selectedVariants,
    });
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} has been added to your cart.`,
    });
  };

  const handleVariantChange = (variantType: string, value: string) => {
    setSelectedVariants(prev => ({...prev, [variantType]: value}));
  }

  return (
    <div className="space-y-4">
      {product.variants?.map((variant) => (
        <div key={variant.type} className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor={variant.type}>{variant.type}</Label>
          <Select onValueChange={(value) => handleVariantChange(variant.type, value)} defaultValue={variant.options[0]?.value}>
            <SelectTrigger id={variant.type} className="w-full">
              <SelectValue placeholder={`Select ${variant.type}`} />
            </SelectTrigger>
            <SelectContent>
              {variant.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
      <div className="flex items-center gap-4">
        <div className="flex items-center border rounded-md">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button onClick={handleAddToCart} size="lg" className="flex-1">
          <ShoppingBag className="mr-2 h-5 w-5" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
