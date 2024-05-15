import { Component } from '@angular/core';
import { AuthInputComponent } from '../../components/auth-input/auth-input.component';
import { LoginLayoutComponent } from '../../components/login-layout/login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../../../../services/signup.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private router: Router,
    private signupService: SignupService,
    private toastService: ToastrService
  ) {
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

    if(this.signupForm.value.senha !== this.signupForm.value.confirmarSenha) {
      this.toastService.error("As senhas não coincidem. Verifique e tente novamente."); 
      return;
    }

    this.signupService.signup(
      this.signupForm.value.nome,
      this.signupForm.value.email,
      this.signupForm.value.login,
      this.signupForm.value.senha,
      this.signupForm.value.data_nascimento
    ).subscribe({
      next: () => this.toastService.success("Cadastro realizado com sucesso!"),
      error: () => this.toastService.error("Erro ao realizar cadastro! Verifique os dados inseridos e tente novamente.")
    })
  }

  navigate() {
    this.router.navigate(["/login"]);
  }
}
