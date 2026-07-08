"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    href: "/admin",
    label: "Projekt",
  },
  {
    href: "/admin/messages",
    label: "Meddelanden",
  },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="mb-8 border-b border-border">
      <div className="flex gap-2">
        {links.map((link) => {
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-t-lg px-4 py-2 font-medium transition-colors ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted hover:bg-background hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
