import { IColorConfig } from '@brumeilde/ngx-theme';
import { PaletteColors } from './colors.model';

export const COLOR_PALETTES: PaletteColors = {
    primary: {
        baseColor: '#3a8ba4',
        contrast: {
            dark: '#36454f',
            light: '#E6EEF7',
        },
    },
    accent: '#d87ba8',
    warn: '#a6368e',
    custom: '#11a876',
};

export const COLORS: IColorConfig<PaletteColors> = {
    palettes: COLOR_PALETTES,
    simpleColors: {
        background: '#F3F2F2',
    },
};
