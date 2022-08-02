import { ColorUtils } from '../utils/color-utils';

/**
 * ColorConfig type, must be of type `{ 'colorName': 'hexaValue' }`
 */
export type IColorConfig = {
    palettes?: Record<string, string>;
    simpleColors?: Record<string, string>;
};

export class ColorConfig implements IColorConfig {
    palettes: Record<string, string> = {};
    simpleColors: Record<string, string> = {};

    constructor(colorConfig: IColorConfig) {
        const setColor = (
            [colorName, hexa]: [string, string],
            destinationColor: Record<string, string>,
        ) => {
            if (!ColorUtils.isColorValidHexa(hexa)) {
                console.error(
                    `Color with name "${colorName}" = ${hexa} doesn't match hexa color, it will be ignored.`,
                );

                return;
            }
            if (!destinationColor || !colorName) {
                return;
            }
            destinationColor[colorName] = hexa;
        };
        if (colorConfig.palettes) {
            Object.entries(colorConfig.palettes).forEach((colorEntry) =>
                setColor(colorEntry, this.palettes),
            );
        }

        if (colorConfig.simpleColors) {
            Object.entries(colorConfig.simpleColors).forEach((colorEntry) =>
                setColor(colorEntry, this.simpleColors),
            );
        }
    }
}
