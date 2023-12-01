export const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

export type ColorShadeName = typeof SHADES[number];

export type ColorShades = Record<ColorShadeName, string>;

export function isShade(shade: number | string): boolean {
    return [...SHADES].map((shade) => `${shade}`).includes(`${shade}`);
}
