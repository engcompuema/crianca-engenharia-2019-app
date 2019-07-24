import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: 'voluntarios', loadChildren: './pages/voluntarios/voluntarios.module#VoluntariosModule'},
  {path: 'monitores', loadChildren: './pages/monitores/monitores.module#MonitoresModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
