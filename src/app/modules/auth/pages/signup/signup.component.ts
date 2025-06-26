import { SignupUser } from '../../models/SignupUser.model';
import { Component } from '@angular/core';
import { AuthInputComponent } from '../../components/auth-input/auth-input.component';
import { LoginLayoutComponent } from '../../components/login-layout/login-layout.component';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../../services/user.service';
import { ApiResponse } from '../../../../types/api-response.type';
import { HeaderComponent } from "../../../home/components/header/header.component";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {CommonModule, NgIf} from "@angular/common";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    LoginLayoutComponent,
    AuthInputComponent,
    ReactiveFormsModule,
    FaIconComponent,
    NgIf,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})

export class SignupComponent {

  signupForm: FormGroup;
  signupData!: SignupUser
  showPassword: boolean = false;
  passwordEye1: boolean = false;
  passwordEye2: boolean = false;


  constructor(
    private router: Router,
    private userService: UserService,
    private toastService: ToastrService,
  ) {
      this.signupForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      login: new FormControl('', Validators.required),
      senha: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmarSenha: new FormControl('', [Validators.required, Validators.minLength(6)]),
      data_nascimento: new FormControl('', Validators.required)
    }, { validators: this.validaSenhaIguais });
  }
  togglePasswordVisibility(field: number) {
    if(field == 1){
      this.passwordEye1 = !this.passwordEye1;
    }else if(field == 2){
      this.passwordEye2 = !this.passwordEye2;
    }
  }

  validaSenhaIguais(control: AbstractControl): ValidationErrors | null {
    const group = control as FormGroup;
    const senha = group.get('senha')?.value;
    const confirmarSenha = group.get('confirmarSenha')?.value;

    return senha === confirmarSenha ? null : { senhasDiferentes: true };
  }

  submit() {

    if(this.signupForm.value.senha !== this.signupForm.value.confirmarSenha) {
      this.toastService.error("As senhas não coincidem. Verifique e tente novamente.");
      return;
    }

    this.signupData = {
      nome: this.signupForm.value.nome,
      email: this.signupForm.value.email,
      login: this.signupForm.value.login,
      senha: this.signupForm.value.senha,
      data_nascimento: this.signupForm.value.data_nascimento
    }

    this.userService.signup(this.signupData).subscribe({
      next: (response: ApiResponse) => {
          this.toastService.success(response.mensagem);
          this.router.navigate(['/login'])
      },
      error: (error: any) => {
        this.toastService.error("Erro ao realizar cadastro! Verifique os dados inseridos e tente novamente.")
      }
    })
  }

  navigate() {
    this.router.navigate(["/login"]);
  }

  protected readonly faEyeSlash = faEyeSlash;
  protected readonly faEye = faEye;
}
