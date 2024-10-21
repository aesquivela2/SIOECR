import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { FormComponent } from './form.component';  // Adjust the path if necessary
import { FormService } from './form.service';  // Adjust the path if necessary
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {DebugElement} from "@angular/core"; // Use provideHttpClient

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormComponent, FormsModule],  // Remove HttpClientModule
      providers: [
        FormService,
        provideHttpClient(withInterceptorsFromDi())  // Replace HttpClientModule with provideHttpClient
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display an error when the identification type is not selected', () => {
    const idTypeSelect = fixture.debugElement.query(By.css('select[name="idType"]'));
    const ngModel = idTypeSelect.references['idType'];

    // Simula que el usuario no ha seleccionado nada
    ngModel.control.markAsTouched();
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(By.css('small.error'));
    expect(errorMessage.nativeElement.textContent).toContain('El tipo de identificación es requerido.');
  });

  it('should display an error message when identification field is empty and touched', () => {
    // Get the identification input and set it to empty
    const identificationInput = fixture.debugElement.query(By.css('input[name="identification"]'));
    const ngModel = identificationInput.references['identification'];

    // Mark the field as touched to simulate user interaction
    ngModel.control.markAsTouched();
    fixture.detectChanges();

    // Check if the error message is shown
    const errorMessage = fixture.debugElement.query(By.css('small.error'));
    expect(errorMessage.nativeElement.textContent).toContain('La identificación es requerida');
  });

  it('should display an error when the identification has an invalid format', () => {
    const identificationInput = fixture.debugElement.query(By.css('input[name="identification"]'));
    const ngModel = identificationInput.references['identification'];

    // Set an invalid value and mark the field as touched
    ngModel.control.setValue('1234');
    ngModel.control.markAsTouched();
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(By.css('small.error'));
    expect(errorMessage.nativeElement.textContent).toContain('Formato de identificación incorrecto');
  });

  it('should display a required error when the phone number is empty', () => {
    const phoneNumberInput = fixture.debugElement.query(By.css('input[name="phone_number"]'));
    const ngModel = phoneNumberInput.references['phone_number'];

    // Set the value to empty and mark as touched
    ngModel.control.setValue('');
    ngModel.control.markAsTouched();
    fixture.detectChanges();  // Trigger change detection

    // Query the error message element specific to phone_number
    const errorMessage = fixture.debugElement.query(By.css('div small.error'));

    // Ensure the error message exists and contains the correct text
    if (errorMessage) {
      expect(errorMessage.nativeElement.textContent).toContain('El número de teléfono es requerido.');
    } else {
      fail('Required error message for phone number not found.');
    }
  });

  it('should display an error when the phone number format is incorrect', () => {
    const phoneNumberInput = fixture.debugElement.query(By.css('input[name="phone_number"]'));
    const ngModel = phoneNumberInput.references['phone_number'];

    // Set an invalid phone number
    ngModel.control.setValue('1234');
    ngModel.control.markAsTouched();
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(By.css('div small.error'));

    // Ensure the error message exists and contains the correct text
    if (errorMessage) {
      expect(errorMessage.nativeElement.textContent).toContain('El número de teléfono es requerido.');
    } else {
      fail('Required error message for phone number not found.');
    }
  });

  it('debería marcar la nacionalidad como inválida si no se selecciona una opción', () => {
    const citizenshipElement = fixture.debugElement.query(By.css('select[name="citizenship"]'));

    // Simulamos que no se selecciona ninguna opción
    component.registration.citizenship = '';
    fixture.detectChanges(); // Aplicamos el cambio al DOM

    // Simulamos el evento 'change'
    citizenshipElement.nativeElement.value = ''; // Asignamos un valor vacío
    citizenshipElement.nativeElement.dispatchEvent(new Event('change')); // Disparamos el evento
    fixture.detectChanges(); // Actualizamos el DOM

    // Accedemos al control ngModel del formulario
    const citizenshipControl = component.registrationForm.form.controls['citizenship'];

    // Verificamos que el campo es inválido
    expect(citizenshipControl.invalid).toBeTruthy();
  });

  it('debería marcar la nacionalidad como válida si se selecciona una opción válida', () => {
    // Accedemos al select de la nacionalidad
    const citizenshipElement = fixture.debugElement.query(By.css('select[name="citizenship"]'));

    // Simulamos que se selecciona una opción válida
    component.registration.citizenship = 'nacional';
    fixture.detectChanges(); // Aplicamos el cambio en el DOM

    // Disparamos el evento 'change' para simular la interacción del usuario
    citizenshipElement.nativeElement.value = 'nacional';
    citizenshipElement.nativeElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    // Aseguramos que el formulario está definido y accesible
    expect(component.registrationForm).toBeDefined();

    // Obtenemos el control de la nacionalidad desde el FormGroup
    const citizenshipControl = component.registrationForm.form.controls['citizenship'];

    // Verificamos que el campo es válido
    expect(citizenshipControl.valid).toBeTruthy();
  });

});
