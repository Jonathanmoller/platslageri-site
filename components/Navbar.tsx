import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-border bg-card text-card-foreground">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-card-foreground"
        >
          JA Möllers Plåt AB
        </Link>

        <div className="flex gap-6">
          <Link
            href="/"
            className="font-medium text-card-foreground transition-colors hover:text-primary"
          >
            Hem
          </Link>

          <Link
            href="/gallery"
            className="font-medium text-card-foreground transition-colors hover:text-primary"
          >
            Galleri
          </Link>

          <Link
            href="/contact"
            className="font-medium text-card-foreground transition-colors hover:text-primary"
          >
            Kontakt
          </Link>
        </div>
      </div>
    </nav>
  );
}
