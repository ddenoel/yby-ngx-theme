import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgPipesModule } from 'ngx-pipes';
import { NgxThemeModule } from 'ngx-theme';

import { AppComponent } from './app.component';
import { COLORS } from './colors.data';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        NgxThemeModule.forRoot({ palettes: COLORS }),
        NgPipesModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
