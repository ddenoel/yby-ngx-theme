import tinycolor from 'tinycolor2';
import { BASE_COLORS } from '../data/base-colors.data';

export class ColorUtils {
    static isColorValidHexa(color: string): boolean {
        return /^#[0-9a-f]{3,6}$/i.test(color);
    }

    static mixAndGetColorHex(hex: string, mixColorHex?: string, amount?: number): string {
        if (!mixColorHex || !amount) {
            return hex;
        }
        const color = tinycolor(hex);
        const mixColor = tinycolor(mixColorHex);

        return tinycolor.mix(color, mixColor, amount).toHexString();
    }

    static getContrast(hex: string, dark = BASE_COLORS.black, light = BASE_COLORS.white): string {
        const color = tinycolor(hex);
        if (color.isLight()) {
            return dark;
        }

        return light;
    }

    static fromHexToSpaceSeparatedRgb(hexa: string): string {
        const rgb = tinycolor(hexa).toRgb();
        delete rgb.a;

        return Object.values(rgb).join(' ');
    }

    static get randomColor(): string {
        return tinycolor.random().toHexString();
    }
}
