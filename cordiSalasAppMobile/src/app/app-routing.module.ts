import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/security/login/login.component';
import { AdminGuard, AuthenticationGuard } from './guards';
import { RoomListComponent } from './modules/room/components/room-list/room-list.component';
import { CalendarComponent } from './modules/calendar/calendar/calendar.component';
import { ReportsListComponent } from './modules/reports/components/reports-list/reports-list.component';
import { RequestRoomListComponent } from './modules/request-room/components/request-room-list/request-room-list.component';
import { UserListComponent } from './modules/user/components/user-list/user-list.component';

const routes: Routes = [
  {
    path: 'inicio-sesion',
    component: LoginComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'salas',
    component: RoomListComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'calendario',
    component: CalendarComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'usuarios',
    component: UserListComponent,
    canActivate: [AuthenticationGuard, AdminGuard],
  },
  {
    path: 'reservas',
    component: RequestRoomListComponent,
    canActivate: [AuthenticationGuard, AdminGuard],
  },
  {
    path: 'reports',
    component: ReportsListComponent,
    canActivate: [AuthenticationGuard, AdminGuard],
  },
  {
    path: 'inicio',
    component: CalendarComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: '**',
    redirectTo: '/inicio-sesion',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
