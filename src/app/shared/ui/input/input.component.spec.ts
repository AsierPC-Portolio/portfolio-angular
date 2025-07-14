import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('InputComponent', () => {
  it('should call default onTouched without error', () => {
    expect(() => component.onTouched()).not.toThrow();
  });
  it('should call default onChange without error', () => {
    expect(() => component.onChange('test')).not.toThrow();
  });
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        InputComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useValue: { getTranslation: () => of({}) } },
        }),
      ],
      providers: [TranslateService, TranslateStore],
    }).compileComponents();
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render label if provided', () => {
    component.label = 'Nombre';
    component.id = 'nombre';
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('label');
    expect(label).toBeTruthy();
    expect(label.textContent).toContain('Nombre');
    expect(label.getAttribute('for')).toBe('nombre');
  });

  it('should render input with placeholder and type', () => {
    component.placeholder = 'Introduce tu nombre';
    component.type = 'email';
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    expect(input).toBeTruthy();
    expect(input.getAttribute('placeholder')).toBe('Introduce tu nombre');
    expect(input.getAttribute('type')).toBe('email');
  });

  it('should render error message if error is set', () => {
    component.error = 'Campo obligatorio';
    fixture.detectChanges();
    const error = fixture.nativeElement.querySelector('.text-red-600');
    expect(error).toBeTruthy();
    expect(error.textContent).toContain('Campo obligatorio');
  });

  it('should call onChange when input value changes', () => {
    const spy = spyOn(component, 'onChange');
    const input = fixture.nativeElement.querySelector('input');
    input.value = 'nuevo valor';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should call onTouched when input is blurred', () => {
    const spy = spyOn(component, 'onTouched');
    const input = fixture.nativeElement.querySelector('input');
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should update value with writeValue', () => {
    component.writeValue('abc');
    fixture.detectChanges();
    expect(component.value).toBe('abc');
  });

  it('should register onChange and onTouched', () => {
    const fn = () => {};
    component.registerOnChange(fn);
    component.registerOnTouched(fn);
    expect(component.onChange).toBe(fn);
    expect(component.onTouched).toBe(fn);
  });

  it('should set disabled state', () => {
    component.setDisabledState(true);
    expect(component.disabled).toBeTrue();
    component.setDisabledState(false);
    expect(component.disabled).toBeFalse();
  });
});
