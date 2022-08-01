const colorShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function getSimpleColors(simpleColorNames) {
    const colors = {};
    if (!simpleColorNames?.length) {
        return {};
    }
    simpleColorNames.forEach((name) => {
        colors[name] = getBaseColor(name);
    });

    return colors;
}

function getPalette(palettesNames) {
    if (!palettesNames?.length) {
        return {};
    }
    const palette = {};
    palettesNames.forEach((name) => {
        palette[name] = getColorShades(name);
    });

    return palette;
}

function getBaseColor(colorName) {
    return `rgb(var(--color-${colorName}-rgb) / <alpha-value>)`;
}

function getColorShades(colorName) {
    const shades = {};
    colorShades.forEach(shadeName => {
        shades[shadeName] = `rgb(var(--color-${colorName}-${shadeName}-rgb) / <alpha-value>)`;
    });
    shades['DEFAULT'] = getBaseColor(colorName);

    return shades;
}

/**
 * 
 * @param {string[]} colorNames 
 * 
 * ```js
 * // tailwind.config.js
 * module.exports = {
 *   // ...
 *   presets: [getTailwindThemePreset({
 *     palettes: ['primary', 'accent'],
 *     simpleColors: ['background']
 *   })],
 * };
 * ```
 */
function getTailwindThemePreset(colorNames) {
    return {
        theme: {
            colors: {
                white: '#fff',
                black: '#000000',
                transparent: 'transparent',
                ...getPalette(colorNames?.palettes),
                ...getSimpleColors(colorNames?.simpleColors),
            },
        },
        corePlugins: {
            preflight: false,
        },
    }
}

module.exports = getTailwindThemePreset;
