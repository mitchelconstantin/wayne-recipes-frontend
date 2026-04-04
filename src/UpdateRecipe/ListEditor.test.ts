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
