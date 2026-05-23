import { readFile } from 'fs/promises';
import { join } from 'path';
import type { Metadata } from 'next';
import Link from 'next/link';
import { extractToc } from '@/lib/markdown';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { TocSidebar } from '@/components/TocSidebar';

export const metadata: Metadata = {
  title: '講師向け（社内） | Claude Code 個人向け 1Day 講義',
  robots: { index: false, follow: false },
};

export default async function InternalTrainingPage() {
  const filePath = join(
    process.cwd(),
    'docs/training/claude-code-personal/claude-code-personal-training-internal.md',
  );
  const content = await readFile(filePath, 'utf-8');
  const toc = extractToc(content);

  return (
    <motion className="mx-auto w-full max-w-[1560px] px-4 py-8 md:px-8 xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(0,1024px)_18rem] xl:gap-10 2xl:grid-cols-[minmax(0,1fr)_minmax(0,1120px)_20rem]">
      <motion className="hidden xl:block" aria-hidden="true" />
      <article className="mx-auto min-w-0 max-w-5xl xl:mx-0 xl:max-w-none">
        <p className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
          講師・運営向け（社内）の進行メモです。受講者には{' '}
          <Link href="/" className="font-medium underline underline-offset-2">
            受講者向け資料
          </Link>
          を共有してください。
        </p>
        <MarkdownRenderer content={content} />
      </article>
      <aside className="hidden xl:block min-w-0">
        <TocSidebar entries={toc} />
      </aside>
    </motion>
  );
}
