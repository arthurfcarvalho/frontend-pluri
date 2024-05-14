import { Component } from '@angular/core';
import { AuthInputComponent } from '../../components/auth-input/auth-input.component';
import { LoginLayoutComponent } from '../../components/login-layout/login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface signupForm {
  nome: FormControl,
  email: FormControl,
  login: FormControl,
  senha: FormControl,
  confirmarSenha: FormControl,
  data_nascimento: FormControl
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    LoginLayoutComponent,
    AuthInputComponent,
    ReactiveFormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  signupForm!: FormGroup <signupForm>;

  constructor() {
    this.signupForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      login: new FormControl('', Validators.required),
      senha: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmarSenha: new FormControl('', [Validators.required, Validators.minLength(6)]),
      data_nascimento: new FormControl('', Validators.required)
    })
  }

  submit() {

  }

  navigate() {
    
  }
}
