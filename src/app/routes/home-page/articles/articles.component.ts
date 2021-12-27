import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-account-center-articles',
  templateUrl: './articles.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProAccountCenterArticlesComponent {
  list!: any[];
  page: number = 0;
  total: number = 0;
  size: number = 0;

  constructor(private http: _HttpClient, private cdr: ChangeDetectorRef) {
    this.http.get('/api/list', { count: 8 }).subscribe(res => {
      console.log(res);

      this.page = res.page;
      this.size = res.size;
      this.list = res.content;
      this.total = res.total;
      this.cdr.detectChanges();
    });
  }
}
