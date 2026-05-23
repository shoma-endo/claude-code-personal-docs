# 講義用サンプルデータ（ワークスペース）

Claude Code 個人向け 1Day 講義の演習用フォルダです。**エディターで開くのはこの `sample-data` フォルダ**（`CLAUDE.md` がルートに見える階層）です。実在の顧客名・個人名・金額は含みません。

## ダウンロード

1. [GitHub の sample-data フォルダ](https://github.com/shoma-endo/claude-code-personal-docs/tree/main/docs/training/claude-code-personal/sample-data) を開く
2. **Code → Download ZIP** で取得するか、配布されたアーカイブを使う
3. 解凍後、**`sample-data` フォルダ**（`CLAUDE.md` が直下にある階層）をエディターで開く

任意で作業フォルダを分ける場合:

```bash
cp -r sample-data ~/claude-code-personal
cd ~/claude-code-personal
claude
```

## エディターで開く

1. **`sample-data` フォルダ** を VS Code / Cursor / Antigravity IDE で「フォルダを開く」
2. 内蔵ターミナル（`` Ctrl + ` ``）で同じフォルダにいることを確認
3. `claude` を起動

```bash
claude
```

> [!IMPORTANT]
> ルートに `CLAUDE.md` と `meeting-memo.txt` が並んで見えていれば正しい階層です。

## フォルダ構成

```text
sample-data/
├── README.md
├── CLAUDE.md                   # Session 2 §10 以降
├── meeting-memo.txt            # Session 2 §18 用（ダミー）
├── .claude/
│   ├── settings.json           # §12 の設定例
│   └── skills/
│       └── meeting-summary/
│           └── SKILL.md        # §14・§18 の Skill 例
└── examples/                   # 演習後の模範（2 ファイル）
    ├── about-me.md
    └── meeting-summary.md
```

## 講義での使い方

| セッション | 対象 | 使い方 |
|---|---|---|
| Session 2 §4 以降 | このフォルダ全体 | エディターで開き、同じパスで `claude` を起動 |
| Session 2 §10〜§12 | `CLAUDE.md`、`.claude/` | 実物を開きながら学ぶ |
| Session 2 §14 | `.claude/skills/meeting-summary/` | Skill の中身を読む |
| Session 2 §17 | ルート | `about-me.md` を作成。模範は `examples/about-me.md` |
| Session 2 §18 | `meeting-memo.txt` | 要約演習。模範は `examples/meeting-summary.md` |
| Session 2 §19 | `CLAUDE.md` | 既存ルールに 1 行追記 |

## データの出典

議事メモの文体・項目構成は、公開されている議事録サンプル（例: [Sample.net — Minutes of Meeting](https://www.sample.net/minutes-of-meeting)）を参考に、**講義用に新規作成したフィクション**です。
