# Claude Code Personal Docs

Claude Code のドキュメント・ハンズオン研修資料を提供する Next.js 15 製の Web サイト（リポジトリ名: `claude-code-personal-docs`）です。

## 技術スタック

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **react-markdown** + **remark-gfm** — Markdown レンダリング
- **rehype-highlight** + **highlight.js** — コードブロックのシンタックスハイライト
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

**データフロー**: 研修コンテンツは `docs/training/` 配下の Markdown で管理。サーバーコンポーネント `app/page.tsx` がリクエスト時に `fs/promises` でファイルを読み込み、`lib/markdown.ts` の `splitTrainingSections` で `intro` / `prep` / `session1` / `session2` / `session3` の 5 セクションに分割、各セクションごとに `extractToc` で目次を抽出してクライアントコンポーネント `TrainingPage` に渡す。分割に失敗した場合は単一ページとしてそのまま描画する。

**UI**: `TrainingPage` は「概要 & 事前準備」「Session 1」「Session 2」「Session 3」のタブ式で、現在のタブは `?tab=` クエリパラメータと同期する。`xl` 以上では右側に sticky な目次サイドバー、`xl` 未満では右下に浮かぶフローティングボタンからドロワー目次を開く。

## ディレクトリ構成

```
app/
  page.tsx              # 研修ページ（Markdown を SSR で読み込み、TrainingPage に委譲）
  layout.tsx            # グローバルレイアウト・フォント設定
  globals.css           # Tailwind v4 のエントリ
  icon.svg              # ファビコン
components/
  TrainingPage.tsx      # タブ式のクライアントコンポーネント
  MarkdownRenderer.tsx  # Markdown → HTML クライアントコンポーネント
  TocSidebar.tsx        # 目次サイドバー（IntersectionObserver）
  MermaidDiagram.tsx    # Mermaid 図のレンダラー
docs/
  training/             # トレーニング用 Markdown コンテンツ
lib/
  markdown.ts           # slugify / extractToc / splitTrainingSections
  remark-alerts.ts      # GitHub 風アラート構文を blockquote のクラスへ変換する remark プラグイン
```

### 主要ファイルの注意点

- **`lib/markdown.ts`** — `slugify`（Unicode・日本語対応）、`extractToc`、`splitTrainingSections`。`MarkdownRenderer` と `TocSidebar` の両方が `slugify` を呼ぶため、見出し ID は必ず同期させること。`splitTrainingSections` は `## 事前準備` と `## Session 1 — / 2 — / 3 —` の見出し文字列に依存している。
- **`lib/remark-alerts.ts`** — `> [!NOTE]` / `> [!TIP]` / `> [!IMPORTANT]` / `> [!WARNING]` / `> [!CAUTION]` の GitHub 風アラート構文を検出し、対応する blockquote に `alert-*` クラスを付与する remark プラグイン。実際の見た目は `MarkdownRenderer` の `blockquote` カスタマイズで定義する。
- **`components/MarkdownRenderer.tsx`** — `react-markdown` + `remark-gfm` + `remarkAlerts` + `rehype-highlight` を組み合わせるクライアントコンポーネント。Tailwind prose スタイルはすべてインライン定義（`@tailwindcss/typography` は不使用）。コードブロックにはコピー用ボタンが表示される。`language-mermaid` コードブロックは `MermaidDiagram` に委譲する。
- **`components/MermaidDiagram.tsx`** — Mermaid 図のレンダラー。テーマは **`neutral`**（ライト系）固定。ダーク系テーマは使用しないこと。
- **`components/TocSidebar.tsx`** — `IntersectionObserver` でアクティブな見出しをハイライト。`xl` ブレークポイント以上で sticky 表示。
- **`components/TrainingPage.tsx`** — タブ切り替えとモバイル用ドロワー目次を担うクライアントコンポーネント。`## 事前準備` セクションは概要タブ内で左 blue ボーダー＋ slate 背景のコールアウトに包んで表示する。タブを切り替えると `TocSidebar` は `key` 変更により再マウントされ、スクロール位置とアクティブ見出しがリセットされる。

## コンテンツの追加

研修 Markdown を更新する場合は `docs/training/claude-code-corporate/claude-code-corporate-training.md` を編集する。`splitTrainingSections` が依存しているため、以下の見出しを変更しないこと:

- `## 事前準備`
- `## Session 1 — …` / `## Session 2 — …` / `## Session 3 — …`（前後に `---` 区切りが必要）

新しいドキュメントページを追加するには:

1. `app/` 配下に新しいルートを作成
2. サーバーコンポーネントで Markdown ファイルを読み込み（`fs/promises`）
3. `MarkdownRenderer` + `TocSidebar` を組み合わせて、`app/page.tsx` のパターンに従い描画

## Git リモート（personal / enterprise）

このリポジトリは GitHub 上の 2 リポジトリと連携する。

| リモート名 | 用途 | URL |
|-----------|------|-----|
| `origin` | 本番（personal） | https://github.com/shoma-endo/claude-code-personal-docs |
| `enterprise` | ミラー（enterprise） | https://github.com/shoma-endo/claude-code-enterprise-docs |

`main` の上流は `origin/main`（personal）。日常の `git pull` / `git push` は personal 向け。

```bash
# personal のみ（デフォルト）
git push origin

# enterprise のみ
git push enterprise

# 両方まとめて（エイリアス）
git push-all

# 両方から取得
git fetch-all
```
