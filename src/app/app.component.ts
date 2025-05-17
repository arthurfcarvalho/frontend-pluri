import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpClient} from "@angular/common/http";
import {TranslateConfigModule} from "./services/translate.service";
import {HeaderComponent} from "./modules/home/components/header/header.component";


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
  ],
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('pt');
  }
}
