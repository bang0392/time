import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { WarningComponent } from './component/warning/warning.component';

const routes: Routes = [
  { path: '', component: LoginComponent },

  {
    path: 'dashboard',
    loadChildren: () =>
      import('./component/dashboard/dashboard-routing.module').then(
        (m) => m.DashboardRoutingModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./component/register/register-routing.module').then(
        (m) => m.RegisterRoutingModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./component/user/profile/profile-routing-module').then(
        (m) => m.ProfileRoutingModule
      ),
  },
  {
    path: 'setting',
    loadChildren: () =>
      import('./component/user/user-routing.module').then(
        (m) => m.UserRoutingModule
      ),
  },
  {
    path: 'notification',
    loadChildren: () =>
      import('./component/notification/notification-routing').then(
        (m) => m.NotificationRoutingModule
      ),
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})

// const routes: Routes = [
//   { path: '', component: LoginComponent },
//   { path: 'notification', component: WarningComponent },
//   { path: 'dashboard', component: DashboardComponent },
//   { path: 'register', component: RegisterComponent },
//   { path: 'user', component: UserComponent },
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
export class AppRoutingModule { }
