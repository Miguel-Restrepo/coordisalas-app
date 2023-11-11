import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomListComponent } from './modules/room/components/room-list/room-list.component';
import { LoginComponent } from './modules/security/login/login.component';
import { AuthenticationGuard } from './guards/authentication.guard';

const routes: Routes = [
  {
    path: 'inicio-sesion',
    component: LoginComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'room', 
    component: RoomListComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'inicio', 
    component: RoomListComponent,
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
