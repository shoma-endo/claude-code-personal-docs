'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';
import type { ReactNode } from 'react';
import { slugify } from '@/lib/markdown';
import { MermaidDiagram } from '@/components/MermaidDiagram';

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

function createHeading(
  Tag: 'h1' | 'h2' | 'h3' | 'h4',
  className: string,
) {
  return function Heading({ children }: { children?: ReactNode }) {
    const text = textContent(children);
    const id = slugify(text);
    return (
      <Tag id={id} className={`${className} scroll-mt-20`}>
        <a href={`#${id}`} className="no-underline text-inherit hover:text-inherit">
          {children}
        </a>
      </Tag>
    );
  };
}

const components: Components = {
  h1: createHeading('h1', 'text-3xl font-bold mb-6 text-gray-900'),
  h2: createHeading(
    'h2',
    'text-2xl font-semibold mb-4 mt-10 pb-2 border-b border-slate-200 text-gray-800',
  ),
  h3: createHeading('h3', 'text-xl font-medium mb-3 mt-6 text-gray-700'),
  h4: createHeading('h4', 'text-lg font-medium mb-2 mt-5 text-gray-700'),
  p: ({ children }) => (
    <p className="mb-4 text-gray-600 leading-relaxed">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside mb-4 space-y-1.5 text-gray-600">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside mb-4 space-y-1.5 text-gray-600">
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => {
    const node = props.node;
    const checked = node?.properties?.className
      ? undefined
      : (props as Record<string, unknown>).checked;
    if (typeof checked === 'boolean') {
      return (
        <li className="list-none flex items-start gap-2">
          <input
            type="checkbox"
            checked={checked}
            readOnly
            className="mt-1 size-4 rounded border-gray-300"
          />
          <span>{children}</span>
        </li>
      );
    }
    return <li>{children}</li>;
  },
  input: ({ type, checked, ...props }) => {
    if (type === 'checkbox') {
      return (
        <input
          type="checkbox"
          checked={checked}
          readOnly
          className="size-4 rounded border-gray-300 mr-2"
          {...props}
        />
      );
    }
    return <input type={type} {...props} />;
  },
  pre: ({ children }) => (
    <pre className="bg-slate-800 text-slate-100 p-4 rounded-lg mb-4 overflow-x-auto text-sm font-mono leading-relaxed [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-inherit [&>code]:text-sm">
      {children}
    </pre>
  ),
  code: ({ children, className }) => {
    if (className === 'language-mermaid') {
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
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-blue-600 hover:text-blue-800 underline"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-amber-400 bg-amber-50 pl-4 py-2 text-gray-600 my-4 rounded-r">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-8 border-slate-200" />,
  strong: ({ children }) => (
    <strong className="font-semibold text-slate-800">{children}</strong>
  ),
  img: ({ src, alt }) => (
    <img
      src={src}
      alt={alt ?? ''}
      className="max-w-full rounded-lg my-4 shadow"
    />
  ),
};

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  );
}
