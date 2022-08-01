# ngx-theme

<h2 style="color: red;">⚠️🚧 This library is still a work in progress<h2>

---

## Table of content

-   [Purpose](#purpose)
-   [Requirements](#requirements)
-   [Supported frameworks](#supported-ui-frameworks)
-   [Principle](#principle)
-   [Installation](#installation)
-   [How to use](#use)

## Purpose

This purpose of this lib is to manage dynamic themes accross Angular apps.

## Requirements

-   Angular 12 or higher

## Supported UI frameworks

-   ✅ Tailwind
-   ✅ Angular Material > 12.0.0

## Principle

This library generates a palette with darker / lighter variants for each provided color based on the [Material Design color system](https://material.io/design/color/the-color-system.html#color-theme-creation)

Example of a palette format:

<table>
<tr>
<td>

```js
const primaryPalette: Palette = {
    50: '#FFEBEE',
    100: '#FFCDD2',
    200: '#EF9A9A',
    300: '#E57373',
    400: '#EF5350',
    500: '#F44336',
    600: '#E53935',
    700: '#D32F2F',
    800: '#C62828',
    900: '#B71C1C',
    contrast: {
        50: '#000000',
        100: '#000000',
        200: '#000000',
        300: '#000000',
        400: '#ffffff',
        500: '#ffffff',
        600: '#ffffff',
        700: '#ffffff',
        800: '#ffffff',
        900: '#ffffff',
    },
};
```

</td>
<td>
<img src="https://blog.thoughtram.io/static/a773102a03b9511ee27b537717545666/f948d/material-design-red-palette.png" />
</td>
</tr>
</table>

All these color shades are then inserted in the document as CSS variables and then used by Material and/or Tailwind to define their own theming which will be used by frontends (thanks to the presets).

## Installation

```sh
yarn add @yby/ngx-theme
```

## Use

#### With `NgxThemeModule` (with or without config) :

```js
@NgModule({
    ...
    imports: [
        NgxThemeModule.forRoot({
                palettes: { myPaletteName: '#5876d9' },
                simpleColors: { myColorName: '#2e959a' }
        }, {
                frameworks: ['tailwind'] // default : ['tailwind', 'material']
        }),
    ],
    ...
})
export class AppModule {}
```

> ℹ️ _`NgxThemeModule` will generate color palettes on app initialization so the theme is created before app inits._

#### With `NgxThemeService` (with or without config):

```js
type Colors = { myPaletteName: string };

export class AppComponent {
    constructor(
        private themeService: NgxThemeService<{ palettes: Colors }>) {}

    onSomethingHappens(): void {
        this.themeService.initTheme({ palettes: { myPaletteName: '#5876d9' }});
    }
}

```

#### Add tailwind preset

```js
// tailwind.config.js

const ngThemePreset = tailwindPreset({
    palettes: ['myPaletteName'],
    simpleColors: ['myColorName'],
});

module.exports = {
    // ...
    presets: [ngThemePreset],
};
```

You can then use tailwind class with your color names:

```html
<div class="bg-myColorName">
    <p class="text-myPaletteName-400/75">Theme</p>
</div>
```

#### Add material theme

```json
// angular.json
   "styles" : [
     "node_modules/ngx-theme/presets/material/*.scss"
   ],
```

```css
/* styles.scss */
@use '@angular/material' as mat;
@use 'generate-material-palette' as palette;

$primary-palette: palette.createpalette('myPaletteName');
$accent-palette: palette.createpalette('myOtherPaletteName');
$warn-palette: palette.createpalette('myThirdPaletteName');

$material-primary-palette: mat.define-palette($primary-palette);
$material-accent-palette: mat.define-palette($accent-palette);
$material-warn-palette: mat.define-palette($warn-palette);

$my-theme: mat.define-light-theme(
    (
        color: (
            primary: $material-primary-palette,
            accent: $material-accent-palette,
            warn: $material-warn-palette
        )
    )
);

@include mat.core();

@include mat.all-component-themes($my-theme);
```
