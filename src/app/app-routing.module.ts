import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: 'inscritos', loadChildren: './pages/inscritos/inscritos.module#InscritosModule'},
  {path: 'confirmacoes', loadChildren: './pages/confirmacoes/confirmacoes.module#ConfirmacoesModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
