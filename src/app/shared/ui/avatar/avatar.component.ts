import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
})
export class AvatarComponent {
  @Input() src = '';
  @Input() alt = '';
  @Input() size: number = 40;
  @Input() rounded: 'full' | 'md' | 'none' = 'full';
}
