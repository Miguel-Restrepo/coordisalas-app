import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomListComponent } from './modules/room/components/room-list/room-list.component';
import { LoginComponent } from './modules/security/login/login.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { TimeBussyComponent } from './modules/calendar/time-bussy/time-bussy.component';

const routes: Routes = [
  {
    path: 'inicio-sesion',
    component: LoginComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'salas', 
    component: RoomListComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'inicio', 
    component: TimeBussyComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: '**',
    redirectTo: '/inicio-sesion', 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
