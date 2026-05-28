# Prompt Patterns for Training Images

Use these patterns when creating ChatGPT Image 2 prompts for training materials.

## General Output Rules

- Prefer 16:9 for slide-like visuals, 4:3 for document inserts, 1:1 for cards or thumbnails, and vertical 4:5 only for mobile-first learning content.
- State the destination explicitly: Japanese training material, Markdown lesson, workshop slide, or onboarding document.
- Use "exact text, verbatim" for in-image text. Keep it under 20 Japanese characters when possible.
- If text must be perfect, provide a fallback: generate the image without text and overlay text in the document or slide editor.
- Use "no extra text" whenever the prompt already specifies the exact text.
- Ask for grouped labels, numbered steps, arrows, callouts, or panels only when they clarify the concept.

## Concept Visual

```text
Create a 16:9 concept visual for a Japanese training material.
Learning objective: [single concept the learner must grasp].
Scene/content: [metaphor or concrete objects that represent the concept].
Composition: one central focal point, 3 supporting elements arranged left-to-right, generous whitespace, clear visual hierarchy.
Style: clean instructional editorial illustration, professional Japanese workshop material, readable, calm, modern.
Color: white/light-gray base, charcoal text, blue primary accent, amber caution accent only where needed.
Text in image: include only the following exact text, verbatim: "[short label]".
Constraints: no watermark, no logo, no extra text, no crowded background, no decorative icons unrelated to the concept.
```

## Process Diagram

```text
Create a 16:9 process diagram for a Japanese training material.
Learning objective: show the flow from [start state] to [end state].
Scene/content: [3-5 steps], each step represented as a simple panel with one icon-like object and a short label.
Composition: left-to-right flow with arrows, step numbers visible, related items grouped, strong spacing between phases.
Style: clean flat instructional diagram, professional training deck, readable Japanese labels.
Color: neutral base, blue for normal progress, green for completion, red only for errors.
Text in image: include only these exact labels, verbatim: "[1]", "[2]", "[3]".
Constraints: no extra text, no watermark, no logo, avoid tiny UI details, keep labels large and legible.
```

## Before/After Visual

```text
Create a 16:9 before-and-after visual for a Japanese training material.
Learning objective: make learners see the difference between [bad/current state] and [good/target state].
Scene/content: split screen, left side shows the confusing version, right side shows the improved version.
Composition: left labeled "[Before label]", right labeled "[After label]", clear contrast, same subject in both sides, arrow or divider in the center.
Style: clean professional training deck, minimal, readable, practical.
Color: left side uses muted gray with small red warning accents; right side uses white and blue/green success accents.
Text in image: include only the following exact text, verbatim: "[Before label]", "[After label]".
Constraints: no extra text, no watermark, no logo, do not make the bad example unreadable or chaotic.
```

## Scenario Illustration

```text
Create a 4:3 scenario illustration for a Japanese training document.
Learning objective: help first-time learners recognize [situation/decision].
Scene/content: [person/role] facing [task/tool/problem], with visible cues that show the decision point.
Composition: foreground action, background simplified, one callout area for the key idea, eye flow from person to task result.
Style: warm but professional editorial illustration for business training, simple shapes, realistic workplace context without photorealism.
Color: neutral office palette, blue accent for the recommended action.
Text in image: include only the following exact text, verbatim: "[short phrase]".
Constraints: no extra text, no watermark, no brand logos, no distracting facial detail.
```

## Checklist or Comparison Visual

```text
Create a 4:3 comparison visual for a Japanese training material.
Learning objective: help learners compare [option A] and [option B].
Scene/content: two-column comparison with simple icon-like markers and 3 rows.
Composition: balanced columns, clear row alignment, large headings, strong whitespace, no dense paragraph text.
Style: clean training handout graphic, readable, modern, restrained.
Color: neutral base, blue accent for recommended items, amber accent for caution.
Text in image: include only these exact headings, verbatim: "[A]", "[B]".
Constraints: no extra text, no watermark, no logo, no tiny table text.
```

## Generation Review Checklist

After generation, verify:

- Message: The image communicates the intended learning point without reading the surrounding paragraph.
- Legibility: Any Japanese text is correct, large, and not distorted.
- Structure: The eye naturally moves in the intended order.
- Relevance: Every visual element supports the training goal.
- Medium fit: The image remains readable at the actual insert size.
- Accessibility: Alt text explains the learning point, not just the visual appearance.
