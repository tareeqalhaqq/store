"use client";

import Link from "next/link";
import { ShoppingBag, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { CartSheet } from "@/components/cart-sheet";
import { GeometricStarLogo } from "./geometric-star-logo";

export function Header() {
  const { cartCount } = useCart();

  return (
    <header className="bg-background/80 sticky top-0 z-40 w-full backdrop-blur-xl border-b border-border/40">
      <div className="container mx-auto flex min-h-[64px] items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <GeometricStarLogo className="h-7 w-7 transition-transform duration-300 group-hover:rotate-[15deg]" />
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight font-headline leading-none">
              Tareeq Al Haqq
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-medium leading-none mt-0.5">
              Store
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/#products" },
            { label: "Account", href: "/account" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-muted-foreground rounded-full transition-colors hover:text-foreground hover:bg-secondary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CartSheet>
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full h-10 w-10 hover:bg-secondary"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-accent text-accent-foreground text-[10px] font-bold">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">Open cart</span>
            </Button>
          </CartSheet>
          <Link href="/login">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-10 w-10 hover:bg-secondary"
            >
              <User className="h-[18px] w-[18px]" />
              <span className="sr-only">User account</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
