export type TocEntry = { level: number; text: string; slug: string };

export type TrainingSections = {
  intro: string;
  prep: string;
  session1: string;
  session2: string;
};

export function splitTrainingSections(markdown: string): TrainingSections | null {
  const prepStart = markdown.indexOf('## 事前準備');
  const sep = '\n---\n\n';
  const s1Pos = markdown.indexOf(`${sep}## Session 1 —`);
  const s2Pos = markdown.indexOf(`${sep}## Session 2 —`);

  if (prepStart === -1 || s1Pos === -1 || s2Pos === -1) return null;

  return {
    intro: markdown.slice(0, prepStart),
    prep: markdown.slice(prepStart, s1Pos),
    session1: markdown.slice(s1Pos + sep.length, s2Pos),
    session2: markdown.slice(s2Pos + sep.length),
  };
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s]+/g, '-')
    .replace(/[^\p{L}\p{N}\-]/gu, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function extractToc(markdown: string): TocEntry[] {
  const entries: TocEntry[] = [];
  const lines = markdown.split('\n');
  let inCodeBlock = false;

  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = line.match(/^(#{1,4})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      entries.push({ level, text, slug: slugify(text) });
    }
  }

  return entries;
}
