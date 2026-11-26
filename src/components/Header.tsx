import { ViewMode } from '../types/brief';

interface HeaderProps {
  activeView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export function Header({ activeView, onViewChange }: HeaderProps) {
  return (
    <>
      {/* Subtle Top Preview Notice (non-sticky to preserve mobile viewport space) */}
      <div className="bg-[#111827] text-[#FAF9F6] border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-center text-center">
          <p className="text-[11px] sm:text-xs tracking-wide text-[#E5E7EB]">
            Personalised Website Enhancement Preview for{' '}
            <span className="text-[#E0BE93] font-medium">Zach Lin</span>
            <span aria-hidden="true" className="mx-1.5 text-white/35">
              ·
            </span>
            <span>Prepared by Zavyo AI Studio</span>
          </p>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-30 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4">
          {/* Brand Wordmark */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              onViewChange('client');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-serif text-lg sm:text-xl font-semibold tracking-[0.14em] text-[#111827] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B48A5A]"
          >
            ZACH LIN
          </a>

          {/* Desktop View Switcher */}
          <div
            role="tablist"
            aria-label="Preview perspective"
            className="hidden md:inline-flex items-center p-1 rounded-lg bg-[#EFECE6] border border-[#E5E7EB] shrink-0"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeView === 'client'}
              onClick={() => onViewChange('client')}
              className={`px-3.5 py-2 text-xs font-medium rounded-md transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B48A5A] ${
                activeView === 'client'
                  ? 'bg-[#111827] text-white shadow-xs'
                  : 'text-[#4B5563] hover:text-[#111827]'
              }`}
            >
              Client Experience (Live Demo)
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeView === 'agent'}
              onClick={() => onViewChange('agent')}
              className={`px-3.5 py-2 text-xs font-medium rounded-md transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B48A5A] ${
                activeView === 'agent'
                  ? 'bg-[#111827] text-white shadow-xs'
                  : 'text-[#4B5563] hover:text-[#111827]'
              }`}
            >
              Agent Lead View (Behind the Scenes)
            </button>
          </div>

          {/* Mobile Quick Switch Hint (single clean action in header) */}
          <button
            type="button"
            onClick={() => onViewChange(activeView === 'client' ? 'agent' : 'client')}
            className="md:hidden text-xs font-medium text-[#8C683D] hover:text-[#111827] transition-colors whitespace-nowrap shrink-0 min-h-[44px] flex items-center px-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B48A5A]"
          >
            {activeView === 'client' ? 'View Agent Queue →' : '← Client Demo'}
          </button>
        </div>
      </header>

      {/* Mobile Full-Width Segmented Toggle (non-sticky so mobile sticky height stays < 10%) */}
      <div className="md:hidden bg-white border-b border-[#E5E7EB] px-4 py-2.5">
        <div
          role="tablist"
          aria-label="Preview perspective"
          className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-[#F3F1EC] border border-[#E5E7EB]"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeView === 'client'}
            onClick={() => onViewChange('client')}
            className={`min-h-[44px] px-2 py-1.5 rounded-lg text-center transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B48A5A] ${
              activeView === 'client'
                ? 'bg-[#111827] text-white shadow-xs'
                : 'text-[#4B5563] hover:text-[#111827]'
            }`}
          >
            <span className="block text-xs font-semibold leading-tight whitespace-nowrap">
              Client Experience
            </span>
            <span
              className={`block text-[10px] mt-0.5 whitespace-nowrap ${
                activeView === 'client' ? 'text-[#E0BE93]' : 'text-[#6B7280]'
              }`}
            >
              Live Demo
            </span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeView === 'agent'}
            onClick={() => onViewChange('agent')}
            className={`min-h-[44px] px-2 py-1.5 rounded-lg text-center transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B48A5A] ${
              activeView === 'agent'
                ? 'bg-[#111827] text-white shadow-xs'
                : 'text-[#4B5563] hover:text-[#111827]'
            }`}
          >
            <span className="block text-xs font-semibold leading-tight whitespace-nowrap">
              Agent Lead View
            </span>
            <span
              className={`block text-[10px] mt-0.5 whitespace-nowrap ${
                activeView === 'agent' ? 'text-[#E0BE93]' : 'text-[#6B7280]'
              }`}
            >
              Behind the Scenes
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
