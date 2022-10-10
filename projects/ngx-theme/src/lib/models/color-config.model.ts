import { ColorUtils } from '../utils/color-utils';

/**
 * - Palettes: will generate a range of colors shades
 * - simpleColors: will remain single color
 *
 * Each key must be of type `{ 'colorName': 'hexaValue' }`
 */
export type IColorConfig<
    Palettes extends Record<string, string> = Record<string, string>,
    SimpleColors extends Record<string, string> = Record<string, string>,
> = {
    palettes?: Palettes;
    simpleColors?: SimpleColors;
};

export class ColorConfig<
    Palettes extends Record<string, string> = Record<string, string>,
    SimpleColors extends Record<string, string> = Record<string, string>,
> implements IColorConfig<Palettes, SimpleColors>
{
    palettes: Palettes = {} as Palettes;
    simpleColors: SimpleColors = {} as SimpleColors;

    constructor(colorConfig: Partial<IColorConfig>) {
        const setColor = (
            [colorName, hexa]: [string, string],
            destinationColor: Record<string, string>,
        ) => {
            if (!ColorUtils.isColorValidHexa(hexa)) {
                console.error(
                    `Color with name "${colorName}" = ${hexa} is not hexa color, it will be ignored.`,
                );

                return;
            }
            if (!destinationColor || !colorName) {
                return;
            }
            destinationColor[colorName] = hexa;
        };
        if (colorConfig?.palettes) {
            Object.entries(colorConfig.palettes).forEach((colorEntry) =>
                setColor(colorEntry, this.palettes),
            );
        }

        if (colorConfig?.simpleColors) {
            Object.entries(colorConfig.simpleColors).forEach((colorEntry) =>
                setColor(colorEntry, this.simpleColors),
            );
        }
    }
}
