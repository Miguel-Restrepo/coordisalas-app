import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards';
import { RoomListComponent } from './modules/room/components/room-list/room-list.component';
import { LoginComponent } from './modules/security/login/login.component';

const routes: Routes = [
  {
    path: 'inicio-sesion',
    component: LoginComponent,
  },
  {
    path: 'room', 
    component: RoomListComponent,
   // canActivate: [AuthGuard]
  },
  {
    path: 'inicio', 
    component: RoomListComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/inicio',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
