import type { CSSProperties } from "react";

export function sizeStyle(
  fieldSizes: Record<string, number> | undefined,
  key: string
): CSSProperties | undefined {
  const rem = fieldSizes?.[key];
  return rem ? { fontSize: `${rem}rem` } : undefined;
}
