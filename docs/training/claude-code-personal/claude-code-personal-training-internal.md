# Claude Code 個人向け 1Day 講義 — 講師向け（社内）

> **受講者向け資料**（外部公開）: [claude-code-personal-training.md](./claude-code-personal-training.md)  
> **Web**: `/`（受講者） / `/internal`（本ページ）

---

## 講義時間（目安）

| セッション | 時間 | 備考 |
|---|---|---|
| Session 1 | 作成中 | AI エージェント概論（本文はこれから執筆） |
| Session 2 | **2 時間** | 質疑応答 15 分を含む。事前準備（§①〜④）完了が前提 |
| Session 3 | 別枠 | 本資料の Session 3 進行表を参照 |

---

## Session 1（作成中）

受講者向け資料の **Session 1 — AIエージェントとは？従来のAIとの違い** の本文・進行表は未作成です。

---

## Session 2 構成（前半 / 後半）

| パート | 節 | 内容 |
|---|---|---|
| **共通** | 事前準備 §①〜④ | インストール・エディター/ターミナル・`sample-data` まで完了 |
| **前半** | §1〜§7 | 概要、CLI 前提、安全、許可・停止、エージェントループ |
| **前半** | §8〜§13 | `CLAUDE.md`・`.claude/skills` 等の実物で設定の説明 |
| **後半** | §14〜§16 | ファイル作成・要約・`CLAUDE.md` 追記 |
| **締め** | §17 | 振り返り（コマンド一覧は資料参照） |

---

## Session 2 進行表

| 順番 | 内容 | 形式 | 目安 | 対応節 |
|:---:|---|---|:---:|---|
| 1 | オープニング、講義全体像、事前準備の確認（口頭） | 講義 | 5分 | — |
| 2 | CLI 前提、Claude Code とは、チャット AI との違い（表は要点のみ） | 講義 | 12分 | §1〜2 |
| 3 | 個人利用の安全ルール | 講義 | 10分 | §3 |
| 4 | 許可・停止（初めてのファイル操作前） | 実習 | 12分 | §4〜5 |
| 5 | チェックポイント、エージェントループ | 講義 | 8分 | §6〜7 |
| 6 | `CLAUDE.md`・`.claude/`・Skills を実物で確認（Plan・コンテキストは要点のみ） | 講義・対話 | 25分 | §8〜13 |
| 7 | `about-me.md` 作成 | 実習 | 12分 | §14 |
| 8 | 議事メモ要約、`CLAUDE.md` 追記 | 実習 | 20分 | §15〜16 |
| 9 | 振り返り（§17 は資料参照） | 講義 | 5分 | §17 |
| 10 | **質疑応答** | 対話 | 15分 | — |
| | **合計** | | **124分** | バッファ約16分 |

> 事前準備 §③（エディター/ターミナル）・§④（sample-data）は講義前に完了させる。当日は口頭確認のみ。

---

## Session 3 進め方（インストール順）

Session 3 では **cc-secretary を Lark CLI より先に必ず完了** してください。

| 順番 | ブロック | 節 | 内容 |
|:---:|---|---|---|
| **1** | AI 秘書 | §1〜§7 | cc-secretary のインストール → オンボーディング → 基本操作 |
| **2** | Lark CLI | §8〜§13 | Lark CLI のインストール → 設定 → Features・基本操作 |

---

## Session 3 進行表

| 順番 | 内容 | 形式 |
|:---:|---|---|
| 1 | Session 2 の振り返り、安全ルール再確認 | 対話 |
| 2 | **【1】** AI 秘書とは、cc-secretary のインストール | 講義・実習 |
| 3 | **【1】** オンボーディング、基本操作 | 実習 |
| 4 | **【1】** 自分仕様に育てる、代替ワーク（ここまでで cc-secretary を完了） | 実習 |
| 5 | **【2】** Lark CLI のインストール・設定・Features | 講義・実習 |
| 6 | **【2】** Lark CLI の基本操作、Claude Code 連携 | 実習 |
| 7 | コマンドリファレンス、振り返り、フォロー | 講義 |

---

## 社内リソース

| リソース | URL |
|---|---|
| インストール動画 | https://www.youtube.com/watch?v=_rskJ6I0H-s |
| インストール文字起こし（社内 Lark） | https://mjpt22tawf9f.jp.larksuite.com/docx/LEiVdTiftoKEAuxkqABj16ZEph6 |

---

## サンプルデータ（開発・講師環境）

受講者には GitHub / ZIP 経由で配布。リポジトリ clone 済みの場合:

```bash
# エディターで開く
docs/training/claude-code-personal/sample-data

# またはホームへコピー
cp -r docs/training/claude-code-personal/sample-data ~/claude-code-personal
```

GitHub: https://github.com/shoma-endo/claude-code-personal-docs/tree/main/docs/training/claude-code-personal/sample-data
