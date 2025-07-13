import { Component } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '../avatar/avatar.component';
import { LangSwitcherComponent } from '../../lang-switcher/lang-switcher.component';
import { ButtonComponent } from '../button/button.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowLeftStartOnRectangle } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'ui-topbar',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    AvatarComponent,
    LangSwitcherComponent,
    ButtonComponent,
    NgIcon,
  ],
  templateUrl: './topbar.component.html',
  viewProviders: [provideIcons({ heroArrowLeftStartOnRectangle })],
})
export class TopbarComponent {
  constructor(private readonly auth: AuthService) {}

  onLogout() {
    this.auth.logout();
  }
}
