export const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

export type ColorShadeName = typeof shades[number];

export type ColorShades = Record<ColorShadeName, string>;
