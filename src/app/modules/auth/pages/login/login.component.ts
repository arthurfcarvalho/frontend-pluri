import { Component } from '@angular/core';
import { LoginLayoutComponent } from '../../components/login-layout/login-layout.component';
import { AuthInputComponent } from '../../components/auth-input/auth-input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../../services/login.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ) {
    this.loginForm = new FormGroup({
      login: new FormControl('', Validators.required),
      senha: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  submit() {
    this.loginService.login(this.loginForm.value.login, this.loginForm.value.senha).subscribe({
      next: () => {
        this.router.navigate([""]); //home
      },
      error: () => this.toastService.error("Erro ao realizar login! Verifique seu usuário e sua senha e tente novamente.")//substituir por toaster
    })
  }

  navigate() {
    this.router.navigate(["/cadastrar"]);
  }
}
