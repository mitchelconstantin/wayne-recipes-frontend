# ListEditor Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the plain multiline TextFields for ingredients and directions in the recipe edit form with a `ListEditor` component that shows bullet points and numbered steps as you type, matching the display view exactly.

**Architecture:** A single new component `ListEditor` manages an internal `string[]` state derived from the `\n`-joined string prop, renders each line as a prefixed single-line input, and calls `onChange` with the rejoined string on every mutation. `UpdateRecipe.tsx` swaps its two multiline TextFields for `<ListEditor variant="bullets">` and `<ListEditor variant="numbered">`.

**Tech Stack:** React 19, TypeScript, MUI v7 (`Box`, `Typography`, `TextField`)

**Spec:** `docs/superpowers/specs/2026-04-04-list-editor-design.md`

---

## Chunk 1: ListEditor component

### Task 1: Pure helper logic with tests

**Files:**
- Create: `src/UpdateRecipe/ListEditor.tsx`
- Create: `src/UpdateRecipe/ListEditor.test.ts`

- [ ] **Step 1.1: Write the failing tests for `parseLines` and `joinLines`**

Create `src/UpdateRecipe/ListEditor.test.ts`:

```ts
import { parseLines, joinLines } from "./ListEditor";

describe("parseLines", () => {
  it("splits a newline-joined string into an array", () => {
    expect(parseLines("a\nb\nc")).toEqual(["a", "b", "c"]);
  });

  it("returns [''] for an empty string so there is always one row", () => {
    expect(parseLines("")).toEqual([""]);
  });

  it("preserves a single non-empty item", () => {
    expect(parseLines("flour")).toEqual(["flour"]);
  });

  it("preserves trailing empty string from a trailing newline", () => {
    // A value ending with \n (e.g. saved that way) produces a trailing empty row.
    // This is intentional: the editor shows what is stored. The display components
    // filter empty lines via .filter(line => line.trim()), so this does not affect display.
    expect(parseLines("a\nb\n")).toEqual(["a", "b", ""]);
  });
});

describe("joinLines", () => {
  it("joins an array back into a newline-separated string", () => {
    expect(joinLines(["a", "b", "c"])).toBe("a\nb\nc");
  });

  it("joins a single-element array with no newlines", () => {
    expect(joinLines(["flour"])).toBe("flour");
  });

  it("joins an empty array to an empty string", () => {
    expect(joinLines([])).toBe("");
  });

  it("round-trips through parseLines", () => {
    const original = "1 cup flour\n2 eggs\n1 tsp vanilla";
    expect(joinLines(parseLines(original))).toBe(original);
  });
});
```

- [ ] **Step 1.2: Run tests to verify they fail**

```bash
npm test -- --testPathPattern="ListEditor" --watchAll=false
```

Expected: FAIL — `parseLines` and `joinLines` are not defined.

- [ ] **Step 1.3: Create `src/UpdateRecipe/ListEditor.tsx` with exports and full implementation**

