import { Component } from '@angular/core';
import { LoginLayoutComponent } from '../../components/login-layout/login-layout.component';
import { AuthInputComponent } from '../../components/auth-input/auth-input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../../services/user.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    LoginLayoutComponent,
    AuthInputComponent,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  
  loginForm!: FormGroup;
  showPassword: boolean = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ) {
    this.loginForm = new FormGroup({
      login: new FormControl('', Validators.required),
      senha: new FormControl('', [Validators.required, Validators.minLength(4)])
    })
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  submit() {
    this.loginService.login(this.loginForm.value.login, this.loginForm.value.senha).subscribe({
      next: () => {
        this.router.navigate(["/home"]);
      },
      error: () => this.toastService.error("Erro ao realizar login! Verifique seu usuário e sua senha e tente novamente.")
    })
  }

  navigate() {
    this.router.navigate(["/cadastrar"]);
  }
}
