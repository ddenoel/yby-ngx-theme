import { Component } from '@angular/core';
import { NgxThemeService } from 'ngx-theme';
import { COLORS } from './colors.data';
import { PaletteColors } from './colors.model';

@Component({
    selector: 'ngx-theme-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'ngx-theme-demo';
    colors: Record<string, string> = COLORS;

    constructor(public themeService: NgxThemeService<{ palettes: PaletteColors }>) {}

    reloadTheme(): void {
        this.themeService.initTheme({
            palettes: this.colors as PaletteColors,
        });
    }
}
