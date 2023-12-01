const tailwindPreset = require('@brumeilde/ngx-theme/tailwind-preset');
// const tailwindPreset = require('/projects/ngx-theme/tailwind-preset');
const { join } = require('path');

const preset = tailwindPreset({ palettes: ['primary', 'accent', 'custom1', 'custom2', 'custom3'] });

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
  ],
  safelist: [
    {
        pattern: /(bg|text|border)-(primary|accent|custom1|custom2|custom3)-*/,
        variants: ['hover'],
    },
  ],
  plugins: [],
  presets: [ preset ]
}


