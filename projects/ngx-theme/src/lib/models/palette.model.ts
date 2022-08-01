import { BASE_COLORS } from '../data/base-colors.data';
import { ColorUtils } from '../utils/color-utils';
import { ColorShadeName, ColorShades } from './color-shade.model';

export type PaletteName = string;

export type IPalette = ColorShades;
export type IMaterialPalette = Palette & { contrast: ColorShades };
export type IThemeColorPalettes = Record<PaletteName, Palette | MaterialPalette>;

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
    // optional contrast

    constructor(hexaColor: string) {
        this.generatePaletteShades(hexaColor);
    }

    getPalette(): IPalette {
        const { generatePaletteShades, getColorShade, getPalette, ...palette } = this;

        return palette;
    }

    getColorShade(shade: ColorShadeName = 500): string {
        return this[shade];
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
}

export class MaterialPalette extends Palette implements IMaterialPalette {
    contrast: ColorShades = null;

    constructor(hexaColor: string) {
        super(hexaColor);
        this.generateContrastShades();
    }

    private generateContrastShades(): void {
        const constrast: ColorShades = {
            50: ColorUtils.getContrast(this[50]),
            100: ColorUtils.getContrast(this[100]),
            200: ColorUtils.getContrast(this[200]),
            300: ColorUtils.getContrast(this[300]),
            400: ColorUtils.getContrast(this[400]),
            500: ColorUtils.getContrast(this[500]),
            600: ColorUtils.getContrast(this[600]),
            700: ColorUtils.getContrast(this[700]),
            800: ColorUtils.getContrast(this[800]),
            900: ColorUtils.getContrast(this[900]),
        };

        this.contrast = constrast;
    }
}
