import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'el-icon-card',
  templateUrl: './icon-card.component.html',
  styleUrls: ['./icon-card.component.scss'],
})
export class IconCardComponent implements OnInit {
  @Input() color: string;
  @Input() icon: string;
  @Input() value: string;
  @Input() label: string;
  @Input() links: { [key: string]: string };

  constructor() {}

  ngOnInit(): void {}
}
