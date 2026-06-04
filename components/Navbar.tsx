import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight"
        >
          JA Möllers Plåt AB
        </Link>

        <div className="flex gap-6">
          <Link
            href="/"
            className="hover:text-blue-600 transition-colors"
          >
            Hem
          </Link>

          <Link
            href="/gallery"
            className="hover:text-blue-600 transition-colors"
          >
            Galleri
          </Link>

          <Link
            href="/contact"
            className="hover:text-blue-600 transition-colors"
          >
            Kontakt
          </Link>
        </div>
      </div>
    </nav>
  );
}