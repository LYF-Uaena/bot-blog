import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { Subscription, zip } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnDestroy, OnInit {
  constructor(private router: Router, private http: _HttpClient, private cdr: ChangeDetectorRef) {}
  private router$!: Subscription;
  @ViewChild('tagInput', { static: false }) private tagInput!: ElementRef<HTMLInputElement>;
  user: any;
  notice: any;
  tabs = [
    {
      key: 'articles',
      tab: '文章 (8)'
    },
    {
      key: 'applications',
      tab: '应用 (8)'
    },
    {
      key: 'projects',
      tab: '项目 (8)'
    }
  ];
  pos = 0;
  taging = false;
  tagValue = '';

  // private setActive(): void {
  //   const key = this.router.url.substr(this.router.url.lastIndexOf('/') + 1);
  //   console.log(key);

  //   const idx = this.tabs.findIndex(w => w.key === key);
  //   if (idx !== -1) {
  //     this.pos = idx;
  //   }
  // }

  ngOnInit(): void {
    zip(this.http.get('/user/current'), this.http.get('/api/notice')).subscribe(([user, notice]) => {
      this.user = user;
      this.notice = notice;
      this.cdr.detectChanges();
    });
    this.router$ = this.router.events.pipe(filter(e => e instanceof ActivationEnd)).subscribe(() => this.to());
    this.to();
  }

  to(): void {
    this.router.navigateByUrl(`/home-page/articles`);
  }

  tagShowIpt(): void {
    this.taging = true;
    this.cdr.detectChanges();
    this.tagInput.nativeElement.focus();
  }

  tagBlur(): void {
    const { user, cdr, tagValue } = this;
    if (tagValue && user.tags.filter((tag: { label: string }) => tag.label === tagValue).length === 0) {
      user.tags.push({ label: tagValue });
    }
    this.tagValue = '';
    this.taging = false;
    cdr.detectChanges();
  }

  tagEnter(e: KeyboardEvent): void {
    if (e.keyCode === 13) {
      this.tagBlur();
    }
  }

  ngOnDestroy(): void {
    this.router$.unsubscribe();
  }
}
