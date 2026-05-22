'use client';

import { useEffect, useRef, useState } from 'react';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { TocSidebar } from '@/components/TocSidebar';
import type { TocEntry, TrainingSections } from '@/lib/markdown';

type TabId = 'overview' | 'session1' | 'session2' | 'session3';

const TABS: { id: TabId; label: string }[] = [
  { id: 'overview', label: '概要 & 事前準備' },
  { id: 'session1', label: 'Session 1' },
  { id: 'session2', label: 'Session 2' },
  { id: 'session3', label: 'Session 3' },
];

interface Props extends TrainingSections {
  tocByTab: Record<TabId, TocEntry[]>;
}

export function TrainingPage({ intro, prep, session1, session2, session3, tocByTab }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [tocOpen, setTocOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const tocButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab') as TabId;
    if (TABS.find((t) => t.id === tab)) setActiveTab(tab);
  }, []);

  // ドロワーが開いたらフォーカスを移動、閉じたら元のボタンに戻す
  useEffect(() => {
    if (tocOpen) {
      drawerRef.current?.focus();
    } else {
      tocButtonRef.current?.focus();
    }
  }, [tocOpen]);

  // Escape キーでドロワーを閉じる
  useEffect(() => {
    if (!tocOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setTocOpen(false);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [tocOpen]);

  function switchTab(tab: TabId) {
    setActiveTab(tab);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tab);
    window.history.replaceState(null, '', url.toString());
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  const sessionContent: Record<'session1' | 'session2' | 'session3', string> = {
    session1,
    session2,
    session3,
  };

  const minLevel = Math.min(...tocByTab[activeTab].map((e) => e.level));

  return (
    <div className="mx-auto w-full max-w-[1560px] px-4 py-8 md:px-8 xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(0,1024px)_18rem] xl:gap-10 2xl:grid-cols-[minmax(0,1fr)_minmax(0,1120px)_20rem]">
      <div className="hidden xl:block" aria-hidden="true" />

      <article className="mx-auto min-w-0 max-w-5xl xl:mx-0 xl:max-w-none">
        <nav
          className="sticky top-0 z-10 mb-8 flex gap-0 border-b border-orange-200 bg-orange-50"
          role="tablist"
          aria-label="1Day 研修セッション"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                role="tab"
                aria-selected={isActive}
                aria-controls="tab-panel"
                onClick={() => switchTab(tab.id)}
                className={`-mb-px border-b-2 px-5 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'border-orange-500 text-orange-700'
                    : 'border-transparent text-slate-600 hover:border-orange-300 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div
          id="tab-panel"
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          tabIndex={0}
          className="outline-none"
        >
          {activeTab === 'overview' ? (
            <>
              <MarkdownRenderer content={intro} />
              <div
                className="mb-6 rounded-r-lg border border-orange-200 border-l-4 border-l-orange-500 bg-orange-50 px-5 py-6 shadow-sm md:px-8 md:py-8 [&>h2:first-of-type]:mt-2"
                aria-label="事前準備"
              >
                <MarkdownRenderer content={prep} />
              </div>
            </>
          ) : (
            <MarkdownRenderer content={sessionContent[activeTab as 'session1' | 'session2' | 'session3']} />
          )}
        </div>
      </article>

      <aside className="hidden xl:block min-w-0">
        {/* key forces TocSidebar to remount on tab change, resetting scroll position and active heading */}
        <TocSidebar key={activeTab} entries={tocByTab[activeTab]} />
      </aside>

      {/* Mobile ToC floating button */}
      <button
        ref={tocButtonRef}
        onClick={() => setTocOpen(true)}
        aria-label="目次を開く"
        aria-expanded={tocOpen}
        aria-controls="mobile-toc-drawer"
        className="fixed bottom-6 right-6 z-20 flex items-center gap-2 rounded-full bg-orange-700 px-4 py-3 text-sm font-medium text-white shadow-lg xl:hidden"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h10" />
        </svg>
        目次
      </button>

      {/* Mobile ToC drawer */}
      {tocOpen && (
        <div className="fixed inset-0 z-30 xl:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setTocOpen(false)} />
          <div
            ref={drawerRef}
            id="mobile-toc-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="目次"
            tabIndex={-1}
            className="absolute bottom-0 right-0 top-0 w-72 max-w-[calc(100vw-2rem)] overflow-y-auto bg-orange-50 p-6 shadow-xl outline-none"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">目次</h2>
              <button
                onClick={() => setTocOpen(false)}
                aria-label="目次を閉じる"
                className="text-slate-400 hover:text-slate-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ul className="space-y-0.5 border-l border-slate-200 text-[13px]">
              {tocByTab[activeTab].map((entry, i) => (
                <li key={i} style={{ paddingLeft: `${(entry.level - minLevel) * 12 + 12}px` }}>
                  <a
                    href={`#${entry.slug}`}
                    onClick={() => setTocOpen(false)}
                    className="block py-1 leading-snug text-slate-600 transition-colors hover:text-slate-800"
                  >
                    {entry.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
