import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VoluntariosListComponent } from './voluntarios-list/voluntarios-list.component';


const routes: Routes = [
  {path: '', component: VoluntariosListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoluntariosRoutingModule { }
