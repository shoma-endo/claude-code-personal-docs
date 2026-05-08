'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

let initialized = false;

function ensureInit() {
  if (!initialized) {
    mermaid.initialize({ startOnLoad: false, theme: 'neutral' });
    initialized = true;
  }
}

let idCounter = 0;

export function MermaidDiagram({ code }: { code: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    ensureInit();
    const id = `mermaid-${++idCounter}`;
    mermaid
      .render(id, code)
      .then(({ svg }) => {
        if (ref.current) ref.current.innerHTML = svg;
      })
      .catch((e: unknown) => {
        setError(e instanceof Error ? e.message : String(e));
      });
  }, [code]);

  if (error) {
    return (
      <pre className="bg-red-50 text-red-700 p-4 rounded-lg mb-4 text-sm overflow-x-auto">
        {error}
      </pre>
    );
  }

  return <div ref={ref} className="flex justify-center my-6" />;
}
