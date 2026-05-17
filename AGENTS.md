# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

For architecture, directory structure, key files, and commands, see [README.md](./README.md).

## Notes for Codex

- No lint or test scripts are configured.
- `app/training/page.tsx` splits `## 事前準備` out of the markdown and wraps it in an amber callout — keep this section name stable.
- Heading IDs must stay in sync between `MarkdownRenderer` and `TocSidebar` — both call `slugify` from `lib/markdown.ts`.
