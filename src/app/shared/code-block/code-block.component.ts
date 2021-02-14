import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Input, OnInit } from '@angular/core';

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

  constructor(private clipboard: Clipboard) {}

  ngOnInit(): void {
    console.debug(this.loading);
  }

  copyContent(): void {
    this.clipboard.copy(this.content);
  }
}
