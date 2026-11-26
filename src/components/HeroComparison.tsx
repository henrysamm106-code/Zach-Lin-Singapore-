import { useState } from 'react';
import { ArrowDown, ArrowUpRight, Building2 } from 'lucide-react';
import { ZACH_CONTACT } from '../types/brief';

interface HeroComparisonProps {
  onStartBuilder: () => void;
}

export function HeroComparison({ onStartBuilder }: HeroComparisonProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <section id="top" className="pt-8 pb-10 sm:pt-12 sm:pb-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-xs font-medium tracking-wider text-[#8C683D] mb-3">
              Independent Property Agent, Singapore
              <span aria-hidden="true" className="mx-2 text-[#D1D5DB]">
                ·
              </span>
              <span className="text-[#4B5563]">Enhancement Concept for zachlin.co</span>
            </p>

            <h1 className="font-serif text-[2rem] leading-[1.15] sm:text-4xl lg:text-[2.85rem] lg:leading-[1.12] font-semibold text-[#111827] tracking-tight">
              Turn Manual WhatsApp Enquiries into Structured Buyer &amp; Seller Briefs.
            </h1>

            <p className="mt-4 sm:mt-5 text-[15px] sm:text-base leading-relaxed text-[#4B5563] max-w-2xl">
              A guided 30-second intake upgrade for{' '}
              <span className="font-medium text-[#111827]">zachlin.co</span> that captures budget,
              timeline, and property links before clients message you.
            </p>

            <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row sm:items-center gap-3.5 sm:gap-5">
              <button
                type="button"
                onClick={onStartBuilder}
                className="min-h-[48px] px-6 py-3 rounded-xl bg-[#111827] text-white text-sm font-medium hover:bg-[#1F2937] active:scale-[0.99] transition-all duration-150 inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B48A5A]"
              >
                <span>Try the 4-Step Brief Builder</span>
                <ArrowDown className="w-4 h-4 text-[#E0BE93]" aria-hidden="true" />
              </button>

              <a
                href={ZACH_CONTACT.website}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] px-1 inline-flex items-center justify-center sm:justify-start gap-1.5 text-sm font-medium text-[#4B5563] hover:text-[#111827] underline decoration-[#D1D5DB] underline-offset-4 hover:decoration-[#B48A5A] transition-colors whitespace-nowrap"
              >
                <span>Compare with current zachlin.co</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Architectural Singapore Backdrop */}
          <div className="lg:col-span-5">
            <div className="relative h-56 sm:h-64 lg:h-full min-h-[240px] rounded-2xl overflow-hidden border border-[#E5E7EB] bg-[#1F2937]">
              {!imageError ? (
                <img
                  src={ZACH_CONTACT.heroImage}
                  alt="Contemporary Singapore residential terrace overlooking lush greenery and city skyline at golden hour"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#111827] via-[#1F2937] to-[#3B2F23] flex flex-col items-center justify-center p-6 text-center">
                  <Building2 className="w-8 h-8 text-[#B48A5A] mb-2" aria-hidden="true" />
                  <p className="font-serif text-lg text-[#FAF9F6]">Singapore Real Estate Advisory</p>
                  <p className="text-xs text-[#D1D5DB] mt-1">zachlin.co · Guided Client Intake</p>
                </div>
              )}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#111827]/75 via-[#111827]/15 to-transparent"
              />
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-[#E0BE93]">
                    Designed for zachlin.co/contact
                  </p>
                  <p className="text-sm text-white/95 font-medium mt-0.5">
                    Seamless fit alongside your existing site &amp; WhatsApp
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compact 2-Column Before / After Workflow Comparison */}
        <div className="mt-8 lg:mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
          {/* Current Flow */}
          <div className="rounded-2xl bg-white border border-[#E5E7EB] p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#F3F4F6]">
                <h2 className="font-serif text-lg font-semibold text-[#111827]">
                  01. Current Flow on zachlin.co
                </h2>
                <span className="text-xs font-medium text-[#6B7280] whitespace-nowrap">
                  Manual Typing
                </span>
              </div>
              <p className="mt-3.5 text-sm leading-relaxed text-[#4B5563]">
                Visitors read messaging instructions and manually type details—often forgetting
                budget, timeline, or listing links.
              </p>
            </div>
            <p className="mt-4 pt-3 border-t border-[#F3F4F6] text-xs text-[#6B7280]">
              Result: Extra follow-up messages needed before you can advise or shortlist units.
            </p>
          </div>

          {/* Upgraded Flow */}
          <div className="rounded-2xl bg-[#111827] text-[#FAF9F6] border border-[#1F2937] p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/10">
                <h2 className="font-serif text-lg font-semibold text-white">
                  02. Upgraded Flow (Guided Brief)
                </h2>
                <span className="text-xs font-medium text-[#E0BE93] whitespace-nowrap">
                  30-Second Intake
                </span>
              </div>
              <p className="mt-3.5 text-sm leading-relaxed text-[#D1D5DB]">
                Visitors tap 4 quick steps and launch WhatsApp with a complete, prefilled property
                brief ready for your reply.
              </p>
            </div>
            <p className="mt-4 pt-3 border-t border-white/10 text-xs text-[#E0BE93]">
              Result: Goal, budget, timeline, and reference links arrive cleanly in your first
              WhatsApp thread.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
