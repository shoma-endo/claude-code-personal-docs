# 講義用サンプルデータ（ワークスペース）

Claude Code 個人向け 1Day 講義の演習用フォルダです。**エディターで開くのはこの `sample-data` フォルダ**（`CLAUDE.md` がルートに見える階層）です。実在の顧客名・個人名・金額は含みません。

## 取得方法

講義サイト（**Session 2** の **§5 のあと** — 講義用サンプルデータの準備）の **ダウンロードボタン** から **sample-data** を取得してください（圧縮ファイルの場合は展開する）。**§6 より前に**完了してください。

## エディターで開く

1. **`sample-data` フォルダ** を VS Code / Cursor / Antigravity IDE で「フォルダを開く」
2. 内蔵ターミナル（`` Ctrl + ` ``）で同じフォルダにいることを確認
3. `claude` を起動（事前準備で済ませておく）

```bash
claude
```

> [!IMPORTANT]
> ルートに `CLAUDE.md`・`about-me.md`・`meeting-memo.txt` が並んで見えていれば正しい階層です。

## フォルダ構成

```text
sample-data/
├── README.md
├── CLAUDE.md                   # Session 2 §6 以降
├── about-me.md                 # Session 2 §14 用（差し替え演習）
├── meeting-memo.txt            # Session 2 §15 用（ダミー）
├── .claude/
│   ├── settings.json           # §8 の設定例
│   └── skills/
│       └── meeting-summary/
│           └── SKILL.md        # §11・§15 の Skill 例
└── examples/                   # 演習後の模範（2 ファイル）
    ├── about-me.md
    └── meeting-summary.md
```

## ダウンロード後にやること（はじめての方向け・順番）

このフォルダを取得したら、上から順に進めれば一通り体験できます。各ステップは講義サイト（受講者ページ）の節と対応しています。

### ステップ0 — 準備

1. この `sample-data` フォルダをエディターで「フォルダを開く」
2. 内蔵ターミナル（`` Ctrl + ` ``）で `claude` を起動する

### ステップ1〜 — 演習の流れ

| 順 | やること | 使うファイル | 受講者ページ |
|---|---|---|---|
| 1 | プロジェクトルールを Claude に要約させる | `CLAUDE.md` | §6 |
| 2 | 設定ファイルの置き場所を知る（中身はほぼ空でOK） | `.claude/settings.json` | §8 |
| 3 | Skill（定型手順）の中身を読む | `.claude/skills/meeting-summary/SKILL.md` | §11 |
| 4 | 自己紹介を自分用に差し替える | `about-me.md`（模範: `examples/about-me.md`） | §14 |
| 5 | 議事メモを要約して保存する | `meeting-memo.txt` → `meeting-summary.md`（模範: `examples/meeting-summary.md`） | §15 |
| 6 | ルールを 1 行追記する | `CLAUDE.md` | §16 |

> [!TIP]
> 詳しい依頼文（プロンプト）や完了の目安は、受講者ページの各節に載っています。このフォルダは「手を動かす場所」、受講者ページは「進め方の説明」と覚えてください。

## このサンプルでできること（例）

- Claude にファイルを**読ませて要約**させる（議事メモ → サマリー）
- 既存ファイルを**目的に合わせて編集**させる（自己紹介の差し替え）
- **プロジェクトルール（`CLAUDE.md`）**で Claude の応答ルールを決める
- **Skill** で定型作業（議事録整理）を手順化する
- `examples/` の模範と**見比べて答え合わせ**する

## データの出典

議事メモの文体・項目構成は、公開されている議事録サンプル（例: [Sample.net — Minutes of Meeting](https://www.sample.net/minutes-of-meeting)）を参考に、**講義用に新規作成したフィクション**です。
