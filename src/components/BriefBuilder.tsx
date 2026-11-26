import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  Compass,
  Home,
  KeyRound,
  Link2,
  TrendingUp,
} from 'lucide-react';
import {
  AREA_SUGGESTIONS,
  BUDGET_OPTIONS,
  GOAL_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  PropertyBriefState,
  PropertyGoal,
  REPLY_WINDOW_OPTIONS,
  TIMELINE_OPTIONS,
} from '../types/brief';

interface BriefBuilderProps {
  brief: PropertyBriefState;
  currentStep: number;
  onStepChange: (step: number) => void;
  onUpdateBrief: <K extends keyof PropertyBriefState>(
    field: K,
    value: PropertyBriefState[K]
  ) => void;
  onJumpToPreview?: () => void;
}

const STEP_META = [
  { number: 1, shortLabel: 'Goal', title: 'What would you like to achieve?' },
  { number: 2, shortLabel: 'Property', title: 'Property type & preferred location' },
  { number: 3, shortLabel: 'Budget', title: 'Indicative budget & move timeline' },
  { number: 4, shortLabel: 'Details', title: 'Listing reference & callback window' },
] as const;

function getGoalIcon(goal: PropertyGoal) {
  switch (goal) {
    case 'Buy a Property':
      return Home;
    case 'Sell My Property':
      return Building2;
    case 'Rent / Lease':
      return KeyRound;
    case 'Asset Progression & Advisory':
      return TrendingUp;
  }
}

function isLikelyValidUrl(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return true;
  return /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i.test(trimmed);
}

