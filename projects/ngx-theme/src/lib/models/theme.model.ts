import { ColorShadeName } from './color-shade.model';
import { PaletteName, IThemeColorPalettes, Palette } from './palette.model';
import { IThemeSimpleColors } from './simple-colors.model';

export interface ITheme {
    palettes: IThemeColorPalettes;
    colors: IThemeSimpleColors;
}

export class Theme implements ITheme {
    palettes: IThemeColorPalettes;
    colors: IThemeSimpleColors;

    constructor({ palettes, colors }: ITheme) {
        this.palettes = palettes;
        this.colors = colors;
    }

    getColorPalette(paletteName: PaletteName): Palette {
        if (!this.palettes[paletteName]) {
            throw new Error(`Palette with name '${paletteName}' doesn't exist.`);
        }

        return this.palettes[paletteName];
    }

    getColorShade(colorName: PaletteName, shade: ColorShadeName = 500): string {
        return this.getColorPalette(colorName).getColorShade(shade);
    }
}
