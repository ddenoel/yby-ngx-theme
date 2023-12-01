import { BASE_COLORS } from '../data/base-colors.data';
import { ColorUtils } from '../utils/color-utils';
import { IColorInput } from './color-config.model';
import { ColorShadeName, ColorShades, SHADES, isShade } from './color-shade.model';

export type PaletteName = string;

export type IPalette = ColorShades;
export type IMaterialPalette = Palette & { contrast: ColorShades };
export type IThemeColorPalettes = Record<PaletteName, Palette>;

export class Palette implements IPalette {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;

    contrast: ColorShades = null;

    constructor(input: IColorInput) {
        let baseColor = '';
        let contrast;
        if (typeof input === 'string') {
            baseColor = input;
        } else {
            baseColor = input.baseColor;
            contrast = input.contrast;
        }
        this.generatePaletteShades(baseColor);
        this.generateContrastShades(contrast?.dark, contrast?.light);
    }

    getPalette(): IPalette {
        const { generatePaletteShades, getColorShade, getPalette, ...palette } = this;

        return palette;
    }

    getColorShade(shade: ColorShadeName = 500): string {
        return this[shade];
    }

    getContrast(shade: ColorShadeName | string = 500): string {
        if (!this.contrast) {
            return null;
        }
        if (!isShade(shade)) {
            throw new Error(
                `Shade ${shade} doesn't exist. Please use one of the following: ${[...SHADES].join(
                    ', ',
                )}`,
            );
        }

        return this.contrast[+shade as ColorShadeName];
    }

    private generatePaletteShades(hexaColor: string): void {
        if (!ColorUtils.isColorValidHexa(hexaColor)) {
            throw new Error(
                `Color ${hexaColor} is not valid hexa format. How the hell did you manage that?`,
            );
        }
        const palette: IPalette = {
            50: ColorUtils.mixAndGetColorHex(hexaColor, BASE_COLORS.white, 95),
            100: ColorUtils.mixAndGetColorHex(hexaColor, BASE_COLORS.white, 88),
            200: ColorUtils.mixAndGetColorHex(hexaColor, BASE_COLORS.white, 55),
            300: ColorUtils.mixAndGetColorHex(hexaColor, BASE_COLORS.white, 30),
            400: ColorUtils.mixAndGetColorHex(hexaColor, BASE_COLORS.white, 20),
            500: ColorUtils.mixAndGetColorHex(hexaColor),
            600: ColorUtils.mixAndGetColorHex(hexaColor, BASE_COLORS.black, 13),
            700: ColorUtils.mixAndGetColorHex(hexaColor, BASE_COLORS.black, 30),
            800: ColorUtils.mixAndGetColorHex(hexaColor, BASE_COLORS.black, 46),
            900: ColorUtils.mixAndGetColorHex(hexaColor, BASE_COLORS.black, 75),
        };
        Object.assign(this, palette);
    }

    private generateContrastShades(darkContrast?: string, lightContrast?: string): void {
        let dark = BASE_COLORS.black;
        if (darkContrast && ColorUtils.isColorValidHexa(darkContrast)) {
            dark = darkContrast;
        }
        let light = BASE_COLORS.white;
        if (lightContrast && ColorUtils.isColorValidHexa(lightContrast)) {
            light = lightContrast;
        }

        const constrast: ColorShades = {
            50: ColorUtils.getContrast(this[50], dark, light),
            100: ColorUtils.getContrast(this[100], dark, light),
            200: ColorUtils.getContrast(this[200], dark, light),
            300: ColorUtils.getContrast(this[300], dark, light),
            400: ColorUtils.getContrast(this[400], dark, light),
            500: ColorUtils.getContrast(this[500], dark, light),
            600: ColorUtils.getContrast(this[600], dark, light),
            700: ColorUtils.getContrast(this[700], dark, light),
            800: ColorUtils.getContrast(this[800], dark, light),
            900: ColorUtils.getContrast(this[900], dark, light),
        };

        this.contrast = constrast;
    }
}
