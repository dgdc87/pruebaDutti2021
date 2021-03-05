import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { User } from '@models/user.model';
import { isError } from 'util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  dataLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      first_name: [ '', [Validators.required, Validators.minLength(3)]],
      last_name: [ '', [Validators.required, Validators.minLength(3)]],
      username: [ '', [Validators.required, Validators.minLength(3)]],
      email: [ '', [Validators.required, Validators.minLength(6)]],

    })
  }

  registerUser() {
    if (this.registerForm.invalid) { return }
    let user: User = {
      first_name: this.registerForm.value.first_name,
      email: this.registerForm.value.email,
      username: this.registerForm.value.username,
      last_name: this.registerForm.value.last_name
    };
    this.authService.register(user).subscribe( data => {
      this.router.navigate(['/principal/ships'])
    },error => {
      alert(error);
    })

  }

}
