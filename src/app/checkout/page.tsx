"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Lock } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";
import { getProduct } from "@/lib/printify-client";
import { Skeleton } from "@/components/ui/skeleton";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  address: z.string().min(5, "Please enter a valid address."),
  city: z.string().min(2, "Please enter a valid city."),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code."),
  country: z.string().min(2, "Please enter a valid country."),
  cardName: z.string().min(2, "Name on card is required."),
  cardNumber: z.string().refine(val => /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/.test(val.replace(/\s/g, '')), "Invalid card number."),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\s*\/?\s*([0-9]{4}|[0-9]{2})$/, "Invalid expiry date (MM/YY)."),
  cvc: z.string().regex(/^[0-9]{3,4}$/, "Invalid CVC."),
});

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();
  const [cartProducts, setCartProducts] = useState<Map<string, Product>>(new Map());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCartProductDetails() {
      if (items.length === 0) {
        setCartProducts(new Map());
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const newCartProducts = new Map<string, Product>();
      for (const item of items) {
        try {
          const product = await getProduct(item.productId);
          if (product) {
            newCartProducts.set(item.productId, product);
          }
        } catch (error) {
          console.error(`Failed to fetch product ${item.productId}`, error);
        }
      }
      setCartProducts(newCartProducts);
      setIsLoading(false);
    }
    fetchCartProductDetails();
  }, [items]);


  const subtotal = items.reduce((acc, item) => {
    const product = cartProducts.get(item.productId);
    return acc + (product?.price || 0) * item.quantity;
  }, 0);
  const tax = subtotal * 0.08;
  const shipping = 5.00;
  const total = subtotal + tax + shipping;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", address: "", city: "", zip: "", country: "USA", cardName: "", cardNumber: "", expiry: "", cvc: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Order submitted:", values);
    toast({
      title: "Order Placed!",
      description: "Thank you for your purchase. Your order is being processed.",
    });
    clearCart();
    router.push("/");
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 md:px-6 text-center">
        <h1 className="text-2xl font-bold font-headline">Your cart is empty</h1>
        <Button asChild className="mt-4"><Link href="/#products">Continue Shopping</Link></Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <h1 className="text-3xl font-bold font-headline mb-8 text-center">Checkout</h1>
      <div className="grid lg:grid-cols-[1fr_400px] gap-12">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader><CardTitle>Shipping Address</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <FormField control={form.control} name="name" render={({ field }) => ( <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={form.control} name="address" render={({ field }) => ( <FormItem><FormLabel>Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField control={form.control} name="city" render={({ field }) => ( <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                  <FormField control={form.control} name="zip" render={({ field }) => ( <FormItem><FormLabel>ZIP Code</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                  <FormField control={form.control} name="country" render={({ field }) => ( <FormItem><FormLabel>Country</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Payment Information</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground flex items-center gap-2"><Lock className="w-4 h-4"/>All transactions are secure and encrypted.</p>
                <FormField control={form.control} name="cardName" render={({ field }) => ( <FormItem><FormLabel>Name on Card</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={form.control} name="cardNumber" render={({ field }) => ( <FormItem><FormLabel>Card Number</FormLabel><FormControl><div className="relative"><CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" /><Input {...field} className="pl-10" /></div></FormControl><FormMessage /></FormItem> )} />
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="expiry" render={({ field }) => ( <FormItem><FormLabel>Expiry (MM/YY)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                  <FormField control={form.control} name="cvc" render={({ field }) => ( <FormItem><FormLabel>CVC</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                </div>
              </CardContent>
            </Card>

            <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Place Order'}
            </Button>
          </form>
        </Form>
        
        <div>
          <Card>
            <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {isLoading && items.map(item => <OrderItemSkeleton key={item.productId} />)}
              {!isLoading && items.map(item => {
                const product = cartProducts.get(item.productId);
                if (!product) return null;
                return (
                  <div key={item.productId} className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 rounded-md overflow-hidden border bg-muted">
                        <Image
                          src={product.images[0].src}
                          alt={product.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium">${(product.price * item.quantity).toFixed(2)}</p>
                  </div>
                )
              })}
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Taxes</span><span>${tax.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function OrderItemSkeleton() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Skeleton className="h-16 w-16 rounded-md" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
      <Skeleton className="h-5 w-12" />
    </div>
  )
}
