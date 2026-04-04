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
  inputRefs.current = inputRefs.current.slice(0, lines.length);

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
              gap: variant === "bullets" ? 1.5 : 2,
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
