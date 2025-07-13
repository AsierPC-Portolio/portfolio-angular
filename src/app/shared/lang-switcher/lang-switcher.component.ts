import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lang-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lang-switcher.component.html',
})
export class LangSwitcherComponent {
  private readonly translate = inject(TranslateService);
  langs = [
    { code: 'en', label: 'English', flag: 'gb' },
    { code: 'es', label: 'Español', flag: 'es' },
  ];
  selectedLang = signal(
    this.translate.currentLang || this.translate.getDefaultLang() || 'en',
  );
  menuOpen = signal(false);

  get currentLangData() {
    return this.langs.find((l) => l.code === this.selectedLang());
  }

  setLang(lang: string) {
    this.translate.use(lang);
    this.selectedLang.set(lang);
    this.menuOpen.set(false);
  }

  toggleMenu() {
    this.menuOpen.set(!this.menuOpen());
  }

  closeMenu() {
    this.menuOpen.set(false);
  }
}
