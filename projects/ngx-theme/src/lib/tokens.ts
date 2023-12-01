import { InjectionToken } from '@angular/core';
import { IColorConfig } from './models/color-config.model';
import { ModuleOptions } from './ngx-theme.module';

export const COLOR_CONFIG = new InjectionToken<IColorConfig>('COLOR_CONFIG');
export const THEME_OPTIONS = new InjectionToken<ModuleOptions>('THEME_OPTIONS');
