import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { httpStatusMap } from '../app-types';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  public code: number;
  public title: string;
  public description: string;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      if (params.get('code')) {
        const statusEntity = httpStatusMap[params.get('code')];
        if (statusEntity) {
          this.code = +params.get('code');
          this.title = statusEntity.title;
          this.description = statusEntity.description;
        }
      } else {
          this.title = 'Something gone wrong',
          this.description = '';
      }

      if (params.get('title')) {
        this.title = params.get('title');
      }

      if (params.get('des')) {
        this.description = params.get('des');
      }
    });
  }

}
