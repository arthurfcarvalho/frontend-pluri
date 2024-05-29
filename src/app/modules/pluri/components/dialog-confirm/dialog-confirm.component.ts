import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-dialog-confirm',
  standalone: true,
  imports: [ConfirmDialogModule, ButtonModule, ToastModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './dialog-confirm.component.html',
  styleUrl: './dialog-confirm.component.scss',
})
export class DialogConfirmComponent {
  @Output() confirmResult = new EventEmitter<boolean>();

    constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

    confirm() {
        this.confirmationService.confirm({
            header: 'Voce tem certeza?',
            message: 'Por favor confirme!',
            accept: () => {
                this.confirmResult.emit(true);
            },
            reject: () => {
                this.confirmResult.emit(false);
                this.messageService.add({ severity: 'error', summary: 'Rejeitado', detail: 'Voce rejeitou', life: 3000 });
            }
        });
    }
}