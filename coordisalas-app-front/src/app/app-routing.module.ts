import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomListComponent } from './modules/room/components/room-list/room-list.component';
import { LoginComponent } from './modules/security/login/login.component';

const routes: Routes = [
  {
    path: 'inicio-sesion',
    component: LoginComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/inicio',
  },
  { path: 'login', redirectTo: '/i' },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/inicio',
    //  canActivate: [AuthGuard]
  },
  { path: 'room', component: RoomListComponent },
  {
    path: '**',
    redirectTo: '/pagina-no-encontrada',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
