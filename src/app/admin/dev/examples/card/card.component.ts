import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-examples-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  public links = {
    'Link #1': 'link-url',
    'Link #2': 'link-url',
  };

  constructor() {}

  ngOnInit(): void {}
}