```tsx
import { useRef, KeyboardEvent, ClipboardEvent } from "react";
import { Box, Typography, TextField } from "@mui/material";

// --- Pure helpers (exported for testing) ---

export const parseLines = (value: string): string[] => {
  if (!value) return [""];
  return value.split("\n");
};

export const joinLines = (lines: string[]): string => lines.join("\n");

// --- Component ---

interface ListEditorProps {
  value: string;
  onChange: (value: string) => void;
  variant: "bullets" | "numbered";
  label: string;
  required?: boolean;
}

export const ListEditor = ({ value, onChange, variant, label, required }: ListEditorProps) => {
  const lines = parseLines(value);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const update = (newLines: string[]) => {
    onChange(joinLines(newLines));
  };

  const handleChange = (index: number, newValue: string) => {
    const newLines = [...lines];
    newLines[index] = newValue;
    update(newLines);
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newLines = [...lines];
      newLines.splice(index + 1, 0, "");
      update(newLines);
      setTimeout(() => inputRefs.current[index + 1]?.focus(), 0);
    }

    if (e.key === "Backspace" && lines[index] === "") {
      if (lines.length === 1) return;
      e.preventDefault();
      const newLines = [...lines];
      newLines.splice(index, 1);
      update(newLines);
      // Focus the row above, or the new first row if we deleted the first row
      const focusIndex = index > 0 ? index - 1 : 0;
      setTimeout(() => inputRefs.current[focusIndex]?.focus(), 0);
    }
  };

  const handlePaste = (index: number, e: ClipboardEvent<HTMLDivElement>) => {
    const pasted = e.clipboardData.getData("text");
    if (!pasted.includes("\n")) return; // let the browser handle single-line paste normally
    e.preventDefault();
    const pastedLines = pasted.split("\n");
    const newLines = [...lines];
    // Replace the current row entirely with the pasted content (first line replaces current row,
    // remaining lines are inserted as new rows immediately after)
    newLines.splice(index, 1, ...pastedLines);
    update(newLines);
    const lastInsertedIndex = index + pastedLines.length - 1;
    setTimeout(() => inputRefs.current[lastInsertedIndex]?.focus(), 0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="body2"
        sx={{
          mb: 1,
          color: required ? "text.primary" : "text.secondary",
          fontWeight: 500,
        }}
      >
        {label}
        {required && (
          <Typography component="span" sx={{ color: "error.main", ml: 0.5 }}>
            *
          </Typography>
        )}
      </Typography>

      <Box
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          p: 1.5,
          display: "flex",
          flexDirection: "column",
          gap: variant === "numbered" ? 2 : 0.5,
          minHeight: 260,
          "&:focus-within": {
            borderColor: "primary.main",
            boxShadow: (theme) => `0 0 0 1px ${theme.palette.primary.main}`,
          },
        }}
      >
        {lines.map((line, i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              // Match display components exactly:
              // IngredientsList uses alignItems: "baseline", DirectionsList uses alignItems: "flex-start"
              alignItems: variant === "bullets" ? "baseline" : "flex-start",
              gap: 1.5,
            }}
          >
            {variant === "bullets" ? (
              <Box
                sx={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  backgroundColor: "primary.main",
                  border: "1.5px solid",
                  borderColor: "primary.main",
                  flexShrink: 0,
                  mt: "2px",
                }}
              />
            ) : (
              <Box
                sx={{
                  minWidth: 28,
                  height: 28,
                  borderRadius: "50%",
                  backgroundColor: "primary.main",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  flexShrink: 0,
                  mt: "1px",
                }}
              >
                {i + 1}
              </Box>
            )}
            <TextField
              inputRef={(el) => (inputRefs.current[i] = el)}
              value={line}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={(e) => handlePaste(i, e)}
              placeholder={
                i === lines.length - 1
                  ? variant === "bullets"
                    ? "Add ingredient..."
                    : "Add step..."
                  : ""
              }
              variant="standard"
              fullWidth
              slotProps={{ input: { disableUnderline: true } }}
              sx={{ "& input": { fontSize: "1rem", py: 0.25 } }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
```

- [ ] **Step 1.4: Run tests to verify they pass**

```bash
npm test -- --testPathPattern="ListEditor" --watchAll=false
```

Expected: PASS — all 8 tests green.

- [ ] **Step 1.5: Commit**

```bash
git add src/UpdateRecipe/ListEditor.tsx src/UpdateRecipe/ListEditor.test.ts
git commit -m "feat: add ListEditor component with bullet and numbered variants"
```

---

## Chunk 2: Wire ListEditor into UpdateRecipe

### Task 2: Replace multiline TextFields in UpdateRecipe.tsx

**Files:**
- Modify: `src/UpdateRecipe/UpdateRecipe.tsx:126-149`

- [ ] **Step 2.1: Open `src/UpdateRecipe/UpdateRecipe.tsx` and locate the Grid block to replace**

The block at lines 126–149 looks like:

```tsx
<Grid container spacing={2} sx={{ width: "100%", mb: 3 }}>
  <Grid size={{ xs: 12, md: 6 }}>
    <TextField
      value={recipe.ingredients || ""}
      onChange={(e) => handleChange("ingredients", e.target.value)}
      required
      label="Ingredients"
      fullWidth
      multiline
      rows={10}
    />
  </Grid>
  <Grid size={{ xs: 12, md: 6 }}>
    <TextField
      value={recipe.directions || ""}
      onChange={(e) => handleChange("directions", e.target.value)}
      required
      label="Directions"
      fullWidth
      multiline
      rows={10}
    />
  </Grid>
</Grid>
```

- [ ] **Step 2.2: Add the `ListEditor` import at the top of `UpdateRecipe.tsx`**

Add after the existing local imports (e.g., after the `DeleteRecipeDialog` import):

```tsx
import { ListEditor } from "./ListEditor";
```

- [ ] **Step 2.3: Replace the Grid block with ListEditor components**

Replace the entire `<Grid container>` block (lines 126–149) with:

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

- [ ] **Step 2.4: Run the full test suite to confirm nothing is broken**

```bash
npm test -- --watchAll=false
```

Expected: All existing tests pass. No new failures.

- [ ] **Step 2.5: Start the dev server and manually verify**

```bash
npm start
```

Manual checks:
1. Navigate to any recipe's edit page (or create a new recipe at `/new`)
2. Ingredients field shows a bullet dot per line from the stored data
3. Directions field shows numbered circles per line from the stored data
4. Typing in a row updates the value
5. Pressing Enter adds a new row with the appropriate bullet/number
6. Backspace on an empty row removes it (except when it's the only row)
7. Pasting multi-line text splits into separate rows
8. Save the recipe and verify the display page shows the same data correctly

- [ ] **Step 2.6: Commit**

```bash
git add src/UpdateRecipe/UpdateRecipe.tsx
git commit -m "feat: use ListEditor for ingredients and directions in recipe edit form"
```
