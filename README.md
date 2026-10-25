# Claude Code Personal Docs

Claude Code **個人向け 1Day 研修**の資料を配信する Next.js 15 製の Web サイトです。

- **受講者向け**: `/` — 演習・事前準備・到達目標
- **講師向け（社内）**: `/internal` — 冒頭の挨拶・トークスクリプト・想定 Q&A・進行表（`noindex`、スマホで見ながら進行する前提）

## 研修内容の基準

研修本文は **2026 年 10 月時点** の情報にもとづく。記載のバージョン・挙動は次で確認済み。

| 対象 | 基準 | 確認方法 |
|---|---|---|
| Claude Code | v2.1.310 | [公式ドキュメント](https://code.claude.com/docs/ja/overview)（`https://code.claude.com/docs/llms.txt` から各ページの `.md` を取得可能）＋実機 |
| cc-secretary | v1.0.0 | 実機でインストール〜オンボーディング〜基本操作 |
| Lark CLI（`@larksuite/cli`） | v1.0.98 | 実機でインストールウィザード〜`--help`（ログイン以降は Lark アカウントが必要なため未確認） |

本文が前提にしている主な挙動（Claude Code の更新で変わりやすいので、更新時は最初に確認する）:

- 通常のフォルダは **Auto モード** で起動する（v2.1.283〜）。講義サンプルは `.claude/settings.json` の `"defaultMode": "default"` で **Manual モード** 起動にして、許可ダイアログを体験させている
- モデルは Claude 5 世代（Fable 5.1 / Opus 5.5 / Sonnet 5.5 / Haiku 5.5）。Pro 以上の既定は Opus 5.5
- 許可ダイアログの画像（`public/assets/images/training/session2/permission-dialog.png`）は、講義サンプルで §14 の依頼を実行した実画面
- カスタムコマンドは Skills に統合済み。プラグイン導入は `/plugin install` → スコープ選択 → `/reload-plugins`

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

lint・テストスクリプトは未設定。変更後は `npm run build` が通ることを確認する。

## アーキテクチャ

**データフロー**: 研修コンテンツは `docs/training/` 配下の Markdown で管理。サーバーコンポーネント `app/page.tsx` がリクエスト時に `fs/promises` でファイルを読み込み、`lib/markdown.ts` の `splitTrainingSections` で `intro` / `prep` / `session1` / `session2` / `session3` の 5 セクションに分割、各セクションごとに `extractToc` で目次を抽出してクライアントコンポーネント `TrainingPage` に渡す。分割に失敗した場合は単一ページとしてそのまま描画する。

**UI**: `TrainingPage` は「概要 & 事前準備」「Session 1」「Session 2」「Session 3」のタブ式（1Day 研修の時間ブロック想定）。現在のタブは `?tab=` クエリパラメータと同期する。`xl` 以上では右側に sticky な目次サイドバー、`xl` 未満では右下に浮かぶフローティングボタンからドロワー目次を開く。

## ディレクトリ構成

```
app/
  page.tsx              # 研修ページ（Markdown を SSR で読み込み、TrainingPage に委譲）
  layout.tsx            # グローバルレイアウト・フォント設定
  globals.css           # Tailwind v4 のエントリ
  icon.svg              # ファビコン
  internal/
    page.tsx            # 講師向けページ（/internal、noindex）
  api/
    sample-data/route.ts # 講義用 sample-data の ZIP を返す API
components/
  TrainingPage.tsx      # タブ式のクライアントコンポーネント
  MarkdownRenderer.tsx  # Markdown → HTML クライアントコンポーネント
  TocSidebar.tsx        # 目次サイドバー（IntersectionObserver）
  MermaidDiagram.tsx    # Mermaid 図のレンダラー
  SampleDataDownload.tsx # /api/sample-data から ZIP を取得するボタン
docs/
  training/
    claude-code-personal/
      claude-code-personal-training.md            # 受講者向け本文（/）
      claude-code-personal-training-internal.md   # 講師向け本文（/internal）
      sample-data/                                # 講義用ワークスペース。ZIP 配布時は `講義サンプル/` として展開される（受講者が開くのはそのフォルダ）
        説明書.md / 自己紹介.md / 議事メモ.txt      # 演習素材（日本語名は自由に付けた名前）
        CLAUDE.md                                 # 講義用のプロジェクトルール
        .claude/
          settings.json                           # "defaultMode": "default"（Manual モードで起動させる）
          skills/meeting-summary/SKILL.md         # 議事メモ要約の Skill 例
          skills/email-draft/SKILL.md             # 連絡メール下書きの Skill 例
public/
  assets/images/training/{prep,session1,session2,session3}/   # 本文に埋め込む図解・スクリーンショット
lib/
  markdown.ts           # slugify / extractToc / splitTrainingSections
  sample-data-zip.ts    # 講義用 sample-data の ZIP 生成（/api/sample-data）
  remark-alerts.ts      # GitHub 風アラート構文を blockquote のクラスへ変換する remark プラグイン
  remark-directives.ts  # :::name 記法で React コンポーネントを差し込む remark プラグイン
.agents/skills/         # このリポジトリの編集で使うエージェント用 Skill（図解・画像プロンプトなど）
.claude/skills          # → ../.agents/skills へのシンボリックリンク（Claude Code から同じ Skill を参照）
skills-lock.json        # .agents/skills の取得元とハッシュ
CLAUDE.md / AGENTS.md   # エージェント向けの作業ルール（詳細は本 README を参照させている）
```

### 主要ファイルの注意点

- **`lib/markdown.ts`** — `slugify`（Unicode・日本語対応）、`extractToc`、`splitTrainingSections`。`MarkdownRenderer` と `TocSidebar` の両方が `slugify` を呼ぶため、見出し ID は必ず同期させること。`splitTrainingSections` は `## 事前準備` と `## Session 1 — / 2 — / 3 —` の見出し文字列に依存している。
- **`lib/remark-alerts.ts`** — `> [!NOTE]` / `> [!TIP]` / `> [!IMPORTANT]` / `> [!WARNING]` / `> [!CAUTION]` の GitHub 風アラート構文を検出し、対応する blockquote に `alert-*` クラスを付与する remark プラグイン。実際の見た目は `MarkdownRenderer` の `blockquote` カスタマイズで定義する。
- **`lib/remark-directives.ts`** — 単独段落 `:::name` を検出し、paragraph に `directive-name` クラスを付与する remark プラグイン。`MarkdownRenderer` の `p` ハンドラが `DIRECTIVE_COMPONENTS` マップを参照し、対応する React コンポーネントへ置き換える。現在は `:::sample-data-download` → `SampleDataDownload` のみ。新規 directive を足す際はマップに登録する。名前は `[a-z][a-z0-9-]*` のみ。
- **`components/MarkdownRenderer.tsx`** — `react-markdown` + `remark-gfm` + `remarkAlerts` + `remarkDirectives` + `rehype-highlight` を組み合わせるクライアントコンポーネント。Tailwind prose スタイルはすべてインライン定義（`@tailwindcss/typography` は不使用）。コードブロックにはコピー用ボタンが表示される。`language-mermaid` コードブロックは `MermaidDiagram` に委譲する。
  - **表** はセル内で折り返す（`break-words`、セル最小幅はスマホ `min-w-20` / `sm` 以上 `min-w-28`）。収まらない表は表の中だけ横スクロールし、ページ全体は横にはみ出さない
  - **リンク** は長い URL でも折り返せるよう `inline`（`inline-flex` にすると折り返せず、スマホでページが横にはみ出す）
  - **入れ子のリスト** は子リストに左余白を付けて字下げする
  - **チェックリスト**（`- [ ]`）のチェック状態は `localStorage` に保存する。キーは `checklistScope`（`overview` / `session1` / `session2` / `internal` など）ごとに分かれる
- **`components/MermaidDiagram.tsx`** — Mermaid 図のレンダラー。テーマは **`neutral`**（ライト系）固定。ダーク系テーマは使用しないこと。
- **`components/TocSidebar.tsx`** — `IntersectionObserver` でアクティブな見出しをハイライト。`xl` ブレークポイント以上で sticky 表示。
- **`components/TrainingPage.tsx`** — タブ切り替えとモバイル用ドロワー目次を担うクライアントコンポーネント。`## 事前準備` セクションは概要タブ内で左 blue ボーダー＋ slate 背景のコールアウトに包んで表示する。`SampleDataDownload`（`/api/sample-data` から ZIP 取得）は Markdown 本文中の `:::sample-data-download` directive で差し込まれる（`lib/remark-directives.ts`）。

## コンテンツの編集

研修の本文は次を編集する:

| 用途 | ファイル | Web |
|---|---|---|
| **受講者向け（外部）** | `docs/training/claude-code-personal/claude-code-personal-training.md` | `/` |
| **講師向け（社内）** | `docs/training/claude-code-personal/claude-code-personal-training-internal.md` | `/internal` |

`splitTrainingSections` が依存しているため、**受講者向け**でタブ分割を維持する場合は以下の見出しを変更しないこと:

- `## 事前準備`
- `## Session 1 — …` / `## Session 2 — …` / `## Session 3 — …`（各 Session の直前に `---` 区切りが必要）

別形式（単一ページのみ）にする場合は、上記見出しを外せば `app/page.tsx` が単一ページモードで描画する。

### 書くときの注意

- **太字と全角カッコ** — `**…（…）**が` のように、閉じ `**` の直前が全角カッコ・記号で直後が文字だと、Markdown の仕様で太字にならず `**` がそのまま表示される。`**…**（…）が` のようにカッコを太字の外に出す
- **スマホでの見やすさ** — 講師ページはスマホで見ながら進行する前提。列が多い・説明が長い表は、箇条書き（例: `- **1.【5分・講義】** 内容〔§1〕`）にする
- **コピーさせるコマンド** — 長いコマンドは表のセルではなくコードブロック（コピーボタン付き）で示す
- **講義サンプルの固定名** — `CLAUDE.md`・`.claude/`・`settings.json`・`SKILL.md` は Claude Code が認識する固定名なので日本語化しない

## Git リモート（personal / enterprise）

このリポジトリは GitHub 上の 2 リポジトリと連携する。**ブランチは切らず、すべて `main` にマージする**（`CLAUDE.md` / `AGENTS.md` の運用ルール）。

| リモート名 | 用途 | URL |
|-----------|------|-----|
| `origin` | 本番（personal） | https://github.com/shoma-endo/claude-code-personal-docs |
| `enterprise` | ミラー（enterprise） | https://github.com/shoma-endo/claude-code-enterprise-docs |

`main` の上流は `origin/main`（personal）。日常の `git pull` / `git push` は personal 向け。

> `enterprise` リモートと下記の `push-all` / `fetch-all` エイリアスは各自のローカル Git 設定。clone 直後は `origin` しかないので、必要なら `git remote add enterprise <URL>` とエイリアスを自分で設定する。

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
