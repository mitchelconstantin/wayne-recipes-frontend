# List Editor for Recipe Create/Edit Flow

**Date:** 2026-04-04

## Overview

Replace the plain multiline `TextField` inputs for ingredients and directions in the recipe create/edit form with a `ListEditor` component that renders each line as a bullet point (ingredients) or numbered step (directions), matching the display view exactly.

## Problem

The current form uses plain `<TextField multiline>` for both ingredients and directions. The display view renders these as styled bullet points and numbered circles. There is a visual disconnect between editing and viewing — users type in a plain box but see formatted lists on the recipe page.

## Solution

A single reusable `ListEditor` component that:
- Stores data in the same newline-separated string format already used
- Renders each line as a single-line input prefixed with the appropriate visual indicator
- Requires no backend changes

## Component Design

### `ListEditor` (`src/UpdateRecipe/ListEditor.tsx`)

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `value` | `string` | Newline-joined string (current recipe field format). May arrive as `undefined` from the API for optional fields like `directions`; callers pass `recipe.directions \|\| ""` to normalize to `string`. |
| `onChange` | `(value: string) => void` | Called on every state mutation (key press, Enter, Backspace, paste) with the updated newline-joined string |
| `variant` | `'bullets' \| 'numbered'` | Visual style — bullets for ingredients, numbered for directions |
| `label` | `string` | Field label shown above the list |
| `required` | `boolean?` | Whether the field is marked required (visual only — matches the existing `disabled` guard in `UpdateRecipe.tsx` line 50) |

**Internal state:** `string[]` — the `value` split on `\n`. Joined back to `\n`-separated string on every `onChange` call.

**Keyboard behavior:**

| Action | Result |
|--------|--------|
| `Enter` on any row | Insert empty row below current row, focus it, call `onChange` |
| `Enter` on the last row | Append a new empty row to the end of the list, focus it, call `onChange` |
| `Backspace` on an empty row (not the only row) | Remove that row; if it was the first row focus the new first row (previously index 1), otherwise focus the row above; call `onChange` |
| `Backspace` on the only empty row | Do nothing (preserves the empty-state invariant) |
| Any other key | Update row value, call `onChange` |

**Paste behavior:** On paste, split clipboard text on `\n` to get `pastedLines`. Replace the entire content of the current row with the first pasted line. Insert the remaining pasted lines as new rows immediately after the current row. Focus the last inserted row. Call `onChange`. (Any pre-existing text in the current row is discarded in favor of the pasted content — this matches the common "paste a recipe from the web" use case.)

**Visual rendering:**
- Bullet variant: small filled circle (`width: 5px, height: 5px`, `border-radius: 50%`, `backgroundColor: primary.main`, `border: 1.5px solid primary.main`) — matches `IngredientsList.tsx` exactly
- Numbered variant: circular badge (`minWidth: 28px, height: 28px`, `border-radius: 50%`, `backgroundColor: primary.main`, white text, `font-size: 0.8rem`, `font-weight: 700`). Uses `minWidth` (not fixed width) so the badge expands correctly for double-digit step numbers — matches `DirectionsList.tsx` exactly.

**Empty state:** Always render at least one empty input row so the field is never blank/unusable.

**Focus on mount:** No auto-focus. The component mounts with no row focused, consistent with the existing `TextField` behavior.

## Integration

In `src/UpdateRecipe/UpdateRecipe.tsx`, replace the existing `<Grid container spacing={2}>` block (lines 126–149) that holds the two multiline `TextField` components with:

```tsx
<Grid container spacing={2} sx={{ width: "100%", mb: 3 }}>
  <Grid size={{ xs: 12, md: 6 }}>
    <ListEditor
      variant="bullets"
      label="Ingredients"
      required
      value={recipe.ingredients || ""}
      onChange={(v) => handleChange("ingredients", v)}
    />
  </Grid>
  <Grid size={{ xs: 12, md: 6 }}>
    <ListEditor
      variant="numbered"
      label="Directions"
      required
      value={recipe.directions || ""}
      onChange={(v) => handleChange("directions", v)}
    />
  </Grid>
</Grid>
```

The two-column layout (side-by-side on `md`+, stacked on `xs`) is preserved.

## Data Format

No changes to the data model. The `IRecipe.ingredients` and `IRecipe.directions` fields remain newline-separated strings. `ListEditor` converts between `string` and `string[]` internally.

## Out of Scope

- Multi-line text per step (each row is a single-line input)
- Drag-to-reorder rows
- Rich text formatting
