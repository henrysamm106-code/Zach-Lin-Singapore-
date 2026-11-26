import { useState } from 'react';
import { AgentLeadView } from './components/AgentLeadView';
import { BriefBuilder } from './components/BriefBuilder';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroComparison } from './components/HeroComparison';
import { WhatsAppPreview } from './components/WhatsAppPreview';
import {
  DemoLead,
  EMPTY_BRIEF,
  INITIAL_BRIEF,
  INITIAL_DEMO_LEADS,
  LeadStatus,
  PropertyBriefState,
  ViewMode,
} from './types/brief';

export default function App() {
  const [activeView, setActiveView] = useState<ViewMode>('client');
  const [brief, setBrief] = useState<PropertyBriefState>(INITIAL_BRIEF);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [demoLeads, setDemoLeads] = useState<DemoLead[]>(INITIAL_DEMO_LEADS);

  const handleViewChange = (nextView: ViewMode) => {
    setActiveView(nextView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateBrief = <K extends keyof PropertyBriefState>(
    field: K,
    value: PropertyBriefState[K]
  ) => {
    setBrief((prev) => ({ ...prev, [field]: value }));
  };

  const handleResetBrief = () => {
    setBrief(EMPTY_BRIEF);
    setCurrentStep(1);
  };

  const handleUpdateLeadStatus = (id: string, status: LeadStatus) => {
    setDemoLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, status } : lead))
    );
  };

  const scrollToElement = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#111827]">
      <Header activeView={activeView} onViewChange={handleViewChange} />

      <main className="flex-1">
        {activeView === 'client' ? (
          <>
            <HeroComparison onStartBuilder={() => scrollToElement('brief-builder')} />

            {/* Interactive 4-Step Guided Property Brief + Live WhatsApp Preview */}
            <section
              id="brief-builder"
              aria-labelledby="brief-builder-heading"
              className="scroll-mt-20 pt-2 pb-6 sm:pt-4 sm:pb-10"
            >
              <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium text-[#8C683D]">
                      Interactive Intake Upgrade
                      <span aria-hidden="true" className="mx-2 text-[#D1D5DB]">
                        ·
                      </span>
                      <span className="text-[#4B5563]">Live Client Experience</span>
                    </p>
                    <h2
                      id="brief-builder-heading"
                      className="mt-1.5 font-serif text-2xl sm:text-3xl font-semibold text-[#111827]"
                    >
                      Guided Property Brief Builder
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#4B5563] max-w-md">
                    Tap options below to watch the prefilled WhatsApp message update in real time.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                  <div className="lg:col-span-7">
                    <BriefBuilder
                      brief={brief}
                      currentStep={currentStep}
                      onStepChange={setCurrentStep}
                      onUpdateBrief={handleUpdateBrief}
                      onJumpToPreview={() => scrollToElement('whatsapp-preview')}
                    />
                  </div>
                  <div className="lg:col-span-5">
                    <WhatsAppPreview
                      brief={brief}
                      onReset={handleResetBrief}
                      onSwitchToAgentView={() => handleViewChange('agent')}
                    />
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <AgentLeadView
            demoLeads={demoLeads}
            liveBrief={brief}
            onUpdateLeadStatus={handleUpdateLeadStatus}
            onBackToClientDemo={() => handleViewChange('client')}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
