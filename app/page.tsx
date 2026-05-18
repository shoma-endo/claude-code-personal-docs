import { readFile } from 'fs/promises';
import { join } from 'path';
import { extractToc, splitTrainingSections } from '@/lib/markdown';
import { TrainingPage } from '@/components/TrainingPage';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { TocSidebar } from '@/components/TocSidebar';


export default async function HomePage() {
  const filePath = join(
    process.cwd(),
    'docs/training/claude-code-corporate/claude-code-corporate-training.md',
  );
  const content = await readFile(filePath, 'utf-8');
  const sections = splitTrainingSections(content);

  if (!sections) {
    const toc = extractToc(content);
    return (
      <div className="mx-auto w-full max-w-[1560px] px-4 py-8 md:px-8 xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(0,1024px)_18rem] xl:gap-10 2xl:grid-cols-[minmax(0,1fr)_minmax(0,1120px)_20rem]">
        <div className="hidden xl:block" aria-hidden="true" />
        <article className="mx-auto min-w-0 max-w-5xl xl:mx-0 xl:max-w-none">
          <MarkdownRenderer content={content} />
        </article>
        <aside className="hidden xl:block min-w-0">
          <TocSidebar entries={toc} />
        </aside>
      </div>
    );
  }

  const tocByTab = {
    overview: [...extractToc(sections.intro), ...extractToc(sections.prep)],
    session1: extractToc(sections.session1),
    session2: extractToc(sections.session2),
    session3: extractToc(sections.session3),
  };

  return <TrainingPage {...sections} tocByTab={tocByTab} />;
}
