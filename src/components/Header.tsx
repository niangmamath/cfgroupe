"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { entities } from "@/lib/entities";
import Logo from "@/components/Logo";

const navLinks = [
  ...entities.map((e) => ({ href: `/poles/${e.slug}`, label: e.name })),
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-hairline-dark bg-black/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 lg:px-8">
        <Link href="/" onClick={() => setOpen(false)} className="flex items-center">
          <Logo variant="light" className="h-11 w-auto" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`link-underline text-sm font-medium tracking-wide ${
                  active ? "text-paper" : "text-paper/60 hover:text-paper"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          aria-label="Ouvrir le menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`h-px w-6 bg-paper transition-transform ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-paper transition-transform ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-hairline-dark px-6 py-4 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2.5 text-sm font-medium text-paper/70 hover:bg-white/5 hover:text-paper"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
