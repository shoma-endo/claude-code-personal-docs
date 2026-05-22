# 講義用サンプルデータ（ワークスペース）

Claude Code 個人向け 1Day 講義の演習用フォルダです。**エディターで開くのはこの `sample-data` フォルダ**（`CLAUDE.md` がルートに見える階層）です。実在の顧客名・個人名・金額は含みません。

## エディターで開く

1. この **`sample-data` フォルダ** を VS Code / Cursor / Antigravity IDE で「フォルダを開く」
2. 内蔵ターミナル（`` Ctrl + ` ``）で同じフォルダにいることを確認
3. `claude` を起動

```bash
claude
```

> [!IMPORTANT]
> **親フォルダ（`claude-code-personal` など）を開かないでください。** ルートに `CLAUDE.md` と `meeting-memo.txt` が並んで見えていれば正しい階層です。`claude-code-personal` という名前の**子フォルダだけ**が見える場合は、1 階層深すぎます。

## ホームにコピーして使う場合（推奨）

リポジトリ内のパスが長いときは、コピー先を講義用の作業フォルダにします。

```bash
cp -r docs/training/claude-code-personal/sample-data ~/claude-code-personal
cd ~/claude-code-personal
claude
```

コピー後は **`~/claude-code-personal`** をエディターで開きます（中身はこの `sample-data` と同じ構成です）。

## その他の取得方法

### GitHub から clone 済みの場合

```bash
cd claude-code-personal-docs/docs/training/claude-code-personal/sample-data
claude
```

### ZIP で取得した場合

解凍後、次のフォルダをエディターで開きます。

`claude-code-personal-docs/docs/training/claude-code-personal/sample-data/`

（末尾が **`sample-data`** であること。その中に `CLAUDE.md` があること。）

## フォルダ構成

```text
sample-data/                    # ← エディターで開くのはここ
├── README.md                   # このファイル
├── CLAUDE.md                   # Session 1 §10 以降
├── meeting-memo.txt            # Session 1 §21 用（ダミー）
├── .claude/
│   ├── settings.json           # §12 の設定例
│   └── skills/
│       └── meeting-summary/
│           └── SKILL.md        # §14・§21 の Skill 例
└── examples/                   # Session 1 の模範のみ（2 ファイル）
    ├── about-me.md
    └── meeting-summary.md
```

## 講義での使い方

| セッション | 対象 | 使い方 |
|---|---|---|
| Session 1 **§4 以降** | このフォルダ全体 | エディターで開き、同じパスで `claude` を起動 |
| Session 1 §10〜§12 | `CLAUDE.md`、`.claude/` | 実物を開きながら講義・対話 |
| Session 1 §14 | `.claude/skills/meeting-summary/` | Skill の中身を読む |
| Session 1 §17〜20 | ルート | `about-me.md` を作成。模範は `examples/about-me.md` |
| Session 1 §21 | `meeting-memo.txt` | 要約演習。模範は `examples/meeting-summary.md` |
| Session 1 §22 | `CLAUDE.md` | 既存ルールに 1 行追記 |
| Session 2 §7 | （なし） | `manual-secretary/` は Claude に新規作成させる（配布物に含めない） |

## データの出典

議事メモの文体・項目構成は、公開されている議事録サンプル（例: [Sample.net — Minutes of Meeting](https://www.sample.net/minutes-of-meeting)）を参考に、**講義用に新規作成したフィクション**です。
