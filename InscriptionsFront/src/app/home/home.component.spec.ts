import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";
import {Router} from "@angular/router";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [{ provide: Router, useValue: routerSpy }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render banner', () => {
    const bannerImg: HTMLImageElement = fixture.debugElement.query(By.css('.banner')).nativeElement;
    expect(bannerImg.src).toContain('running.jpg');
  });

  it('should display the correct section titles', () => {
    const calendarioTitle = fixture.debugElement.query(By.css('.calendario h2')).nativeElement.textContent;
    const registroTitle = fixture.debugElement.query(By.css('.registro h2')).nativeElement.textContent;
    const soporteTitle = fixture.debugElement.query(By.css('.soporte h2')).nativeElement.textContent;

    expect(calendarioTitle).toContain('Calendario');
    expect(registroTitle).toContain('Registro');
    expect(soporteTitle).toContain('Soporte');
  });

  it('should navigate to volunteer-form when volunteer button is clicked', () => {
    const volunteerButton: DebugElement = fixture.debugElement.query(By.css('.opcion .btn-registro'));
    volunteerButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/volunteer-form']);
  });

  it('should navigate to athlete-form when athlete button is clicked', () => {
    const athleteButton: DebugElement = fixture.debugElement.queryAll(By.css('.opcion .btn-registro'))[1];
    athleteButton.triggerEventHandler('click', null);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/athlete-form']);
  });

  it('should navigate to calendario when Ver más button is clicked', () => {
    const verMasButton: DebugElement = fixture.debugElement.queryAll(By.css('.calendario .btn-ver-mas'))[1];
    verMasButton.triggerEventHandler('click', null);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/calendario']);
  });

  it('should display the Obtener soporte button in soporte section', () => {
    const soporteButton: DebugElement = fixture.debugElement.queryAll(By.css('.soporte .btn-soporte'))[1];
    soporteButton.triggerEventHandler('click', null);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/soporte']);
  });
});
