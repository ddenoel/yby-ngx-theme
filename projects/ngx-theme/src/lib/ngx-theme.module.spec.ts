import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxThemeModule } from './ngx-theme.module';
import { NgxThemeService } from './ngx-theme.service';

@Component({
    template: '<p>{{ color }}</p>',
})
export class TestingComponent {
    constructor(private themeService: NgxThemeService) {}

    get color(): string {
        return this.themeService.theme?.getColorShade('testColor');
    }

    setColor(color: string): void {
        this.themeService.updateColors({ palettes: { testColor: color } });
    }
}

describe('ThemeModule', () => {
    let component: TestingComponent;
    let fixture: ComponentFixture<TestingComponent>;

    const init = () => {
        fixture = TestBed.createComponent(TestingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    };

    it('should set colors from root module', async () => {
        const colorConfig = { palettes: { testColor: '#c769c1' } };
        await TestBed.configureTestingModule({
            declarations: [TestingComponent],
            imports: [NgxThemeModule.forRoot(colorConfig)],
        }).compileComponents();
        init();
        expect(component.color).toEqual(colorConfig.palettes.testColor);
    });

    it('should set colors from token', async () => {
        const colorConfig = { palettes: { testColor: '#f235d9' } };
        await TestBed.configureTestingModule({
            declarations: [TestingComponent],
            imports: [NgxThemeModule],
            providers: [{ provide: 'COLOR_CONFIG', useValue: colorConfig }],
        }).compileComponents();
        init();

        expect(component.color).toEqual(colorConfig.palettes.testColor);
    });

    it('should set colors from service', async () => {
        const colorConfig = { palettes: { testColor: '#f3e94d' } };
        await TestBed.configureTestingModule({
            declarations: [TestingComponent],
            imports: [NgxThemeModule],
        }).compileComponents();
        init();
        fixture.detectChanges();
        component.setColor(colorConfig.palettes.testColor);
        fixture.detectChanges();

        expect(component.color).toEqual(colorConfig.palettes.testColor);
    });
});
