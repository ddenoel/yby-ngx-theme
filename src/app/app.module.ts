import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgPipesModule } from 'ngx-pipes';
import { NgxThemeModule } from 'ngx-theme';

import { AppComponent } from './app.component';
import { COLORS } from './colors.data';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';
@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        NgxThemeModule.forRoot({ palettes: COLORS, simpleColors: { background: '#F3F2F2' } }),
        NgPipesModule,
        FormsModule,
        BrowserAnimationsModule,
        MatChipsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
