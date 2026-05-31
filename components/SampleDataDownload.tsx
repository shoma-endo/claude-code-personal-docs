export function SampleDataDownload() {
  return (
    <div
      className="mb-6 rounded-lg border border-orange-300 bg-white px-5 py-4 shadow-sm md:px-6"
      aria-label="講義サンプルのダウンロード"
    >
      <p className="mb-1 text-sm font-semibold text-orange-800">講義サンプル（ZIP）</p>
      <p className="mb-4 text-sm leading-relaxed text-slate-700">
        演習用フォルダ一式です。解凍すると <code className="rounded bg-orange-100 px-1.5 py-0.5 text-xs">講義サンプル</code> フォルダができます。その中をエディターで開き、ターミナルでも同じ場所で{' '}
        <code className="rounded bg-orange-100 px-1.5 py-0.5 text-xs">claude</code> を起動してから <strong>§6</strong> 以降に進んでください（ルートに{' '}
        <code className="rounded bg-orange-100 px-1.5 py-0.5 text-xs">CLAUDE.md</code>・<code className="rounded bg-orange-100 px-1.5 py-0.5 text-xs">自己紹介.md</code>・
        <code className="rounded bg-orange-100 px-1.5 py-0.5 text-xs">議事メモ.txt</code> が並んでいれば正しい階層です）。
      </p>
      <a
        href="/api/sample-data"
        download="講義サンプル.zip"
        className="inline-flex items-center gap-2 rounded-md bg-orange-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-4 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
          />
        </svg>
        講義サンプル.zip をダウンロード
      </a>
    </div>
  );
}
