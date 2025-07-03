import {SignupUser} from "../../models/SignupUser.model";
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../../../services/user.service";
import {ToastrService} from "ngx-toastr";
import {ApiResponse} from "../../../../types/api-response.type";
import {LoginService} from "../../../../services/login.service";
declare const google: any;
@Component({
  selector: 'app-login-google',
  standalone: true,
  imports: [],
  templateUrl: './login-google.component.html',
  styleUrl: './login-google.component.scss'
})
export class LoginGoogleComponent implements OnInit {
  signupData!: SignupUser;

  constructor(
    private router: Router,
    private userService: UserService,
    private loginService: LoginService,
    private toastService: ToastrService,
  ) {
  }

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '1033319843386-jtmj1srffr4bdkf129thnm1u356tn1k3.apps.googleusercontent.com',
      callback: (resp: any) => this.handleLogin(resp),
      auto_select: false,
    });

    google.accounts.id.renderButton(document.getElementById("google-btn"),
      {
        display: "inline-block",
        type: "standard",
        shape: "rectangular",
        theme: "standard",
        size: "large",
        locale: "pt-BR",
        background: "white",
      })
  }

  private decodeToken(token: string){
    return JSON.parse(atob(token.split('.')[1]));
  }

  handleLogin(response: any){
    if (response){
      //decode the token
      const informationgoogle = this.decodeToken(response.credential);
      console.log("Information google", informationgoogle);
      this.signupData = {
        nome: informationgoogle["given_name"] + " " + informationgoogle["family_name"],
        email: informationgoogle["email"],
        login: informationgoogle["sub"],
        senha: informationgoogle["sub"],
        data_nascimento: new Date(),
        isGoogle: true
      }
      console.log(this.signupData)
      this.loginService.login(this.signupData.login, this.signupData.senha).subscribe({
        next: () => {
          this.toastService.success(response.mensagem);
          console.log("login")
          this.router.navigate(["/home"]);

        },
        error: () => {
          this.userService.signup(this.signupData).subscribe({
            next: (response: ApiResponse) => {
              console.log("Error")
              this.toastService.success(response.mensagem);
              //this.router.navigate(['/home']);
              this.loginService.login(this.signupData.login, this.signupData.senha).subscribe({
                next: () => {
                  console.log("Login google")
                  this.router.navigate(["/home"]);
                }
              })
            },
            error: (error: any) => {
              this.toastService.error("Erro ao realizar Login com o GOOGLE! Verifique os dados inseridos e tente novamente.")
            }
          })
        }
      });
    }
  }
}