export function BriefBuilder({
  brief,
  currentStep,
  onStepChange,
  onUpdateBrief,
  onJumpToPreview,
}: BriefBuilderProps) {
  const activeStepMeta = STEP_META[currentStep - 1];
  const progressPercent = (currentStep / 4) * 100;
  const linkValid = isLikelyValidUrl(brief.referenceLink);

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 sm:p-7">
      {/* Progress Header */}
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold tracking-wide text-[#8C683D] tabular-nums">
          Step {currentStep} of 4
        </span>
        <span className="text-xs text-[#6B7280] tabular-nums">
          {Math.round(progressPercent)}% complete
        </span>
      </div>

      {/* Progress Bar */}
      <div
        className="mt-2.5 h-1.5 w-full rounded-full bg-[#F3F1EC] overflow-hidden"
        role="progressbar"
        aria-valuenow={currentStep}
        aria-valuemin={1}
        aria-valuemax={4}
        aria-label={`Step ${currentStep} of 4`}
      >
        <div
          className="h-full bg-[#B48A5A] rounded-full transition-all duration-200 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Clickable Step Tabs */}
      <div className="mt-4 grid grid-cols-4 gap-1.5" role="tablist" aria-label="Brief steps">
        {STEP_META.map((step) => {
          const isActive = step.number === currentStep;
          const isCompleted = step.number < currentStep;
          return (
            <button
              key={step.number}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onStepChange(step.number)}
              className={`min-h-[40px] px-2 py-1.5 rounded-lg text-xs font-medium transition-colors duration-150 flex items-center justify-center gap-1 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B48A5A] ${
                isActive
                  ? 'bg-[#111827] text-white'
                  : isCompleted
                    ? 'bg-[#FAF7F2] text-[#8C683D] border border-[#E7DAC9] hover:border-[#B48A5A]'
                    : 'bg-[#FAF9F6] text-[#6B7280] border border-[#E5E7EB] hover:text-[#111827]'
              }`}
            >
              <span className="tabular-nums">{step.number}.</span>
              <span className="truncate">{step.shortLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Step Title */}
      <div className="mt-6 pb-4 border-b border-[#F3F4F6]">
        <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#111827]">
          {activeStepMeta.title}
        </h3>
      </div>

      {/* Animated Step Body */}
      <div className="mt-5 min-h-[290px] sm:min-h-[310px]">
        <AnimatePresence mode="wait" initial={false}>
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3"
            >
              {GOAL_OPTIONS.map((option) => {
                const Icon = getGoalIcon(option.value);
                const selected = brief.goal === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => onUpdateBrief('goal', option.value)}
                    aria-pressed={selected}
                    className={`w-full min-h-[68px] text-left p-4 rounded-xl border transition-all duration-150 flex items-center justify-between gap-3.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B48A5A] ${
                      selected
                        ? 'border-[#111827] bg-[#FAF7F2]'
                        : 'border-[#E5E7EB] bg-white hover:border-[#B48A5A]/70 hover:bg-[#FAF9F6]'
                    }`}
                  >
                    <div className="flex items-start gap-3.5 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          selected
                            ? 'bg-[#111827] text-[#E0BE93]'
                            : 'bg-[#F3F1EC] text-[#4B5563]'
                        }`}
                      >
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm sm:text-[15px] font-semibold text-[#111827]">
                          {option.value}
                        </p>
                        <p className="text-xs sm:text-[13px] text-[#6B7280] mt-0.5 leading-snug">
                          {option.subtitle}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                        selected
                          ? 'bg-[#111827] border-[#111827] text-white'
                          : 'border-[#D1D5DB] bg-white'
                      }`}
                    >
                      {selected && <Check className="w-3 h-3" aria-hidden="true" />}
                    </div>
                  </button>
                );
              })}
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              {/* Property Type */}
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-2.5">
                  Property Type
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {PROPERTY_TYPE_OPTIONS.map((type) => {
                    const selected = brief.propertyType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => onUpdateBrief('propertyType', type)}
                        aria-pressed={selected}
                        className={`min-h-[48px] px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-150 flex items-center justify-between gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B48A5A] ${
                          selected
                            ? 'bg-[#111827] text-white border-[#111827]'
                            : 'bg-white text-[#111827] border-[#E5E7EB] hover:border-[#B48A5A]'
                        }`}
                      >
                        <span className="truncate">{type}</span>
                        {selected && (
                          <Check className="w-4 h-4 text-[#E0BE93] shrink-0" aria-hidden="true" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Preferred District / MRT / Estate */}
              <div>
                <label
                  htmlFor="preferred-area-input"
                  className="block text-xs font-semibold text-[#374151] mb-2"
                >
                  Preferred District, MRT, or Estate
                </label>
                <div className="relative">
                  <Compass
                    className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    id="preferred-area-input"
                    type="text"
                    value={brief.preferredArea}
                    onChange={(e) => onUpdateBrief('preferredArea', e.target.value)}
                    placeholder="e.g. District 10, Orchard, or East Coast"
                    className="w-full min-h-[48px] pl-10 pr-4 py-3 rounded-xl border border-[#D1D5DB] bg-[#FAF9F6] text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:bg-white focus:border-[#B48A5A] focus:outline-none focus:ring-2 focus:ring-[#B48A5A]/20 transition-all"
                  />
                </div>

                {/* Quick Area Taps */}
                <div className="mt-3">
                  <p className="text-[11px] text-[#6B7280] mb-2">Quick-fill popular areas:</p>
                  <div className="flex flex-wrap gap-2">
                    {AREA_SUGGESTIONS.map((area) => {
                      const active = brief.preferredArea === area;
                      return (
                        <button
                          key={area}
                          type="button"
                          onClick={() => onUpdateBrief('preferredArea', area)}
                          className={`min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                            active
                              ? 'bg-[#FAF7F2] border-[#B48A5A] text-[#111827]'
                              : 'bg-white border-[#E5E7EB] text-[#4B5563] hover:border-[#B48A5A] hover:text-[#111827]'
                          }`}
                        >
                          {area}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              {/* Budget Range */}
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-2.5">
                  Indicative Budget (SGD)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {BUDGET_OPTIONS.map((budget) => {
                    const selected = brief.budget === budget;
                    return (
                      <button
                        key={budget}
                        type="button"
                        onClick={() => onUpdateBrief('budget', budget)}
                        aria-pressed={selected}
                        className={`min-h-[48px] px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium tabular-nums transition-all duration-150 flex items-center justify-center text-center cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B48A5A] ${
                          selected
                            ? 'bg-[#111827] text-white border-[#111827]'
                            : 'bg-white text-[#111827] border-[#E5E7EB] hover:border-[#B48A5A]'
                        }`}
                      >
                        {budget}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Move Timeline */}
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-2.5">
                  Target Move or Transaction Timeline
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {TIMELINE_OPTIONS.map((timeline) => {
                    const selected = brief.timeline === timeline;
                    return (
                      <button
                        key={timeline}
                        type="button"
                        onClick={() => onUpdateBrief('timeline', timeline)}
                        aria-pressed={selected}
                        className={`min-h-[48px] px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-150 flex items-center justify-between gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B48A5A] ${
                          selected
                            ? 'bg-[#FAF7F2] text-[#111827] border-[#111827]'
                            : 'bg-white text-[#374151] border-[#E5E7EB] hover:border-[#B48A5A]'
                        }`}
                      >
                        <span>{timeline}</span>
                        {selected && (
                          <Check className="w-4 h-4 text-[#8C683D] shrink-0" aria-hidden="true" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5"
            >
              {/* Listing Link */}
              <div>
                <label
                  htmlFor="reference-link-input"
                  className="block text-xs font-semibold text-[#374151] mb-1.5"
                >
                  PropertyGuru / 99.co Listing Link{' '}
                  <span className="font-normal text-[#6B7280]">(Optional)</span>
                </label>
                <div className="relative">
                  <Link2
                    className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    id="reference-link-input"
                    type="url"
                    value={brief.referenceLink}
                    onChange={(e) => onUpdateBrief('referenceLink', e.target.value)}
                    placeholder="https://www.propertyguru.com.sg/listing/..."
                    className={`w-full min-h-[48px] pl-10 pr-4 py-3 rounded-xl border bg-[#FAF9F6] text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                      linkValid
                        ? 'border-[#D1D5DB] focus:border-[#B48A5A] focus:ring-[#B48A5A]/20'
                        : 'border-amber-600 focus:border-amber-700 focus:ring-amber-600/20'
                    }`}
                  />
                </div>
                {!linkValid && (
                  <p className="mt-1.5 text-xs text-amber-800">
                    Tip: Paste a full listing URL (e.g. propertyguru.com.sg/listing/...) so Zach
                    can open it in one tap.
                  </p>
                )}
              </div>

              {/* Client Name */}
              <div>
                <label
                  htmlFor="client-name-input"
                  className="block text-xs font-semibold text-[#374151] mb-1.5"
                >
                  Your Name
                </label>
                <input
                  id="client-name-input"
                  type="text"
                  autoComplete="name"
                  value={brief.clientName}
                  onChange={(e) => onUpdateBrief('clientName', e.target.value)}
                  placeholder="e.g. Daniel Tan"
                  className="w-full min-h-[48px] px-4 py-3 rounded-xl border border-[#D1D5DB] bg-[#FAF9F6] text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:bg-white focus:border-[#B48A5A] focus:outline-none focus:ring-2 focus:ring-[#B48A5A]/20 transition-all"
                />
              </div>

              {/* Preferred Reply Window */}
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-2">
                  Preferred Reply Window
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {REPLY_WINDOW_OPTIONS.map((windowOpt) => {
                    const selected = brief.replyWindow === windowOpt.value;
                    return (
                      <button
                        key={windowOpt.value}
                        type="button"
                        onClick={() => onUpdateBrief('replyWindow', windowOpt.value)}
                        aria-pressed={selected}
                        className={`min-h-[56px] px-2.5 py-2 rounded-xl border text-center transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B48A5A] ${
                          selected
                            ? 'bg-[#111827] text-white border-[#111827]'
                            : 'bg-white text-[#111827] border-[#E5E7EB] hover:border-[#B48A5A]'
                        }`}
                      >
                        <span className="block text-xs sm:text-sm font-semibold">
                          {windowOpt.value}
                        </span>
                        <span
                          className={`block text-[11px] mt-0.5 tabular-nums ${
                            selected ? 'text-[#E0BE93]' : 'text-[#6B7280]'
                          }`}
                        >
                          {windowOpt.hours}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Step Footer Navigation */}
      <div className="mt-6 pt-5 border-t border-[#F3F4F6] flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onStepChange(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          className={`min-h-[48px] px-4 py-2.5 rounded-xl border text-sm font-medium inline-flex items-center gap-2 transition-colors whitespace-nowrap ${
            currentStep === 1
              ? 'border-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed bg-[#FAF9F6]'
              : 'border-[#E5E7EB] text-[#111827] bg-white hover:bg-[#FAF9F6] hover:border-[#D1D5DB] cursor-pointer'
          }`}
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back</span>
        </button>

        {currentStep < 4 ? (
          <button
            type="button"
            onClick={() => onStepChange(currentStep + 1)}
            className="min-h-[48px] px-6 py-2.5 rounded-xl bg-[#111827] text-white text-sm font-medium hover:bg-[#1F2937] active:scale-[0.99] transition-all inline-flex items-center gap-2 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B48A5A]"
          >
            <span>Next Step</span>
            <ArrowRight className="w-4 h-4 text-[#E0BE93]" aria-hidden="true" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onJumpToPreview}
            className="lg:hidden min-h-[48px] px-5 py-2.5 rounded-xl bg-[#B48A5A] text-white text-sm font-medium hover:bg-[#9C7547] active:scale-[0.99] transition-all inline-flex items-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <span>Review WhatsApp Brief</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}
