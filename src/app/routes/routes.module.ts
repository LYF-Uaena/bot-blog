import { NgModule, Type } from '@angular/core';
import { AvatarListModule } from '@delon/abc/avatar-list';
import { SharedModule } from '@shared';

// dashboard pages
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
import { RouteRoutingModule } from './routes-routing.module';

const COMPONENTS: Array<Type<void>> = [
  HomePageComponent,
  ProAccountCenterArticlesComponent,
  ProAccountCenterApplicationsComponent,
  ProAccountCenterProjectsComponent,
  // passport pages
  UserLoginComponent,
  UserRegisterComponent,
  UserRegisterResultComponent,
  // single pages
  CallbackComponent,
  UserLockComponent
];

@NgModule({
  imports: [SharedModule, RouteRoutingModule, AvatarListModule],
  declarations: COMPONENTS
})
export class RoutesModule {}
