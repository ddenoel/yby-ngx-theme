export const COLOR_NAMES = ['primary', 'accent', 'custom1', 'custom2'] as const;
export type ColorNames = typeof COLOR_NAMES[number];

export type PaletteColors = Record<ColorNames, string>;
