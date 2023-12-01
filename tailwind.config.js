const tailwindPreset = require('@brumeilde/ngx-theme/tailwind-preset');

const { join } = require('path');

const preset = tailwindPreset({ palettes: ['primary', 'accent', 'warn', 'custom'] });

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
  ],
  safelist: [
    {
        pattern: /(bg|text|border)-(primary|accent|warn|custom)-*/,
        variants: ['hover'],
    },
  ],
  plugins: [],
  presets: [ preset ]
}


