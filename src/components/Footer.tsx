import Link from 'next/link';

const footerLinks = [
  { name: 'Accueil', href: '/' },
  { name: 'À propos', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
  { name: 'Mentions légales', href: '/legal' },
];

export default function Footer() {
  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col items-center space-y-4 text-center">
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          gederooney
        </div>
        <nav className="flex flex-wrap justify-center gap-4">
          {footerLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} gederooney. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
