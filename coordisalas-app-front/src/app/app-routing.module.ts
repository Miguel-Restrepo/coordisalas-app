import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'room', component: RoomListComponent }
  {
    path: 'inicio-sesion',
    component: LoginComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/inicio',
  },
  { path: 'login', redirectTo: '/i', },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/inicio',
  //  canActivate: [AuthGuard]
  },
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
