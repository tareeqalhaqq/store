"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import Image from "next/image";
import Link from "next/link";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";
import { getProduct } from "@/lib/printify-client";
import { Skeleton } from "./ui/skeleton";


export function CartSheet({ children }: { children: React.ReactNode }) {
  const { items, removeItem, updateItemQuantity, cartCount } = useCart();
  const { toast } = useToast();
  const [cartProducts, setCartProducts] = useState<Map<string, Product>>(new Map());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCartProductDetails() {
      if (items.length === 0) {
        setCartProducts(new Map());
        return;
      }
      
      setIsLoading(true);
      const newCartProducts = new Map(cartProducts);
      let needsUpdate = false;

      for (const item of items) {
        if (!newCartProducts.has(item.productId)) {
          try {
            const product = await getProduct(item.productId);
            if (product) {
              newCartProducts.set(item.productId, product);
              needsUpdate = true;
            }
          } catch (error) {
            console.error(`Failed to fetch product ${item.productId}`, error);
          }
        }
      }

      if (needsUpdate) {
        setCartProducts(newCartProducts);
      }
      setIsLoading(false);
    }
    
    fetchCartProductDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);


  const subtotal = items.reduce((acc, item) => {
    const product = cartProducts.get(item.productId);
    return acc + (product?.price || 0) * item.quantity;
  }, 0);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateItemQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
    const product = cartProducts.get(productId);
    toast({
      title: "Item removed",
      description: `${product?.name || `Product ${productId}`} has been removed from your cart.`,
    });
  };
  
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({cartCount})</SheetTitle>
        </SheetHeader>
        {cartCount > 0 ? (
          <>
            <ScrollArea className="flex-grow pr-4 -mr-6">
              <div className="flex flex-col gap-4">
                {items.map((item) => {
                  const product = cartProducts.get(item.productId);
                  if (isLoading && !product) {
                    return <CartItemSkeleton key={item.productId} />;
                  }
                  if (!product) return null;

                  return (
                    <div key={item.productId} className="flex items-center gap-4">
                      <div className="relative h-20 w-20 overflow-hidden rounded-md border bg-muted">
                        <Image
                            src={product.images[0].src}
                            alt={product.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{product.name}</p>
                         <p className="text-sm text-muted-foreground">
                          ${product.price.toFixed(2)}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center border rounded-md">
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}>
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Input type="number" value={item.quantity} onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value) || 1)} className="h-8 w-12 border-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}>
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => handleRemoveItem(item.productId)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
            <SheetFooter className="mt-4">
              <div className="w-full space-y-4">
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground">Shipping and taxes calculated at checkout.</p>
                <SheetTrigger asChild>
                  <Button asChild className="w-full" size="lg">
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>
                </SheetTrigger>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">Your cart is empty</h3>
            <p className="mt-1 text-sm text-muted-foreground">Add some products to get started.</p>
            <SheetTrigger asChild>
              <Button asChild className="mt-6"><Link href="/#products">Continue Shopping</Link></Button>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

function CartItemSkeleton() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="h-20 w-20 rounded-md" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/4" />
        <div className="mt-2 flex items-center justify-between">
          <Skeleton className="h-8 w-[120px]" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
}
