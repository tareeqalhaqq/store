import Link from 'next/link';
import { GeometricStarLogo } from './geometric-star-logo';

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-secondary/30 mt-auto">
      <div className="container mx-auto px-4 py-14 md:px-6">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <GeometricStarLogo className="h-7 w-7" />
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight font-headline leading-none">
                  Tareeq Al Haqq
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-medium leading-none mt-0.5">
                  Store
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Apparel, notebooks, and books crafted with purpose for study, reflection, and everyday life.
            </p>
          </div>
          <div className="text-sm">
            <h4 className="font-semibold text-xs tracking-[0.15em] uppercase text-foreground mb-4">Shop</h4>
            <ul className="space-y-2.5">
              <li><Link href="/#sections" className="text-muted-foreground hover:text-foreground transition-colors">Clothing</Link></li>
              <li><Link href="/#sections" className="text-muted-foreground hover:text-foreground transition-colors">Notebooks</Link></li>
              <li><Link href="/#sections" className="text-muted-foreground hover:text-foreground transition-colors">Books</Link></li>
            </ul>
          </div>
          <div className="text-sm">
            <h4 className="font-semibold text-xs tracking-[0.15em] uppercase text-foreground mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Our Story</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border/40 pt-6 text-xs text-muted-foreground flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} Tareeq Al Haqq. All rights reserved.</p>
          <p className="font-medium">Purpose in every piece.</p>
        </div>
      </div>
    </footer>
  );
}
