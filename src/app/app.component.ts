import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpClient} from "@angular/common/http";
import {TranslateConfigModule} from "./services/translate.service";
import {HeaderComponent} from "./modules/home/components/header/header.component";
import {NgIf} from "@angular/common";
import {LoginLayoutComponent} from "./modules/auth/components/login-layout/login-layout.component";
import {LoginComponent} from "./modules/auth/pages/login/login.component";


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TranslateConfigModule,
    HeaderComponent,
    NgIf,
    LoginLayoutComponent,
    LoginComponent,
  ],
  template: `
    <app-login *ngIf="isRouterLogin()"></app-login>
    <app-header *ngIf="!isRouterLogin()"></app-header>
    <router-outlet *ngIf="!isRouterLogin()"></router-outlet>
  `})
export class AppComponent {
  constructor(private router: Router, private translate: TranslateService) {
    this.translate.setDefaultLang('pt');
  }
  isRouterLogin(): boolean {
    return this.router.url === '/login';
  }
}
