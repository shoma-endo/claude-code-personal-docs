'use client';

import { useEffect, useState } from 'react';
import type { TocEntry } from '@/lib/markdown';

export function TocSidebar({ entries }: { entries: TocEntry[] }) {
  const [activeSlug, setActiveSlug] = useState<string>('');
  const minLevel = Math.min(...entries.map((e) => e.level));

  useEffect(() => {
    const headingEls = entries
      .map((e) => document.getElementById(e.slug))
      .filter(Boolean) as HTMLElement[];

    if (headingEls.length === 0) return;

    const observer = new IntersectionObserver(
      (observerEntries) => {
        const visible = observerEntries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveSlug(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 },
    );

    for (const el of headingEls) observer.observe(el);
    return () => observer.disconnect();
  }, [entries]);

  return (
    <nav className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto">
      <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
        目次
      </h2>
      <ul className="space-y-0.5 text-[13px] border-l border-slate-200">
        {entries.map((entry, i) => {
          const isActive = activeSlug === entry.slug;
          return (
            <li
              key={i}
              style={{ paddingLeft: `${(entry.level - minLevel) * 12 + 12}px` }}
            >
              <a
                href={`#${entry.slug}`}
                className={`block py-1 leading-snug transition-colors ${
                  isActive
                    ? 'text-slate-900 font-semibold border-l-2 border-slate-600 -ml-px pl-[11px]'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                {entry.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
