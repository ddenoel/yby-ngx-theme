import { Component } from '@angular/core';
import { IColorConfig, NgxThemeService } from '@brumeilde/ngx-theme';
import { COLOR_PALETTES } from './colors.data';
import { PaletteColors } from './colors.model';

@Component({
    selector: 'ngx-theme-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'ngx-theme-demo';
    colorPalettes = COLOR_PALETTES;
    readonly PALETTE_NAMES = Object.keys(COLOR_PALETTES);
    colorInputs: Record<string, string> = {
        primary: this.colorPalettes.primary.baseColor,
        primaryDark: this.colorPalettes.primary.contrast.dark,
        primaryLight: this.colorPalettes.primary.contrast.light,
        accent: this.colorPalettes.accent,
        warn: this.colorPalettes.warn,
        custom: this.colorPalettes.custom,
    };

    constructor(public themeService: NgxThemeService<IColorConfig<PaletteColors>>) {}

    reloadTheme(): void {
        const { primary, primaryDark, primaryLight, ...rest } = this.colorInputs;
        this.themeService.updateColors({
            palettes: {
                ...rest,
                primary: {
                    baseColor: primary || COLOR_PALETTES.primary.baseColor,
                    contrast: {
                        ...COLOR_PALETTES.primary.contrast,
                        dark: primaryDark,
                        light: primaryLight,
                    },
                },
            } as PaletteColors,
        });
    }

    showContrast(paletteName: string) {
        return typeof this.colorPalettes[paletteName as keyof PaletteColors] !== 'string';
    }
}
