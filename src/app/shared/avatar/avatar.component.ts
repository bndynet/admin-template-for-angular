import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'el-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
  @Input() url: string;
  @Input() name: string;
  @Input() size: 'small' | 'large';

  constructor() {}

  ngOnInit(): void {}
}
