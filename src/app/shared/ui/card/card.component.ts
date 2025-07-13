import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
})
export class CardComponent {
  @Input() padding: string = 'p-6';
  @Input() shadow: string = 'shadow-md';
  @Input() rounded: string = 'rounded-xl';
}
