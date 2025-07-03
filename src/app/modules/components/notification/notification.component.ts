import {Component, Input, OnInit} from '@angular/core';
import {MessageModel} from "../../home/models/MessageModel";
import {PanelModule} from "primeng/panel";
import {Button} from "primeng/button";
import {BadgeModule} from "primeng/badge";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    CommonModule,
    PanelModule,
    Button,
    BadgeModule
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent implements OnInit {
  showNotifications = false;
  @Input()
  notifications: MessageModel[] = [];
  ngOnInit() {
  }
  get unreadNotifications(): number {
    return this.notifications.filter((n) => !n.lida).length
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications
  }

  marcarComoLida(notification: MessageModel): void {
    notification.lida = true
  }

  verMais(notification: MessageModel): void {
    // Implementar lógica para ver mais detalhes
    // Aqui você pode abrir um modal, navegar para outra página, etc.
  }

  getNotificationIcon(tipo: string): string {
    switch (tipo) {
      case "info":
        return "pi pi-info-circle"
      case "warning":
        return "pi pi-exclamation-triangle"
      case "error":
        return "pi pi-times-circle"
      case "success":
        return "pi pi-check-circle"
      default:
        return "pi pi-bell"
    }
  }

  getNotificationSeverity(tipo: string): string {
    switch (tipo) {
      case "info":
        return "info"
      case "warning":
        return "warn"
      case "error":
        return "danger"
      case "success":
        return "success"
      default:
        return "info"
    }
  }

  formatarDataHora(data: Date): string {
    // const agora = new Date()
    // const diff = agora.getTime() - data.getTime()
    // const minutos = Math.floor(diff / (1000 * 60))
    // const horas = Math.floor(diff / (1000 * 60 * 60))
    // const dias = Math.floor(diff / (1000 * 60 * 60 * 24))
    //
    // if (minutos < 60) {
    //   return `${minutos}m atrás`
    // } else if (horas < 24) {
    //   return `${horas}h atrás`
    // } else {
    //   return `${dias}d atrás`
    // }
    return '';
  }
}
