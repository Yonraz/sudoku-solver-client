import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cell',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cell.component.html',
  styleUrl: './cell.component.css',
})
export class CellComponent {
  editing: boolean = false;
  @Input() value: number = 0;
  editedValue: number | null = null;
  @Output() valueChange = new EventEmitter<number>();

  onEdit(): void {
    this.editing = true;
  }
  onUpdate(): void {
    if (typeof this.editedValue === 'number') {
      if (this.editedValue <= 9 && this.editedValue >= 0) {
        this.valueChange.emit(this.editedValue);
      }
    } else {
      this.editedValue = this.value;
    }
    this.editing = false;
  }
  onBlur() {
    this.editing = false;
  }
}
