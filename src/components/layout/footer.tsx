import Link from 'next/link';
import { GeometricStarLogo } from './geometric-star-logo';

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background mt-auto">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-2">
              <GeometricStarLogo className="h-8 w-8 text-accent" />
              <span className="text-xl font-semibold tracking-tight text-primary font-headline">
                Tareeqal Haqq
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A refined selection of study essentials, thoughtful gifts, and home pieces for the seeker.
            </p>
          </div>
          <div className="text-sm">
            <h4 className="font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link href="/#products" className="hover:text-primary">Study Essentials</Link></li>
              <li><Link href="/#products" className="hover:text-primary">Books & Prints</Link></li>
              <li><Link href="/#products" className="hover:text-primary">Everyday Carry</Link></li>
              <li><Link href="/#products" className="hover:text-primary">Home & Living</Link></li>
            </ul>
          </div>
          <div className="text-sm">
            <h4 className="font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4">About</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-primary">Our Story</Link></li>
              <li><Link href="#" className="hover:text-primary">Contact</Link></li>
              <li><Link href="#" className="hover:text-primary">Privacy</Link></li>
              <li><Link href="#" className="hover:text-primary">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-border/60 pt-6 text-xs text-muted-foreground flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} Tareeqal Haqq Store. All Rights Reserved.</p>
          <p>Designed for the Rahmaniyyah community.</p>
        </div>
      </div>
    </footer>
  );
}
