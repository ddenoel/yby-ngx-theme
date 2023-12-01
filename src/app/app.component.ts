import { Component } from '@angular/core';
import { IColorConfig, NgxThemeService } from '@brumeilde/ngx-theme';
// import { IColorConfig, NgxThemeService } from 'ngx-theme';
import { COLORS } from './colors.data';
import { COLOR_NAMES, PaletteColors } from './colors.model';

@Component({
    selector: 'ngx-theme-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'ngx-theme-demo';
    colors = COLORS;
    readonly COLOR_NAMES = [...COLOR_NAMES, 'custom3'];
    colorInputs: Record<string, string> = {
        primary: this.colors.primary,
        accent: this.colors.accent,
        custom1: this.colors.custom1,
        custom2: this.colors.custom2,
        custom3: this.colors.custom3.baseColor,
    };

    constructor(
        public themeService: NgxThemeService<IColorConfig<PaletteColors, Record<string, string>>>,
    ) {}

    reloadTheme(): void {
        const { custom3, ...rest } = this.colorInputs;
        this.themeService.updateColors({
            palettes: {
                ...rest,
                custom3: { ...COLORS.custom3, baseColor: custom3 },
            } as PaletteColors,
        });
    }
}
