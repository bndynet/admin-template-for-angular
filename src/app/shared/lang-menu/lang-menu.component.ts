import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Langs } from 'src/app/app-types';
import { I18nService } from 'src/app/_services';

@Component({
  selector: 'el-lang-menu',
  templateUrl: './lang-menu.component.html',
  styleUrls: ['./lang-menu.component.scss'],
})
export class LangMenuComponent implements OnInit {
  @Input() viewTemplate: TemplateRef<any>;

  currentLang: { label: string; value: string; icon: string };
  langs = Langs;

  constructor(private i18n: I18nService) {}

  ngOnInit(): void {
    this.currentLang = Langs.find(
      (lang) => lang.value === this.i18n.getCurrentLanguage()
    );
  }

  changeLang(lang: { label: string; value: string; icon: string }) {
    this.currentLang = lang;
    this.i18n.changeLanguage(lang.value);
  }
}
