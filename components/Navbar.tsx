"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    pathname === path
      ? "text-blue-600 font-bold"
      : "text-gray-700 hover:text-blue-500";

  return (
    <nav className="bg-white shadow mb-8">
      <div className="max-w-6xl mx-auto px-4 py-4 flex gap-6">
        <Link href="/" className={linkClass("/")}>
          Hem
        </Link>

        <Link href="/gallery" className={linkClass("/gallery")}>
          Galleri
        </Link>

        <Link href="/contact" className={linkClass("/contact")}>
          Kontakt
        </Link>
      </div>
    </nav>
  );
}
