import { IColorConfig } from '../models/color-config.model';

export const BASE_COLORS: { [key in 'white' | 'black']: string } = {
    white: '#ffffff',
    black: '#000000',
};

export const DEFAULT_COLOR_CONFIG: IColorConfig = {
    palettes: {
        primary: '#2F8F9D',
        accent: '#B5EA7F',
        warn: '#FF8D3E',
    },
    simpleColors: {
        text: '#363F4B',
    },
};
