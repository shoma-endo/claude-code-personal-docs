# Claude Code Enterprise Docs

Claude Code の法人向けドキュメント・ハンズオン研修資料を提供する Next.js 15 製の Web サイトです。

## 技術スタック

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **react-markdown** + **remark-gfm** — Markdown レンダリング
- **Mermaid.js** — Markdown 内の図解レンダリング（テーマ: `neutral`）
- フォント: Zen Kaku Gothic New (`--font-sans`) / Shippori Mincho (`--font-display`) — `next/font/google` で `app/layout.tsx` に設定

## 開発

```bash
npm install
npm run dev      # 開発サーバー起動 (http://localhost:3000)
npm run build    # プロダクションビルド
npm run start    # プロダクションサーバー起動
```

lint・テストスクリプトは未設定。

## アーキテクチャ

**データフロー**: トレーニングコンテンツは `docs/training/` に Markdown で管理。サーバーコンポーネント `app/training/page.tsx` がリクエスト時に `fs/promises` でファイルを読み込み、`lib/markdown.ts` で TOC を抽出してクライアントコンポーネントに渡す。

## ディレクトリ構成

```
app/
  page.tsx              # トップページ
  training/page.tsx     # トレーニングページ（Markdown を SSR で配信）
  layout.tsx            # グローバルレイアウト・フォント設定
components/
  MarkdownRenderer.tsx  # Markdown → HTML クライアントコンポーネント
  TocSidebar.tsx        # 目次サイドバー（IntersectionObserver）
docs/
  training/             # トレーニング用 Markdown コンテンツ
lib/
  markdown.ts           # slugify / extractToc ユーティリティ
```

### 主要ファイルの注意点

- **`lib/markdown.ts`** — `slugify`（Unicode・日本語対応）と `extractToc`。`MarkdownRenderer` と `TocSidebar` の両方が `slugify` を呼ぶため、見出し ID は必ず同期させること。
- **`components/MarkdownRenderer.tsx`** — `react-markdown` + `remark-gfm` を使うクライアントコンポーネント。Tailwind prose スタイルはすべてインライン定義（`@tailwindcss/typography` は不使用）。` ```mermaid ` コードブロックは `MermaidDiagram` コンポーネントに渡してレンダリングする。
- **`components/MermaidDiagram.tsx`** — Mermaid 図のレンダラー。テーマは **`neutral`**（ライト系）固定。ダーク系テーマは使用しないこと。
- **`components/TocSidebar.tsx`** — `IntersectionObserver` でアクティブセクションをハイライト。`xl` ブレークポイント以上で sticky 表示。
- **`app/training/page.tsx`** — `## 事前準備` セクションを Markdown から切り出し、amber のコールアウトボックスで包んで表示する。

## コンテンツの追加

新しいドキュメントページを追加するには:

1. `app/` 配下に新しいルートを作成
2. サーバーコンポーネントで Markdown ファイルを読み込み（`fs/promises`）
3. `MarkdownRenderer` + `TocSidebar` を使用してトレーニングページのパターンに従い描画
4. `app/page.tsx` にリンクを追加
