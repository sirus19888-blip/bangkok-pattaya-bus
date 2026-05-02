import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[#eadcc7] bg-[#f7f0e3]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-6 text-sm font-semibold text-[#4f5d6c] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>Bangkok Pattaya Bus Guide</p>
        <nav aria-label="Footer links" className="flex flex-wrap gap-4">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#13233a] underline-offset-4 hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
