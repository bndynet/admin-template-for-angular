import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-code-block',
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.scss'],
})
export class CodeBlockComponent implements OnInit {
  @Input() title: string;
  @Input() content: string;
  @Input() language: string;
  @Input() editable: boolean;
  @Input() hideLineNumbers: boolean;

  constructor(private clipboard: Clipboard) {}

  ngOnInit(): void {}

  copyContent(): void {
    this.clipboard.copy(this.content);
  }
}
