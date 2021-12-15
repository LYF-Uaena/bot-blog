import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimpleGuard } from '@delon/auth';
import { environment } from '@env/environment';

// layout
import { LayoutBasicComponent } from '../layout/basic/basic.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
import { ProAccountCenterApplicationsComponent } from './home-page/applications/applications.component';
import { ProAccountCenterArticlesComponent } from './home-page/articles/articles.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProAccountCenterProjectsComponent } from './home-page/projects/projects.component';
// single pages
import { CallbackComponent } from './passport/callback.component';
import { UserLockComponent } from './passport/lock/lock.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
import { UserRegisterComponent } from './passport/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutBasicComponent,
    // canActivate: [SimpleGuard],
    children: [
      { path: '', redirectTo: 'home-page', pathMatch: 'full' },
      {
        path: 'home-page',
        component: HomePageComponent,
        data: { title: '首页', titleI18n: 'dashboard' },
        children: [
          { path: '', redirectTo: 'articles', pathMatch: 'full' },
          {
            path: 'articles',
            component: ProAccountCenterArticlesComponent,
            data: { titleI18n: 'pro-account-center' }
          },
          {
            path: 'projects',
            component: ProAccountCenterProjectsComponent,
            data: { titleI18n: 'pro-account-center' }
          },
          {
            path: 'applications',
            component: ProAccountCenterApplicationsComponent,
            data: { titleI18n: 'pro-account-center' }
          }
        ]
      },
      { path: 'exception', loadChildren: () => import('./exception/exception.module').then(m => m.ExceptionModule) }
      // 业务子模块
      // { path: 'widgets', loadChildren: () => import('./widgets/widgets.module').then(m => m.WidgetsModule) },
    ]
  },
  // 空白布局
  // {
  //   path: 'blank',
  //   component: LayoutBlankComponent,
  //   children: []
  // },
  // passport
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      { path: 'login', component: UserLoginComponent, data: { title: '登录', titleI18n: 'pro-login' } },
      { path: 'register', component: UserRegisterComponent, data: { title: '注册', titleI18n: 'pro-register' } },
      { path: 'register-result', component: UserRegisterResultComponent, data: { title: '注册结果', titleI18n: 'pro-register-result' } },
      { path: 'lock', component: UserLockComponent, data: { title: '锁屏', titleI18n: 'lock' } }
    ]
  },
  // 单页不包裹Layout
  { path: 'passport/callback/:type', component: CallbackComponent },
  { path: '**', redirectTo: 'exception/404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
      // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
      // Pls refer to https://ng-alain.com/components/reuse-tab
      scrollPositionRestoration: 'top'
    })
  ],
  exports: [RouterModule]
})
export class RouteRoutingModule {}
