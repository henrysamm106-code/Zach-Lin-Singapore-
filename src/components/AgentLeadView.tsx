import { useState } from 'react';
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import {
  DemoLead,
  LeadStatus,
  PropertyBriefState,
  PropertyGoal,
  buildAgentReplyUrl,
  formatWhatsAppBrief,
} from '../types/brief';

interface AgentLeadViewProps {
  demoLeads: DemoLead[];
  liveBrief: PropertyBriefState;
  onUpdateLeadStatus: (id: string, status: LeadStatus) => void;
  onBackToClientDemo: () => void;
}

const FILTER_OPTIONS: Array<{ label: string; value: 'All' | PropertyGoal }> = [
  { label: 'All Enquiries', value: 'All' },
  { label: 'Buy', value: 'Buy a Property' },
  { label: 'Sell', value: 'Sell My Property' },
  { label: 'Rent / Lease', value: 'Rent / Lease' },
  { label: 'Advisory', value: 'Asset Progression & Advisory' },
];

const STATUS_OPTIONS: LeadStatus[] = ['New Enquiry', 'Replied', 'Viewing Scheduled'];

export function AgentLeadView({
  demoLeads,
  liveBrief,
  onUpdateLeadStatus,
  onBackToClientDemo,
}: AgentLeadViewProps) {
  const [goalFilter, setGoalFilter] = useState<'All' | PropertyGoal>('All');
  const [expandedLeadId, setExpandedLeadId] = useState<string | null>(null);
  const [liveDraftStatus, setLiveDraftStatus] = useState<LeadStatus>('New Enquiry');

  const hasLiveDraft = Boolean(liveBrief.goal);

  const liveLeadCard: DemoLead | null = hasLiveDraft
    ? {
        id: 'live-draft',
        clientName: liveBrief.clientName.trim()
          ? `${liveBrief.clientName.trim()} (Your Live Demo Test)`
          : 'Your Current Client Demo Brief',
        receivedAt: 'Just now · Synced from Client Experience tab',
        goal: liveBrief.goal as PropertyGoal,
        propertyType: liveBrief.propertyType || 'Condominium',
        preferredArea: liveBrief.preferredArea.trim() || 'Open to recommendations',
        budget: liveBrief.budget || '$2M – $3.5M',
        timeline: liveBrief.timeline || '1 – 3 Months',
        referenceLink: liveBrief.referenceLink.trim() || undefined,
        replyWindow: liveBrief.replyWindow || 'Evening',
        status: liveDraftStatus,
        isLiveDraft: true,
      }
    : null;

  const combinedLeads: DemoLead[] = liveLeadCard
    ? [liveLeadCard, ...demoLeads]
    : demoLeads;

  const filteredLeads =
    goalFilter === 'All'
      ? combinedLeads
      : combinedLeads.filter((lead) => lead.goal === goalFilter);

  const newCount = combinedLeads.filter((l) => l.status === 'New Enquiry').length;
  const scheduledCount = combinedLeads.filter((l) => l.status === 'Viewing Scheduled').length;

  return (
    <section className="py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Context Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 pb-6 border-b border-[#E5E7EB]">
          <div>
            <p className="text-xs font-medium text-[#8C683D]">
              Agent Lead View (Behind the Scenes)
              <span aria-hidden="true" className="mx-2 text-[#D1D5DB]">
                ·
              </span>
              <span className="text-[#4B5563]">Demo Preview Data</span>
            </p>
            <h1 className="mt-2 font-serif text-2xl sm:text-4xl font-semibold text-[#111827] tracking-tight">
              Structured Enquiry Queue Between Viewings.
            </h1>
            <p className="mt-2.5 text-sm sm:text-[15px] text-[#4B5563] max-w-2xl leading-relaxed">
              Instead of sifting through fragmented chats, every guided brief from{' '}
              <span className="font-medium text-[#111827]">zachlin.co</span> arrives with goal,
              property type, budget, timeline, and preferred callback window ready at a glance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <div className="text-xs text-[#4B5563] tabular-nums">
              <span className="font-semibold text-[#111827]">{combinedLeads.length}</span> sample
              briefs
              <span aria-hidden="true" className="mx-2 text-[#D1D5DB]">
                ·
              </span>
              <span className="font-semibold text-[#8C683D]">{newCount}</span> new
              <span aria-hidden="true" className="mx-2 text-[#D1D5DB]">
                ·
              </span>
              <span className="font-semibold text-[#075E54]">{scheduledCount}</span> viewing
              scheduled
            </div>
            <button
              type="button"
              onClick={onBackToClientDemo}
              className="min-h-[44px] px-4 py-2 rounded-xl border border-[#D1D5DB] bg-white hover:bg-[#FAF9F6] text-xs font-medium text-[#111827] inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Edit Client Brief Demo</span>
            </button>
          </div>
        </div>

        {/* Demo Preview Data Disclaimer */}
        <div className="mt-5 px-4 py-3 rounded-xl bg-[#F5F2EC] border border-[#E5DEC9] text-xs text-[#4B5563] leading-relaxed">
          <span className="font-semibold text-[#111827]">Demo Preview Data:</span> The enquiry
          cards below are sample illustrations showing how submissions from your upgraded contact
          flow can be organized. Any edits you make in the{' '}
          <span className="font-medium text-[#111827]">Client Experience</span> tab appear live at
          the top of this queue.
        </div>

        {/* Interactive Goal Filter Bar */}
        <div className="mt-6 flex items-center gap-1.5 overflow-x-auto pb-1">
          {FILTER_OPTIONS.map((filter) => {
            const active = goalFilter === filter.value;
            const count =
              filter.value === 'All'
                ? combinedLeads.length
                : combinedLeads.filter((l) => l.goal === filter.value).length;

            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setGoalFilter(filter.value)}
                className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B48A5A] ${
                  active
                    ? 'bg-[#111827] text-white'
                    : 'bg-white border border-[#E5E7EB] text-[#4B5563] hover:text-[#111827] hover:border-[#B48A5A]'
                }`}
              >
                {filter.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Lead Queue List */}
        {filteredLeads.length === 0 ? (
          <div className="mt-6 rounded-2xl bg-white border border-[#E5E7EB] p-8 text-center">
            <p className="font-serif text-lg text-[#111827]">No sample briefs in this category</p>
            <p className="mt-1 text-sm text-[#6B7280]">
              Select another goal filter or test a new enquiry in the Client Experience tab.
            </p>
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            {filteredLeads.map((lead) => {
              const isExpanded = expandedLeadId === lead.id;
              const replyUrl = buildAgentReplyUrl(lead);
              const fullFormattedText = formatWhatsAppBrief({
                goal: lead.goal,
                propertyType: lead.propertyType,
                preferredArea: lead.preferredArea,
                budget: lead.budget,
                timeline: lead.timeline,
                referenceLink: lead.referenceLink || '',
                clientName: lead.clientName.replace(/\s*\(.*?\)/g, '').trim(),
                replyWindow: lead.replyWindow,
              });

              const handleStatusChange = (nextStatus: LeadStatus) => {
                if (lead.isLiveDraft) {
                  setLiveDraftStatus(nextStatus);
                } else {
                  onUpdateLeadStatus(lead.id, nextStatus);
                }
              };

              return (
                <article
                  key={lead.id}
                  className={`rounded-2xl border p-5 sm:p-6 transition-colors ${
                    lead.isLiveDraft
                      ? 'bg-[#FAF7F2] border-[#B48A5A]'
                      : 'bg-white border-[#E5E7EB]'
                  }`}
                >
                  {/* Card Top Row */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-[#E5E7EB]/80">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#6B7280]">
                        <span className="font-semibold text-[#8C683D]">
                          {lead.isLiveDraft ? 'Live Test Brief' : 'Demo Preview Data'}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{lead.receivedAt}</span>
                      </div>
                      <h2 className="mt-1 font-serif text-lg sm:text-xl font-semibold text-[#111827]">
                        {lead.clientName}
                      </h2>
                      <p className="mt-0.5 text-sm font-medium text-[#374151]">
                        {lead.goal}
                        <span aria-hidden="true" className="mx-2 text-[#D1D5DB]">
                          ·
                        </span>
                        <span>{lead.propertyType}</span>
                      </p>
                    </div>

                    {/* Interactive Triage Status Switcher */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <label htmlFor={`status-${lead.id}`} className="sr-only">
                        Enquiry status for {lead.clientName}
                      </label>
                      <select
                        id={`status-${lead.id}`}
                        value={lead.status}
                        onChange={(e) => handleStatusChange(e.target.value as LeadStatus)}
                        className="min-h-[40px] px-3 py-1.5 rounded-lg border border-[#D1D5DB] bg-white text-xs font-medium text-[#111827] focus:border-[#B48A5A] focus:outline-none focus:ring-2 focus:ring-[#B48A5A]/20 cursor-pointer"
                      >
                        {STATUS_OPTIONS.map((statusOption) => (
                          <option key={statusOption} value={statusOption}>
                            Status: {statusOption}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Structured Details Grid */}
                  <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <dt className="text-[11px] font-medium text-[#6B7280]">Preferred Area</dt>
                      <dd className="mt-1 text-sm font-medium text-[#111827]">
                        {lead.preferredArea}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[11px] font-medium text-[#6B7280]">Indicative Budget</dt>
                      <dd className="mt-1 text-sm font-semibold text-[#111827] tabular-nums">
                        {lead.budget}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[11px] font-medium text-[#6B7280]">Target Timeline</dt>
                      <dd className="mt-1 text-sm font-medium text-[#111827]">{lead.timeline}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] font-medium text-[#6B7280]">
                        Preferred Reply Window
                      </dt>
                      <dd className="mt-1 text-sm font-medium text-[#111827]">
                        {lead.replyWindow}
                      </dd>
                    </div>
                  </dl>

                  {/* Optional Reference Link */}
                  {lead.referenceLink && (
                    <div className="mt-4 pt-3 border-t border-[#F3F4F6] flex flex-wrap items-center gap-2 text-xs text-[#4B5563]">
                      <span className="font-medium text-[#6B7280]">Reference Link:</span>
                      <span className="text-[#111827] break-all inline-flex items-center gap-1">
                        {lead.referenceLink}
                        <ExternalLink className="w-3 h-3 text-[#9CA3AF] shrink-0" aria-hidden="true" />
                      </span>
                    </div>
                  )}

                  {/* Expandable Raw WhatsApp Message Preview */}
                  {isExpanded && (
                    <div className="mt-4 p-4 rounded-xl bg-[#F3F1EC] border border-[#E5E7EB]">
                      <p className="text-[11px] font-semibold text-[#6B7280] mb-2">
                        Incoming WhatsApp Brief Format
                      </p>
                      <pre className="font-sans text-xs sm:text-[13px] text-[#111827] whitespace-pre-wrap break-words leading-relaxed">
                        {fullFormattedText}
                      </pre>
                    </div>
                  )}

                  {/* Card Action Bar */}
                  <div className="mt-5 pt-4 border-t border-[#E5E7EB]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setExpandedLeadId(isExpanded ? null : lead.id)}
                      className="min-h-[44px] px-3 py-2 rounded-lg text-xs font-medium text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F1EC] transition-colors inline-flex items-center justify-center sm:justify-start gap-1.5 whitespace-nowrap cursor-pointer"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="w-4 h-4" aria-hidden="true" />
                          <span>Hide WhatsApp Brief</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" aria-hidden="true" />
                          <span>View Incoming Brief Text</span>
                        </>
                      )}
                    </button>

                    <a
                      href={replyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[48px] px-5 py-2.5 rounded-xl bg-[#075E54] hover:bg-[#064C44] text-white text-sm font-medium transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B48A5A]"
                    >
                      <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>Reply on WhatsApp</span>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
