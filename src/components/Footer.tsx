import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { ZACH_CONTACT } from '../types/brief';

export function Footer() {
  return (
    <footer className="mt-14 sm:mt-20 border-t border-[#E5E7EB] bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-[#F3F4F6]">
          {/* Brand Summary */}
          <div className="md:col-span-5">
            <p className="font-serif text-lg font-semibold tracking-[0.14em] text-[#111827]">
              ZACH LIN
            </p>
            <p className="mt-2 text-sm text-[#4B5563] leading-relaxed max-w-sm">
              Independent Property Agent, Singapore. This interactive enhancement preview
              demonstrates a guided 4-step intake and instant WhatsApp brief workflow tailored for{' '}
              <span className="font-medium text-[#111827]">zachlin.co</span>.
            </p>
          </div>

          {/* Verified Zach Lin Links */}
          <div className="md:col-span-4">
            <p className="text-xs font-semibold text-[#111827]">Verified Links</p>
            <ul className="mt-3 space-y-2.5 text-sm text-[#4B5563]">
              <li>
                <a
                  href={ZACH_CONTACT.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#111827] transition-colors"
                >
                  <span>zachlin.co</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#9CA3AF]" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={ZACH_CONTACT.aboutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#111827] transition-colors"
                >
                  <span>About Zach Lin</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#9CA3AF]" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={ZACH_CONTACT.contactUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#111827] transition-colors"
                >
                  <span>Current Contact Page</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#9CA3AF]" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="md:col-span-3">
            <p className="text-xs font-semibold text-[#111827]">Direct Contact</p>
            <ul className="mt-3 space-y-2.5 text-sm text-[#4B5563]">
              <li>
                <a
                  href={`mailto:${ZACH_CONTACT.email}`}
                  className="inline-flex items-center gap-2 hover:text-[#111827] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#8C683D] shrink-0" aria-hidden="true" />
                  <span>{ZACH_CONTACT.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:+${ZACH_CONTACT.whatsappNumber}`}
                  className="inline-flex items-center gap-2 hover:text-[#111827] transition-colors tabular-nums"
                >
                  <Phone className="w-4 h-4 text-[#8C683D] shrink-0" aria-hidden="true" />
                  <span>{ZACH_CONTACT.phoneDisplay}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Attribution */}
        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#6B7280]">
          <p>
            Interactive concept crafted exclusively for Zach Lin by{' '}
            <span className="font-medium text-[#111827]">Zavyo AI Studio</span>.
          </p>
          <p>Preview prototype · No fabricated listings or unverified claims.</p>
        </div>
      </div>
    </footer>
  );
}
