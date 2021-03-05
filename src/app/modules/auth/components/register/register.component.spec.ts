
import { ComponentFixture, TestBed, waitForAsync, fakeAsync, async } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterComponent } from './register.component';
import { By } from '@angular/platform-browser';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports:[
        HttpClientModule,
        FormsModule,
        RouterTestingModule.withRoutes([]),
        ReactiveFormsModule],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Should have register button disable', ()=>{
    fixture.detectChanges();
    let submitEl = fixture.debugElement.query(By.css('.buttons__login'));
    expect(submitEl.nativeElement.disabled).toBeTruthy();
  })

  it('Register Form should be invalid', async(()=> {
    component.registerForm.controls['first_name'].setValue('');
    component.registerForm.controls['last_name'].setValue('');
    component.registerForm.controls['username'].setValue('');
    component.registerForm.controls['email'].setValue('');
    expect(component.registerForm.valid).toBeFalsy();
  }));

  it('Register Form should be valid', async(()=> {
    component.registerForm.controls['first_name'].setValue('Prueba');
    component.registerForm.controls['last_name'].setValue('Pruuba');
    component.registerForm.controls['username'].setValue('Prueba');
    component.registerForm.controls['email'].setValue('Prueba');
    expect(component.registerForm.valid).toBeTruthy();
  }));

  it('Should have register button enabled', ()=>{
    component.registerForm.controls['first_name'].setValue('Prueba');
    component.registerForm.controls['last_name'].setValue('Pruuba');
    component.registerForm.controls['username'].setValue('Prueba');
    component.registerForm.controls['email'].setValue('Prueba');
    fixture.detectChanges();
    let submitEl = fixture.debugElement.query(By.css('.buttons__login'));
    expect(submitEl.nativeElement.disabled).toBeFalsy();
  });
});
