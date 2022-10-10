import { IColorConfig } from '../public-api';
import { SHADES } from './models/color-shade.model';
import { NgxThemeService } from './ngx-theme.service';
import { ColorUtils } from './utils/color-utils';

describe('ThemeService', () => {
    let service: NgxThemeService;
    let fakeDocument: any;

    beforeEach(async () => {
        fakeDocument = {
            properties: {} as Record<string, string>,
            documentElement: {
                style: {
                    setProperty: (key: string, value: string) => {
                        fakeDocument.properties[key] = value;
                    },
                },
            },
        };
        service = new NgxThemeService(fakeDocument as unknown as Document);
    });

    const checkDocumentPropertyEquals = (expectedKey: string, expectedValue: string) => {
        expect(fakeDocument.properties[expectedKey]).toBeTruthy();
        expect(fakeDocument.properties[expectedKey]).toEqual(expectedValue);
    };

    it('should do nothing when no color config is provided', () => {
        const theme: IColorConfig = {
            palettes: null,
            simpleColors: null,
        };
        service.updateColors(theme);
        expect(service.theme).toBeUndefined();
    });

    describe('palettes', () => {
        it('should init palettes when color config is provided', () => {
            const theme: IColorConfig<{ firstColor: string; secondColor: string }> = {
                palettes: {
                    firstColor: '#487371',
                    secondColor: '#32a852',
                },
            };
            service.updateColors(theme);
            const { palettes } = service.theme;

            expect(palettes['firstColor']).toBeTruthy();
            expect(palettes['secondColor']).toBeTruthy();

            expect(palettes['firstColor'][500]).toEqual(theme?.palettes.firstColor);
            expect(palettes['secondColor'][500]).toEqual(theme.palettes.secondColor);

            SHADES.forEach((shade) => {
                expect(palettes['firstColor'][shade]).toBeTruthy();
                expect(ColorUtils.isColorValidHexa(palettes['firstColor'][shade])).toBeTrue();
                checkDocumentPropertyEquals(
                    `--color-firstColor-${shade}`,
                    palettes['firstColor'][shade],
                );
                expect(palettes['secondColor'][shade]).toBeTruthy();
                expect(ColorUtils.isColorValidHexa(palettes['secondColor'][shade])).toBeTrue();
                checkDocumentPropertyEquals(
                    `--color-secondColor-${shade}`,
                    palettes['secondColor'][shade],
                );
            });
        });

        it('should override only one palette color', () => {
            const theme: IColorConfig<{ firstColor: string; secondColor: string }> = {
                palettes: {
                    firstColor: '#487371',
                    secondColor: '#32a852',
                },
            };
            service.updateColors(theme);
            const themeOverride = { palettes: { firstColor: '#ff8b3e' } };
            service.updateColors(themeOverride);
            const { palettes } = service.theme;

            expect(palettes['firstColor'][500]).toEqual(themeOverride.palettes.firstColor);
            expect(palettes['secondColor'][500]).toEqual(theme.palettes.secondColor);

            checkDocumentPropertyEquals(
                '--color-firstColor-500',
                themeOverride.palettes.firstColor,
            );
            checkDocumentPropertyEquals('--color-secondColor-500', theme.palettes.secondColor);
        });
    });

    describe('simple colors', () => {
        it('should init simple colors when color config is provided', () => {
            const theme: IColorConfig<null, { firstColor: string; secondColor: string }> = {
                simpleColors: {
                    firstColor: '#487371',
                    secondColor: '#32a852',
                },
            };
            service.updateColors(theme);
            const { colors, palettes } = service.theme;

            expect(Object.keys(palettes)?.length).toEqual(0);
            expect(colors['firstColor']).toBeTruthy();
            expect(colors['secondColor']).toBeTruthy();

            expect(colors['firstColor']).toEqual(theme.simpleColors.firstColor);
            expect(colors['secondColor']).toEqual(theme.simpleColors.secondColor);

            checkDocumentPropertyEquals(`--color-firstColor`, colors['firstColor']);
            checkDocumentPropertyEquals(`--color-secondColor`, colors['secondColor']);
        });

        it('should override only one palette color', () => {
            const theme: IColorConfig<null, { firstColor: string; secondColor: string }> = {
                simpleColors: {
                    firstColor: '#487371',
                    secondColor: '#32a852',
                },
            };
            service.updateColors(theme);
            const themeOverride = { simpleColors: { firstColor: '#ff8b3e' } };
            service.updateColors(themeOverride);
            const { colors } = service.theme;

            expect(colors['firstColor']).toEqual(themeOverride.simpleColors.firstColor);
            expect(colors['secondColor']).toEqual(theme.simpleColors.secondColor);

            checkDocumentPropertyEquals(
                '--color-firstColor',
                themeOverride.simpleColors.firstColor,
            );
            checkDocumentPropertyEquals('--color-secondColor', theme.simpleColors.secondColor);
        });
    });
});
