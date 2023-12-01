import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxThemeService } from './ngx-theme.service';
import { ColorConfig, IColorConfig } from './models/color-config.model';
import { DEFAULT_OPTIONS } from './data/default-options.data';
import { COLOR_CONFIG, THEME_OPTIONS } from './tokens';

export type Frameworks = 'tailwind' | 'material';

export type ModuleOptions = { frameworks: Frameworks[] };

function initTheme(themeService: NgxThemeService<ColorConfig>) {
    return () => {
        return themeService.updateColors();
    };
}

@NgModule({
    providers: [
        NgxThemeService,
        {
            provide: APP_INITIALIZER,
            useFactory: initTheme,
            deps: [NgxThemeService],
            multi: true,
        },
    ],
    imports: [CommonModule],
})
export class NgxThemeModule {
    static forRoot<T extends IColorConfig>(
        colorConfig: Partial<T>,
        options: Partial<ModuleOptions> = DEFAULT_OPTIONS,
    ): ModuleWithProviders<NgxThemeModule> {
        return {
            ngModule: NgxThemeModule,
            providers: [
                { provide: COLOR_CONFIG, useValue: colorConfig },
                { provide: THEME_OPTIONS, useValue: options },
            ],
        };
    }
}
