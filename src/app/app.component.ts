import { Component } from '@angular/core';
import { IColorConfig, NgxThemeService } from '@brumeilde/ngx-theme';
import { COLORS } from './colors.data';
import { COLOR_NAMES, PaletteColors } from './colors.model';

@Component({
    selector: 'ngx-theme-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'ngx-theme-demo';
    colors: Record<string, string> = COLORS;
    readonly COLOR_NAMES = COLOR_NAMES;

    constructor(
        public themeService: NgxThemeService<IColorConfig<PaletteColors, Record<string, string>>>,
    ) {}

    reloadTheme(): void {
        this.themeService.updateColors({
            palettes: this.colors as PaletteColors,
        });
    }
}
