import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { httpStatusMap } from '../../app-types';

@Component({
  selector: 'el-page-error',
  templateUrl: './page-error.component.html',
  styleUrls: ['./page-error.component.scss'],
})
export class PageErrorComponent implements OnInit {
  public code: number | null;
  public title: string;
  public description: string;

  constructor(private route: ActivatedRoute) {}

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
        this.code = null;
        (this.title = 'Something gone wrong'), (this.description = '');
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
