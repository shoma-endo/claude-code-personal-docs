import { readFile } from 'fs/promises';
import { join } from 'path';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { extractToc } from '@/lib/markdown';
import { TocSidebar } from '@/components/TocSidebar';

export const metadata = {
  title: 'Claude Code Enterprise Docs',
  description: 'Claude Code 法人向けハンズオン研修資料',
};

function splitCorporateTrainingPrep(markdown: string): {
  before: string;
  prep: string;
  after: string;
} | null {
  const start = markdown.indexOf('## 事前準備');
  const endMarker = '\n---\n\n## Session 1 — Claude Code の正体と基本操作';
  const end = markdown.indexOf(endMarker, start);
  if (start === -1 || end === -1) return null;
  return {
    before: markdown.slice(0, start),
    prep: markdown.slice(start, end),
    after: markdown.slice(end),
  };
}

export default async function HomePage() {
  const filePath = join(
    process.cwd(),
    'docs/training/claude-code-corporate/claude-code-corporate-training.md',
  );
  const content = await readFile(filePath, 'utf-8');
  const toc = extractToc(content);
  const prepParts = splitCorporateTrainingPrep(content);

  return (
    <div className="mx-auto w-full max-w-[1560px] px-4 py-8 md:px-8 xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(0,1024px)_18rem] xl:gap-10 2xl:grid-cols-[minmax(0,1fr)_minmax(0,1120px)_20rem]">
      <div className="hidden xl:block" aria-hidden="true" />

      <article className="mx-auto min-w-0 max-w-5xl xl:mx-0 xl:max-w-none">
        {prepParts ? (
          <>
            <MarkdownRenderer content={prepParts.before} />
            <div
              className="mb-6 rounded-r-lg border border-amber-200/90 border-l-4 border-l-amber-400 bg-amber-50 px-5 py-6 shadow-sm ring-1 ring-amber-100/80 md:px-8 md:py-8 [&>h2:first-of-type]:mt-2"
              aria-label="事前準備"
            >
              <MarkdownRenderer content={prepParts.prep} />
            </div>
            <MarkdownRenderer content={prepParts.after} />
          </>
        ) : (
          <MarkdownRenderer content={content} />
        )}
      </article>

      <aside className="hidden xl:block min-w-0">
        <TocSidebar entries={toc} />
      </aside>
    </div>
  );
}
