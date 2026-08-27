# ARM Visual Language: Deliberate, Portable, and Editorial

## Decision

The portable flagship and participation portal use **Hedvig Letters Serif** for decisive editorial statements, **Schibsted Grotesk** for reading and interface work, and **Fragment Mono** sparingly for locators, statuses, and reference IDs. The three families are licensed under the SIL Open Font License 1.1, which makes the system usable in open-source static properties without a proprietary font subscription. [1] [2] [3]

This is a deliberate departure from the familiar startup recipe of a display serif paired with a neutral geometric sans and developer-code mono. The system is built around the visual language of accountable records: an editorial face with visible character, a digital-first interface face with the discipline of a newsroom, and a constrained machine-like annotation layer.

| Layer | Typeface | Role | Usage rule |
|---|---|---|---|
| **Decision voice** | Hedvig Letters Serif | Headlines, principles, short quotations, pivotal calls to action. | Use few large statements with generous negative space; do not use for dense body text. |
| **Working language** | Schibsted Grotesk | Body copy, navigation, controls, tables, long-form explanation. | Preserve readable line length and use weight for hierarchy rather than decorative effects. |
| **Trace layer** | Fragment Mono | Records, timestamps, capability IDs, status tags, and route references. | Keep it small in volume and never rely on it for essential long-form reading. |

## Layout and material

Use a bright mineral ground, precise ultramarine as the signature color, blackened ink for authority, warm gray dividers, and restrained rust/ochre only for attention or review state. Avoid gradients, generic floating rounded cards, neon, and centered “hero plus three columns” assembly. Create a **field-record** rhythm instead: a narrow navigation rail, off-axis headline blocks, vertically numbered sections, fine rule lines, and content grouped by operational responsibility rather than marketing category.

Motion should clarify causality. Expand a record, reveal an annotation, or transition a filter within 180–240 ms; do not animate core reading or simulate a system that does not exist. Respect `prefers-reduced-motion` and make all capability filters and navigation usable from a keyboard.

## Implementation

Load the open families with `font-display: swap` and provide ordinary system fallbacks. The initial static packages may use the Google Fonts stylesheet for simplicity; a release package can self-host immutable WOFF2 files and preserve the applicable OFL notices. No font should become a dependency that changes the property’s role, data boundary, or deployment portability.

## References

[1] [Kanon Foundry, *Hedvig Letters*](https://github.com/KanonFoundry/HedvigLetters)

[2] [Schibsted, *Schibsted Grotesk*](https://github.com/schibsted/schibsted-grotesk)

[3] [Wei Huang, *Fragment Mono*](https://github.com/weiweihuanghuang/fragment-mono)
