import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.scss'],
})
export class GetStartedComponent implements OnInit {
  readMe: string;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get('/assets/README.md', { responseType: 'text' })
      .subscribe((r) => {
        const converter = new showdown.Converter();
        this.readMe = converter.makeHtml(r);
      });
  }
}
