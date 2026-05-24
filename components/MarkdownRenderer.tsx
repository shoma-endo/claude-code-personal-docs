'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import type { Components } from 'react-markdown';
import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent, ReactNode } from 'react';
import { slugify } from '@/lib/markdown';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { SampleDataDownload } from '@/components/SampleDataDownload';
import { remarkAlerts } from '@/lib/remark-alerts';
import { remarkDirectives } from '@/lib/remark-directives';

const DIRECTIVE_COMPONENTS: Record<string, () => ReactNode> = {
  'sample-data-download': () => <SampleDataDownload />,
};

type AlertType = 'NOTE' | 'TIP' | 'IMPORTANT' | 'WARNING' | 'CAUTION';

const ALERT_CONFIG: Record<AlertType, {
  label: string;
  icon: string;
  borderClass: string;
  bgClass: string;
  labelClass: string;
}> = {
  NOTE:      { label: '補足',   icon: 'ℹ️',  borderClass: 'border-slate-400',   bgClass: 'bg-slate-50',   labelClass: 'text-slate-600' },
  TIP:       { label: 'ヒント', icon: '💡',  borderClass: 'border-emerald-400', bgClass: 'bg-emerald-50', labelClass: 'text-emerald-700' },
  IMPORTANT: { label: '重要',   icon: '❗',  borderClass: 'border-violet-500',  bgClass: 'bg-violet-50',  labelClass: 'text-violet-700' },
  WARNING:   { label: '注意',   icon: '⚠️',  borderClass: 'border-amber-400',   bgClass: 'bg-amber-50',   labelClass: 'text-amber-700' },
  CAUTION:   { label: '警告',   icon: '🚫',  borderClass: 'border-red-400',     bgClass: 'bg-red-50',     labelClass: 'text-red-700' },
};

function CodeBlock({ children, node }: { children?: ReactNode; node?: Record<string, unknown> }) {
  const [copied, setCopied] = useState(false);

  const codeNode = node?.children as Array<{ children?: Array<{ value?: string }> }> | undefined;
  const codeText = codeNode?.[0]?.children?.map((c) => c.value ?? '').join('') ?? '';

  function copy() {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative group mb-4">
      <pre className="bg-slate-800 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-inherit [&>code]:text-sm">
        {children}
      </pre>
      <button
        onClick={copy}
        aria-label="コードをコピー"
        className={`absolute top-2 right-2 inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-slate-700 text-slate-200 transition-opacity hover:bg-slate-500 print:hidden ${
          copied ? 'opacity-100' : 'opacity-60 group-hover:opacity-100 focus-visible:opacity-100'
        }`}
      >
        {copied ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            コピー済み
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            コピー
          </>
        )}
      </button>
    </div>
  );
}

function textContent(node: ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textContent).join('');
  if (node && typeof node === 'object' && 'props' in node) {
    const props = (node as React.ReactElement).props as Record<string, unknown>;
    return textContent(props.children as ReactNode);
  }
  return '';
}

function ChecklistItem({
  children,
  scope,
  initialChecked,
}: {
  children: ReactNode;
  scope: string;
  initialChecked: boolean;
}) {
  const text = textContent(children);
  const slug = slugify(text);
  const storageKey = `cc-training:checklist:${scope}:${slug}`;

  const [checked, setChecked] = useState(initialChecked);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored !== null) setChecked(stored === 'true');
    } catch {
      // localStorage unavailable (private mode, SSR, etc.)
    }
    setHydrated(true);
  }, [storageKey]);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const next = e.target.checked;
    setChecked(next);
    try {
      localStorage.setItem(storageKey, String(next));
    } catch {
      // ignore
    }
  }

  return (
    <li className="list-none">
      <label className="flex cursor-pointer items-start gap-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="mt-1 size-4 cursor-pointer rounded border-slate-300 accent-orange-600"
        />
        <span
          className={`transition-colors ${
            hydrated && checked ? 'text-slate-400 line-through' : ''
          }`}
        >
          {children}
        </span>
      </label>
    </li>
  );
}

function createHeading(
  Tag: 'h1' | 'h2' | 'h3' | 'h4',
  className: string,
) {
  return function Heading({ children }: { children?: ReactNode }) {
    const text = textContent(children);
    const id = slugify(text);
    return (
      <Tag id={id} className={`${className} scroll-mt-20 group`}>
        <a href={`#${id}`} className="no-underline text-inherit hover:text-inherit">
          {children}
          <span className="ml-2 text-slate-400 opacity-0 transition-opacity group-hover:opacity-100 text-base font-normal select-none" aria-hidden="true">#</span>
        </a>
      </Tag>
    );
  };
}

