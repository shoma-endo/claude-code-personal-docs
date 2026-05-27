# 講義用サンプルデータ（ワークスペース）

Claude Code 個人向け 1Day 講義の演習用フォルダです。**エディターで開くのはこの `sample-data` フォルダ**（`CLAUDE.md` がルートに見える階層）です。実在の顧客名・個人名・金額は含みません。

## 取得方法

講義サイト（**Session 2** の **§7 のあと** — 講義用サンプルデータの準備）の **ダウンロードボタン** から **sample-data** を取得してください（圧縮ファイルの場合は展開する）。**§8 より前に**完了してください。

任意で作業フォルダを分ける場合:

```bash
cp -r sample-data ~/claude-code-personal
cd ~/claude-code-personal
claude
```

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
├── CLAUDE.md                   # Session 2 §8 以降
├── about-me.md                 # Session 2 §14 用（差し替え演習）
├── meeting-memo.txt            # Session 2 §15 用（ダミー）
├── .claude/
│   ├── settings.json           # §10 の設定例
│   └── skills/
│       └── meeting-summary/
│           └── SKILL.md        # §12・§15 の Skill 例
└── examples/                   # 演習後の模範（2 ファイル）
    ├── about-me.md
    └── meeting-summary.md
```

## 講義での使い方

| セッション | 対象 | 使い方 |
|---|---|---|
| Session 2 §8〜§16 | このフォルダ全体 | §7 のあとで sample-data 取得後、同じパスで `claude` を起動 |
| Session 2 §8〜§10 | `CLAUDE.md`、`.claude/` | 実物を開きながら学ぶ |
| Session 2 §12 | `.claude/skills/meeting-summary/` | Skill の中身を読む |
| Session 2 §14 | ルート `about-me.md` | 同梱ファイルの「今取り組んでいること」を差し替え。模範は `examples/about-me.md` |
| Session 2 §15 | `meeting-memo.txt` | 要約演習。模範は `examples/meeting-summary.md` |
| Session 2 §16 | `CLAUDE.md` | 既存ルールに 1 行追記 |

## データの出典

議事メモの文体・項目構成は、公開されている議事録サンプル（例: [Sample.net — Minutes of Meeting](https://www.sample.net/minutes-of-meeting)）を参考に、**講義用に新規作成したフィクション**です。
