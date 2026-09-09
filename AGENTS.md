# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

Motion preference: keep the rooftop sign natural and animate every PCG mark in the left-side rails with the same restrained 3D spin; give the hero sky a subtle cloud drift, and present the 50+ years manufacturing claim as a smooth branded motion banner. Motion must preserve text readability and respect reduced-motion preferences.

Theme preference: provide a small light/dark mode toggle at the bottom of the page, keep it visually secondary, and remember the visitor's choice.

Content and conversion preference: prioritize authentic factory, laboratory, packaging, and product photography over abstract hero art; make ODM versus OEM unmistakable; use only substantiated proof points; and route the main conversion path through a structured manufacturing quote request rather than generic contact copy.

AI enhancement: the quote form includes an optional, on-device Transformers.js brief helper. Keep it progressive, privacy-explicit, review-before-apply, and non-blocking so the standard quote path always works without the model.

Selected visual target: Product Design direction 1, refined on 10 September 2026. The source of truth is `C:/Users/Arvind Govindasamy/.codex/generated_images/019fd752-f0ee-7bf0-b4db-d2e0f5ac1ab2/exec-4682fc8f-a143-4992-8c64-ccb63debeeb0.png`. Preserve the cinematic full-bleed factory/lab hero, deep-teal vertical rail, oversized editorial Rubik headline, compact top navigation, right-side chapter progress, kinetic 50+ years band, and high-contrast ODM/OEM split.

Scroll preference: make the homepage feel like a premium 2026 editorial manufacturing story. Use a full-viewport opening, restrained parallax, reveal choreography, a clear chapter-progress indicator, and a sticky ODM/OEM comparison on wide screens. Keep motion purposeful, performant, readable, and reduced-motion safe; stack the story naturally on smaller screens.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
