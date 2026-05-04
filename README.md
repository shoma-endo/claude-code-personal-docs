# Claude Code ドキュメントサイト

Claude Code の社内ドキュメント・トレーニング資料を提供する Next.js 15 製の Web サイトです。

## 技術スタック

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **react-markdown** + **remark-gfm** — Markdown レンダリング
- フォント: Zen Kaku Gothic New / Shippori Mincho (Google Fonts)

## 開発

```bash
npm install
npm run dev      # 開発サーバー起動 (http://localhost:3000)
npm run build    # プロダクションビルド
npm run start    # プロダクションサーバー起動
```

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

## コンテンツの追加

新しいドキュメントページを追加するには:

1. `app/` 配下に新しいルートを作成
2. サーバーコンポーネントで Markdown ファイルを読み込み（`fs/promises`）
3. `MarkdownRenderer` + `TocSidebar` を使用して描画
4. `app/page.tsx` にリンクを追加
