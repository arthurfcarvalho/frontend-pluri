import { SignupUser } from './../../../../models/SignupUser.model';
import { Component } from '@angular/core';
import { AuthInputComponent } from '../../components/auth-input/auth-input.component';
import { LoginLayoutComponent } from '../../components/login-layout/login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../../services/user.service';
import { ResponseApi } from '../../../../types/response.type';


export interface res{
  responseType: String;
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

  signupForm: FormGroup;
  
  signupData!: SignupUser



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
    })
  }

  submit() {
   

    if(this.signupForm.value.senha !== this.signupForm.value.confirmarSenha) {
      this.toastService.error("As senhas não coincidem. Verifique e tente novamente."); 
      return;
    }
5   

    // this.userService.signup(this.signupForm.value).subscribe({
    //   next: () => this.toastService.success("Cadastro realizado com sucesso!"),
    //   error: () => this.toastService.error("Erro ao realizar cadastro! Verifique os dados inseridos e tente novamente.")
    // })

    this.signupData = {
      nome: this.signupForm.value.nome,
      email: this.signupForm.value.email,
      login: this.signupForm.value.login,
      senha: this.signupForm.value.senha,
      data_nascimento: this.signupForm.value.data_nascimento
    }
    
    this.userService.signup(this.signupData).subscribe({
      next: (response: ResponseApi) => {
          this.toastService.success(response.mensagem);
          this.router.navigate(['/login'])
    },
      error:
      (error: any)=>{
        this.toastService.error("Erro ao realizar cadastro! Verifique os dados inseridos e tente novamente.")
    }
  })
  }

  navigate() {
    this.router.navigate(["/login"]);
  }
}
