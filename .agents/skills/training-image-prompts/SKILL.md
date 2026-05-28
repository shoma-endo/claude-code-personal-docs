---
name: training-image-prompts
description: Create image concepts and ChatGPT Image 2 prompts for training materials, slide decks, Markdown lessons, onboarding docs, and text-heavy educational content. Use when Codex needs to make training content easier for first-time learners by inserting diagrams, concept visuals, process images, examples, before/after layouts, thumbnails, or visual explanations into Japanese or bilingual materials.
---

# Training Image Prompts

Design visuals that make text-heavy training material easier to understand at first glance, then produce prompts ready for ChatGPT Image 2.

## Workflow

1. Read the surrounding training content before proposing images.
   - Identify the learner's likely confusion point.
   - Extract the one message the image must carry.
   - Prefer visuals at section boundaries, before exercises, after abstract explanations, and where a procedure has 3+ steps.

2. Choose the image type.
   - **Concept visual**: Use for mental models, roles, architecture, or abstract ideas.
   - **Process diagram**: Use for step-by-step workflows, setup, commands, branching, or troubleshooting.
   - **Before/after visual**: Use when improving a document, prompt, UI, code, or workflow.
   - **Scenario illustration**: Use when learners need a relatable situation or decision context.
   - **Checklist/table visual**: Use when learners compare options, rules, constraints, or dos and don'ts.

3. Apply the training-material design rules.
   - Keep one image to one message.
   - Remove decorative detail that does not help comprehension.
   - Put related items close together and separate different groups with whitespace.
   - Guide the eye from top-left to bottom-right, or from the learner's starting action to the desired result.
   - Use restrained color roles: neutral base, one primary accent, one warning/error accent if needed.
   - Keep in-image text short. For exact Japanese text, quote it and request verbatim rendering.

4. Write the output in this order:
   - **Placement**: Where to insert the image.
   - **Learning purpose**: What confusion it resolves.
   - **Image concept**: A concise description of the visual.
   - **ChatGPT Image 2 prompt**: A ready-to-run prompt.
   - **Checks**: What to verify after generation.
   - **Alt text**: Accessibility text for the training material.

## Prompt Pattern

Use this base structure for ChatGPT Image 2 prompts:

```text
Create a [format/aspect ratio] visual for a Japanese training material.
Learning objective: [one message].
Scene/content: [subject, objects, relationship, learner context].
Composition: [layout, hierarchy, eye flow, spacing].
Style: clean instructional editorial illustration, professional Japanese training deck, readable, calm, modern.
Color: neutral white/light-gray base, dark readable text, one primary accent color, one warning accent only if needed.
Text in image: include only the following exact text, verbatim: "[short text]".
Constraints: no watermark, no logo, no extra text, no crowded details, no photorealistic people unless requested.
```

For detailed patterns, read [references/prompt-patterns.md](references/prompt-patterns.md).

## Source Principles

This skill incorporates slide-design principles from the referenced YouTube training video `https://www.youtube.com/watch?v=4MGQMBAe2f4`, identified from available public summaries as:

- one slide, one message
- information reduction and grouping
- eye-flow-aware placement
- readable fonts and restrained color
- consistent design rules across materials

For the working interpretation, read [references/source-principles.md](references/source-principles.md).

## Quality Gate

Before finalizing, check:

- The image has a clear reason to exist; it is not filler.
- A learner can understand the intended message in 3 seconds.
- The prompt avoids vague style-only requests.
- Any in-image text is short enough to render reliably.
- The generated image can fit the destination medium: Markdown page, slide, handout, or web training page.
- The answer includes alt text and a verification checklist.
