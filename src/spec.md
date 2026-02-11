# Specification

## Summary
**Goal:** Update the Number Matrix puzzle grid colors to match the requested blue/orange scheme while keeping all digits black.

**Planned changes:**
- Adjust styling in `frontend/src/game/renderers/NumberMatrixView.tsx` so the grid background (behind/between cells) renders blue.
- Update cell styling so given/prefilled (disabled) squares render light orange, and editable squares render a slightly darker orange.
- Ensure both prefilled and user-entered numbers render with black text, without affecting other puzzle types or global app styling.

**User-visible outcome:** When playing the Number Matrix puzzle, the grid displays a blue background, given squares are light orange, editable squares are a darker orange, and all numbers appear in black.
