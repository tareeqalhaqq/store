import Link from 'next/link';
import { GeometricStarLogo } from './geometric-star-logo';

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t mt-auto">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2">
              <GeometricStarLogo className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold tracking-tight text-primary font-headline">
                Tareeqal Haqq
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Spreading knowledge and light through curated products.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Shop</h4>
              <ul className="space-y-1">
                <li><Link href="/#products" className="hover:text-primary">Clothing</Link></li>
                <li><Link href="/#products" className="hover:text-primary">Books & Art</Link></li>
                <li><Link href="/#products" className="hover:text-primary">Accessories</Link></li>
                <li><Link href="/#products" className="hover:text-primary">Home Goods</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">About</h4>
              <ul className="space-y-1">
                <li><Link href="#" className="hover:text-primary">Our Story</Link></li>
                <li><Link href="#" className="hover:text-primary">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-primary">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-primary">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Follow Us</h4>
            <p className="text-sm text-muted-foreground">Stay connected with us on social media.</p>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Tareeqal Haqq Store. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
