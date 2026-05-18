import Link from "next/link";
import { Logo } from "@/components/brand/logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/50 bg-white/40 py-12 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-5 text-center sm:px-8 md:flex-row md:justify-between md:text-left">
        <Logo size="sm" className="items-center md:items-start" />
        <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <Link href="/#products" className="transition-colors hover:text-foreground">
            Products
          </Link>
          <Link href="/about" className="transition-colors hover:text-foreground">
            About
          </Link>
        </nav>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Jolie. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
