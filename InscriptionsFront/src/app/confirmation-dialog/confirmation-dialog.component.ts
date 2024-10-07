import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css'
})
export class ConfirmationDialogComponent {
  @Input() message!: string;  // El mensaje de confirmación que se mostrará
  @Output() confirmed = new EventEmitter<boolean>();  // Emite el resultado (sí o no)
  showDialog: boolean = true;

  confirm(result: boolean) {
    this.confirmed.emit(result);  // Emitir el resultado de la confirmación
  }
  closeModal() {
    this.showDialog = false;
  }

  openModal() {
    this.showDialog = true;
  }
}
