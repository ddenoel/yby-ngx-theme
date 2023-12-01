import { ColorUtils } from '../utils/color-utils';

/**
 * - Palettes: will generate a range of colors shades
 * - simpleColors: will remain single color
 *
 * #### Simple colors
 * Each key must be of type `{ 'colorName': 'hexaValue' }`
 *
 * #### Palettes
 * Each key must be of type either :
 * - `{ 'colorName': { baseColor: 'hexaValue', contrast?: { light?: 'hexaValue', dark?: 'hexaValue' } } }`
 * - `{ 'colorName': 'hexaValue' }` (like simple colors)
 */
export type IColorConfig<
    Palettes extends IPalettesConfig = IPalettesConfig,
    SimpleColors extends ISimpleColorsConfig = ISimpleColorsConfig,
> = {
    palettes?: Palettes;
    simpleColors?: SimpleColors;
};

type ISimpleColorsConfig = Record<string, string>;

type IPalettesConfig = Record<string, IColorInput>;

export type IColorInput = string | IDetailedColorInput;

export type IDetailedColorInput = {
    baseColor: string;
    contrast?: { light?: string; dark?: string };
};

export class ColorConfig<
    Palettes extends IPalettesConfig = IPalettesConfig,
    SimpleColors extends Record<string, string> = Record<string, string>,
> implements IColorConfig<Palettes, SimpleColors>
{
    palettes: Palettes = {} as Palettes;
    simpleColors: SimpleColors = {} as SimpleColors;

    constructor(colorConfig: Partial<IColorConfig>) {
        const verifyColor = (hexa: string) => {
            if (!hexa || !ColorUtils.isColorValidHexa(hexa)) {
                console.error(`Color with hexa value "${hexa}" is not valid, it will be ignored.`);

                return false;
            }

            return true;
        };
        const setColor = <T extends IColorInput>(
            [colorName, hexa]: [string, T],
            destinationColor: IPalettesConfig,
        ) => {
            let isValid = false;
            let finalValue: T;
            if (typeof hexa === 'string') {
                isValid = verifyColor(hexa);
                if (isValid) {
                    finalValue = hexa;
                }
            } else {
                const colorInput: IDetailedColorInput = {} as IDetailedColorInput;
                if (verifyColor(hexa.baseColor)) {
                    isValid = true;
                    colorInput.baseColor = hexa.baseColor;

                    if (verifyColor(hexa.contrast?.light)) {
                        colorInput.contrast = colorInput.contrast || {};
                        colorInput.contrast.light = hexa.contrast.light;
                    }

                    if (verifyColor(hexa.contrast?.light)) {
                        colorInput.contrast = colorInput.contrast || {};
                        colorInput.contrast.light = hexa.contrast.light;
                    }

                    finalValue = colorInput as T;
                }
            }
            if (!isValid || !finalValue) {
                return;
            }
            if (!destinationColor || !colorName) {
                return;
            }
            destinationColor[colorName] = hexa;
        };

        if (colorConfig?.palettes) {
            Object.entries(colorConfig.palettes).forEach(([colorName, value]) => {
                setColor([colorName, value], this.palettes);
            });
        }

        if (colorConfig?.simpleColors) {
            Object.entries(colorConfig.simpleColors).forEach((colorEntry) =>
                setColor(colorEntry, this.simpleColors),
            );
        }
    }
}
