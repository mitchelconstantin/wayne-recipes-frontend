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
| `value` | `string` | Newline-joined string (current recipe field format) |
| `onChange` | `(value: string) => void` | Called on every change with updated joined string |
| `variant` | `'bullets' \| 'numbered'` | Visual style — bullets for ingredients, numbered for directions |
| `label` | `string` | Field label shown above the list |
| `required` | `boolean?` | Whether the field is required |

**Internal state:** `string[]` — the `value` split on `\n`. Joined back to `\n`-separated string on every `onChange` call.

**Keyboard behavior:**

| Action | Result |
|--------|--------|
| `Enter` on any row | Insert empty row below, focus it |
| `Backspace` on empty row | Remove row, focus previous row (or next if first) |
| Any other key | Update row value, call `onChange` |

**Paste behavior:** On paste, split clipboard text on `\n`, insert all lines starting at the current cursor row (replacing any selected content in that row), call `onChange`.

**Visual rendering:**
- Bullet variant: small filled circle (5×5px, `primary.main`, `border-radius: 50%`) — matches `IngredientsList.tsx`
- Numbered variant: circular badge (28×28px, `primary.main` background, white text, `font-size: 0.8rem`, `font-weight: 700`) — matches `DirectionsList.tsx`

**Empty state:** Always render at least one empty input row so the field is never blank/unusable.

## Integration

In `src/UpdateRecipe/UpdateRecipe.tsx`, replace the two `Grid` items containing `<TextField multiline rows={10}>` for ingredients and directions with:

```tsx
<ListEditor
  variant="bullets"
  label="Ingredients"
  required
  value={recipe.ingredients || ""}
  onChange={(v) => handleChange("ingredients", v)}
/>

<ListEditor
  variant="numbered"
  label="Directions"
  required
  value={recipe.directions || ""}
  onChange={(v) => handleChange("directions", v)}
/>
```

## Data Format

No changes to the data model. The `IRecipe.ingredients` and `IRecipe.directions` fields remain newline-separated strings. `ListEditor` converts between `string` and `string[]` internally.

## Out of Scope

- Multi-line text per step (each row is a single-line input)
- Drag-to-reorder rows
- Rich text formatting
