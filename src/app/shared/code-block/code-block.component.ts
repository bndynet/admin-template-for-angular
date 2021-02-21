import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Input, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/_services/theme.service';

@Component({
  selector: 'el-code-block',
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.scss'],
})
export class CodeBlockComponent implements OnInit {
  @Input() title: string;
  @Input() content: string;
  @Input() language: string;
  @Input() loading: boolean;
  @Input() editable: boolean;
  @Input() hideLineNumbers: boolean;

  private themeName;

  constructor(private theme: ThemeService, private clipboard: Clipboard) {
    this.theme.themeChanged.subscribe((t) => {
      if (this.theme.isDark()) {
        this.themeName = 'material';
      } else {
        this.themeName = 'default';
      }
    });
  }

  ngOnInit(): void {
    if (this.theme.isDark()) {
      this.themeName = 'material';
    }
  }

  copyContent(): void {
    this.clipboard.copy(this.content);
  }

  getOptions(): any {
    let options: any = {
      lineNumbers: !this.hideLineNumbers,
      mode: this.language,
      readOnly: !this.editable,
    };
    if (this.themeName) {
      options = {
        ...options,
        theme: this.themeName,
      };
    }
    return options;
  }
}
