"use client";

import Link from "next/link";
import { ShoppingBag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { CartSheet } from "@/components/cart-sheet";
import { GeometricStarLogo } from "./geometric-star-logo";

export function Header() {
  const { cartCount } = useCart();

  return (
    <header className="bg-background/80 sticky top-0 z-40 w-full border-b backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <GeometricStarLogo className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold tracking-tight text-primary font-headline">
            Tareeqal Haqq
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="/" className="transition-colors hover:text-primary">Home</Link>
          <Link href="/#products" className="transition-colors hover:text-primary">Products</Link>
          <Link href="/account" className="transition-colors hover:text-primary">Account</Link>
        </nav>
        <div className="flex items-center gap-4">
          <CartSheet>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">Open cart</span>
            </Button>
          </CartSheet>
          <Link href="/login">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">User account</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
