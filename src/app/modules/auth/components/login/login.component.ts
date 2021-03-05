import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { User } from '@models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  dataLoading: boolean = false;
  unregistered: boolean = false;
  invalid: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.logout();
    this.loginForm = this.fb.group({
      username: [ '', [Validators.required, Validators.minLength(3)]],
      password: [ '', [Validators.required, Validators.minLength(6)]]
    })
  }
  loginUser() {
    if (this.loginForm.invalid) { return }
    //Faltaría encriptar el password => por lo pronto en base64
    this.authService.login(this.loginForm.value.username, btoa(this.loginForm.value.password)).subscribe( (user: User) => {
      this.router.navigate(['/principal/ships'])
    }, error => {
      console.log(error);
      this.unregistered = true;
    })
  }
}

