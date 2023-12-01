import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgPipesModule } from 'ngx-pipes';
import { NgxThemeModule } from '@brumeilde/ngx-theme';
import { AppComponent } from './app.component';
import { COLORS } from './colors.data';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        NgxThemeModule.forRoot(COLORS),
        NgPipesModule,
        FormsModule,
        BrowserAnimationsModule,
        MatChipsModule,
        MatButtonModule,
        MatDividerModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