function makeComponents(scope: string): Components {
  return {
  h1: createHeading('h1', 'text-3xl font-bold mb-6 text-slate-900'),
  h2: createHeading(
    'h2',
    'text-2xl font-semibold mb-4 mt-10 pb-2 border-b border-slate-200 text-slate-800',
  ),
  h3: createHeading('h3', 'text-xl font-medium mb-3 mt-6 text-slate-700'),
  h4: createHeading('h4', 'text-lg font-medium mb-2 mt-5 text-slate-700'),
  p: ({ children, node }) => {
    const classNames = node?.properties?.className;
    const classList = Array.isArray(classNames) ? classNames.map(String) : [];
    const directiveClass = classList.find((c) => c.startsWith('directive-'));
    if (directiveClass) {
      const name = directiveClass.slice('directive-'.length);
      const Component = DIRECTIVE_COMPONENTS[name];
      if (Component) return <Component />;
    }
    return <p className="mb-4 text-slate-600 leading-relaxed">{children}</p>;
  },
  ul: ({ children }) => (
    <ul className="list-disc list-inside mb-4 space-y-1.5 text-slate-600">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside mb-4 space-y-1.5 text-slate-600">
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => {
    // Detect GFM task list items by inspecting the hast tree.
    // remark-gfm emits <li> containing <input type="checkbox"> as the first child;
    // react-markdown doesn't expose `checked` on the <li> props directly.
    const hastChildren = (props.node as { children?: Array<{ tagName?: string; properties?: { type?: string; checked?: boolean } }> } | undefined)?.children;
    const firstChild = hastChildren?.[0];
    const isTaskList =
      firstChild?.tagName === 'input' && firstChild?.properties?.type === 'checkbox';

    if (isTaskList) {
      const initialChecked = !!firstChild?.properties?.checked;
      return (
        <ChecklistItem scope={scope} initialChecked={initialChecked}>
          {children}
        </ChecklistItem>
      );
    }
    return <li>{children}</li>;
  },
  input: ({ type, ...props }) => {
    // Task list checkboxes are rendered interactively by ChecklistItem; suppress the raw <input>.
    if (type === 'checkbox') return null;
    return <input type={type} {...props} />;
  },
  pre: ({ children, node }) => {
    const code = node?.children?.[0];
    const isMermaid =
      code?.type === 'element' &&
      code?.tagName === 'code' &&
      Array.isArray(code?.properties?.className) &&
      (code.properties.className as string[]).includes('language-mermaid');
    if (isMermaid) return <>{children}</>;
    return <CodeBlock node={node as unknown as Record<string, unknown>}>{children}</CodeBlock>;
  },
  code: ({ children, className }) => {
    if (className?.includes('language-mermaid')) {
      return <MermaidDiagram code={String(children).trimEnd()} />;
    }
    if (className?.includes('language-')) {
      return <code className={className}>{children}</code>;
    }
    return (
      <code className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    );
  },
  table: ({ children }) => (
    <div className="overflow-x-auto mb-4 w-full">
      <table className="min-w-full border-collapse border border-slate-300 rounded-lg whitespace-nowrap">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-slate-100">{children}</thead>,
  tbody: ({ children }) => (
    <tbody className="divide-y divide-slate-200">{children}</tbody>
  ),
  tr: ({ children }) => <tr className="hover:bg-slate-50">{children}</tr>,
  th: ({ children }) => (
    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 border border-slate-300">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-sm text-slate-600 border border-slate-300">
      {children}
    </td>
  ),
  a: ({ href, children }) => {
    const isExternal = href?.startsWith('http');
    return (
      <a
        href={href}
        className="text-orange-700 hover:text-orange-800 underline inline-flex items-center gap-0.5"
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {children}
        {isExternal && (
          <svg xmlns="http://www.w3.org/2000/svg" className="inline size-3 shrink-0 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        )}
      </a>
    );
  },
  blockquote: ({ children, node }) => {
    const classNames = node?.properties?.className;
    const classList = Array.isArray(classNames) ? classNames.map(String) : [];
    const alertClass = classList.find(c => c.startsWith('alert-'));
    const alertType = alertClass?.replace('alert-', '').toUpperCase() as AlertType | undefined;
    const cfg = alertType ? ALERT_CONFIG[alertType] : undefined;

    if (cfg) {
      return (
        <div className={`border-l-4 ${cfg.borderClass} ${cfg.bgClass} rounded-r-lg my-5`}>
          <div className={`flex items-center gap-1.5 px-4 pt-3 pb-1 font-semibold text-sm ${cfg.labelClass}`}>
            <span aria-hidden="true">{cfg.icon}</span>
            <span>{cfg.label}</span>
          </div>
          <div className="px-4 pb-3 [&>p]:mb-2 [&>p:last-child]:mb-0">
            {children}
          </div>
        </div>
      );
    }

    return (
      <blockquote className="border-l-4 border-slate-300 bg-slate-50 pl-4 py-2 text-slate-600 my-4 rounded-r">
        {children}
      </blockquote>
    );
  },
  hr: () => <hr className="my-8 border-slate-200" />,
  strong: ({ children }) => (
    <strong className="font-semibold text-slate-800">{children}</strong>
  ),
  img: ({ src, alt }) => (
    <img
      src={src}
      alt={alt ?? ''}
      loading="lazy"
      className="max-w-full rounded-lg my-4 shadow"
    />
  ),
  };
}

export function MarkdownRenderer({
  content,
  checklistScope = 'default',
}: {
  content: string;
  checklistScope?: string;
}) {
  const components = useMemo(() => makeComponents(checklistScope), [checklistScope]);
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm, remarkAlerts, remarkDirectives]} rehypePlugins={[rehypeHighlight]} components={components}>
      {content}
    </ReactMarkdown>
  );
}
