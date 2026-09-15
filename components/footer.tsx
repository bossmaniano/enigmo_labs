import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';
import { CONTACT_INFO, NAV_ITEMS } from '@/lib/data';

export const Footer = () => (
  <footer className="bg-charcoal border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Image
              src="/enigmolabs.jpeg"
              alt="ENIGMO LABS logo"
              className="h-9 w-9 rounded-lg object-cover ring-1 ring-egyptian-blue/30"
              width={36}
              height={36}
            />
            <span className="text-xl font-bold tracking-wider font-mono text-white">
              ENIGMO LABS
            </span>
          </div>
          <p className="text-sm text-gray-400">
            Engineering Intelligence from Nairobi.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
            Navigation
          </h4>
          <ul className="space-y-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-sm text-gray-400 hover:text-egyptian-blue transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
            Services
          </h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Web Engineering & Custom Software</li>
            <li>AI Agents & Automation</li>
            <li>Intelligent Memory Systems</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
            Contact
          </h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 text-egyptian-blue" />
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                {CONTACT_INFO.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 text-egyptian-blue" />
              <a
                href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`}
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                {CONTACT_INFO.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-egyptian-blue" />
              <span className="text-sm text-gray-300">
                {CONTACT_INFO.location}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 border-t border-white/5 pt-6 text-center">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Enigmo Labs. Engineering Intelligence.
          All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);
