import { Component } from '@angular/core';
import { LoginLayoutComponent } from '../../components/login-layout/login-layout.component';
import { AuthInputComponent } from '../../components/auth-input/auth-input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface loginForm {
  login: FormControl,
  senha: FormControl
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    LoginLayoutComponent,
    AuthInputComponent,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  loginForm!: FormGroup;

  constructor() {
    this.loginForm = new FormGroup({
      login: new FormControl('', Validators.required),
      senha: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  submit() {

  }

  navigate() {
    
  }
}
