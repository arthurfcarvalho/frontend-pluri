import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { PanelModule } from 'primeng/panel';
import { MessageModel } from '../../../models/MessageModel';

@Component({
  selector: 'app-notification-box',
  standalone: true,
  imports: [
    CommonModule,
    BadgeModule,
    PanelModule
  ],
  templateUrl: './notification-box.component.html',
  styleUrl: './notification-box.component.scss'
})
export class NotificationBoxComponent {


  @Input() notifications: MessageModel[] = [];

  showNotifications = false;

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

}
