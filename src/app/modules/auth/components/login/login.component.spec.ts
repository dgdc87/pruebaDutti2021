import { ComponentFixture, TestBed, waitForAsync , fakeAsync, async} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let el: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[
        HttpClientModule,
        FormsModule,
        RouterTestingModule.withRoutes([]),
        ReactiveFormsModule],


    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have login button disable', ()=>{
    fixture.detectChanges();
    let submitEl = fixture.debugElement.query(By.css('.buttons__login'));
    expect(submitEl.nativeElement.disabled).toBeTruthy();
  })

  it('Login Form should be invalid', async(()=> {
    component.loginForm.controls['username'].setValue('');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.valid).toBeFalsy();
  }));

  it('Login Form should be valid', async(()=> {
    component.loginForm.controls['username'].setValue('prueba');
    component.loginForm.controls['password'].setValue('1234567');
    expect(component.loginForm.valid).toBeTruthy();
  }));


  it('Should have login button enabled', ()=>{
    component.loginForm.controls['username'].setValue('prueba');
    component.loginForm.controls['password'].setValue('1234567');
    fixture.detectChanges();
    let submitEl = fixture.debugElement.query(By.css('.buttons__login'));
    expect(submitEl.nativeElement.disabled).toBeFalsy();
  })
});
