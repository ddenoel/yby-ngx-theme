import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';
import { DEFAULT_OPTIONS } from './data/default-options.data';
import { ColorConfig, IColorConfig } from './models/color-config.model';
import { ColorShades } from './models/color-shade.model';
import { IThemeColorPalettes, PaletteName, Palette } from './models/palette.model';
import { SimpleColorsName, IThemeSimpleColors } from './models/simple-colors.model';
import { Theme } from './models/theme.model';
import { ModuleOptions } from './ngx-theme.module';
import { ColorUtils } from './utils/color-utils';

@Injectable({
    providedIn: 'root',
})
export class NgxThemeService<T extends IColorConfig = IColorConfig> {
    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
        @Inject('COLOR_CONFIG')
        @Optional()
        colorConfig?: T,
        @Inject('THEME_OPTIONS')
        @Optional()
        options: Partial<ModuleOptions> = DEFAULT_OPTIONS,
    ) {
        this.setOptions(options);
        if (colorConfig) {
            this.setColorConfig(colorConfig);
        }
    }
    private colorConfig: ColorConfig;
    private _theme: Theme;
    private _options: ModuleOptions;

    get theme(): Theme {
        return this._theme;
    }

    private setColorConfig(colorConfig?: Partial<T>): void {
        if (!colorConfig?.palettes && !colorConfig?.simpleColors) {
            console.warn('No colors provided. No Palette or variables will be generated.');

            return;
        }

        const palettes = {
            ...(this.colorConfig?.palettes || {}),
            ...(colorConfig?.palettes || {}),
        };
        const simpleColors = {
            ...(this.colorConfig?.simpleColors || {}),
            ...(colorConfig?.simpleColors || {}),
        };
        this.colorConfig = new ColorConfig({ palettes, simpleColors });
    }

    private setOptions(options: Partial<ModuleOptions>): void {
        this._options = { ...DEFAULT_OPTIONS, ...options };
    }

    updateColors(colorConfig?: Partial<T>): void {
        if (colorConfig) {
            this.setColorConfig(colorConfig);
        }
        if (!this.colorConfig) {
            return;
        }
        this.computeTheme();
        this.setCssColorVariables();
    }

    private computeTheme(): void {
        const palettes: IThemeColorPalettes = {} as IThemeColorPalettes;
        const colors: IThemeSimpleColors = {} as IThemeSimpleColors;

        Object.entries(this.colorConfig.simpleColors).forEach(([name, hexa]) => {
            colors[name as SimpleColorsName] = hexa;
        });

        Object.entries(this.colorConfig.palettes).forEach(([name, hexa]) => {
            palettes[name as PaletteName] = new Palette(hexa);
        });

        this._theme = new Theme({ palettes, colors });
    }

    private setCssColorVariables(): void {
        if (this.theme.palettes) {
            Object.entries<ColorShades>(this.theme.palettes).forEach(([colorName, shades]) => {
                Object.entries<string>(shades).forEach(([shadeName, hexaValue]) => {
                    this.setCssColorVariablesForShade(colorName, hexaValue, shadeName);
                });
            });
        }

        Object.entries(this.theme.colors).forEach(([colorName, hexaValue]: [string, string]) => {
            this.setCssColorVariablesForShade(colorName, hexaValue);
        });
    }

    private setCssColorVariablesForShade(
        colorName: string,
        hexaValue: string,
        shadeName?: string,
    ): void {
        const cssVariables: Record<string, string> = {};
        const addSpaceRgb = this._options.frameworks.includes('tailwind');
        const addContrast = this._options.frameworks.includes('material');
        const prefix = `--color-${colorName}`;

        if (!shadeName) {
            cssVariables[prefix] = hexaValue;
        }
        if (addSpaceRgb) {
            cssVariables[`${prefix}-rgb`] = ColorUtils.fromHexToSpaceSeparatedRgb(hexaValue);
        }
        if (shadeName) {
            if (shadeName === '500') cssVariables[prefix] = hexaValue;
            cssVariables[`${prefix}-${shadeName}`] = hexaValue;
        }
        if (shadeName && addSpaceRgb) {
            cssVariables[`${prefix}-${shadeName}-rgb`] =
                ColorUtils.fromHexToSpaceSeparatedRgb(hexaValue);
        }
        if (shadeName && addContrast) {
            cssVariables[`${prefix}-${shadeName}-contrast`] = ColorUtils.getContrast(hexaValue);
        }

        Object.entries<string>(cssVariables).forEach(([key, value]) => {
            this.document.documentElement.style.setProperty(key, value);
        });
    }
}
