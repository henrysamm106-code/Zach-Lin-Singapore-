import { useState } from 'react';
import { Check, CheckCheck, Copy, MessageCircle, RotateCcw } from 'lucide-react';
import {
  PropertyBriefState,
  ZACH_CONTACT,
  buildWhatsAppUrl,
  formatWhatsAppBrief,
} from '../types/brief';

interface WhatsAppPreviewProps {
  brief: PropertyBriefState;
  onReset: () => void;
  onSwitchToAgentView: () => void;
}

export function WhatsAppPreview({
  brief,
  onReset,
  onSwitchToAgentView,
}: WhatsAppPreviewProps) {
  const [copied, setCopied] = useState(false);

  const formattedMessage = formatWhatsAppBrief(brief);
  const whatsappHref = buildWhatsAppUrl(formattedMessage);

  const completedCoreFields = [
    Boolean(brief.goal),
    Boolean(brief.propertyType),
    Boolean(brief.budget),
    Boolean(brief.timeline),
  ].filter(Boolean).length;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(formattedMessage);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = formattedMessage;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div id="whatsapp-preview" className="lg:sticky lg:top-20">
      <div className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden">
        {/* Preview Section Title Bar */}
        <div className="px-5 py-3.5 border-b border-[#E5E7EB] bg-[#FAF9F6] flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-[#111827]">Live WhatsApp Message Preview</p>
            <p className="text-[11px] text-[#6B7280] mt-0.5 tabular-nums">
              Updates automatically · {completedCoreFields} of 4 core selections filled
            </p>
          </div>
          <button
            type="button"
            onClick={onReset}
            className="min-h-[36px] px-2.5 py-1 rounded-lg text-xs font-medium text-[#6B7280] hover:text-[#111827] hover:bg-[#EFECE6] transition-colors inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            title="Clear all brief fields"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Reset</span>
          </button>
        </div>

        {/* Realistic WhatsApp Thread Header */}
        <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/15 border border-white/25 flex items-center justify-center font-serif text-sm font-semibold tracking-wider shrink-0">
            ZL
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-tight truncate">{ZACH_CONTACT.name}</p>
            <p className="text-[11px] text-white/80 tabular-nums truncate">
              {ZACH_CONTACT.phoneDisplay} · Direct WhatsApp
            </p>
          </div>
        </div>

        {/* Realistic Chat Canvas */}
        <div className="bg-[#EFEAE2] p-4 sm:p-5">
          <div className="flex justify-end">
            <div className="max-w-full w-full rounded-xl rounded-tr-xs bg-[#D9FDD3] border border-[#C3E9BC] px-3.5 py-3 text-[#111827]">
              <pre className="font-sans text-[13px] leading-relaxed whitespace-pre-wrap break-words text-[#111827]">
                {formattedMessage}
              </pre>
              <div className="mt-2 flex items-center justify-end gap-1 text-[10px] text-[#4B5563] tabular-nums">
                <span>Ready to send</span>
                <CheckCheck className="w-3.5 h-3.5 text-[#0284C7]" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="p-4 sm:p-5 space-y-2.5 bg-white border-t border-[#E5E7EB]">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-h-[52px] px-5 py-3 rounded-xl bg-[#075E54] hover:bg-[#064C44] active:scale-[0.99] text-white text-sm font-semibold transition-all duration-150 flex items-center justify-center gap-2.5 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B48A5A]"
          >
            <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Send Brief to Zach on WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={handleCopy}
            className="w-full min-h-[48px] px-5 py-2.5 rounded-xl bg-white hover:bg-[#FAF9F6] border border-[#D1D5DB] text-[#111827] text-sm font-medium transition-colors duration-150 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B48A5A]"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#075E54]" aria-hidden="true" />
                <span className="text-[#075E54] font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#6B7280]" aria-hidden="true" />
                <span>Copy Formatted Brief</span>
              </>
            )}
          </button>

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={onSwitchToAgentView}
              className="text-xs font-medium text-[#8C683D] hover:text-[#111827] underline decoration-[#D1D5DB] underline-offset-4 hover:decoration-[#B48A5A] transition-colors py-1 cursor-pointer"
            >
              See how this brief lands in Agent Lead View →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
