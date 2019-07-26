import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: 'inscritos', loadChildren: './pages/inscritos/inscritos.module#InscritosModule'},
  {path: 'confirmacoes', loadChildren: './pages/confirmacoes/confirmacoes.module#ConfirmacoesModule'},
  {path: 'frequencia', loadChildren: './pages/frequencia/frequencia.module#FrequenciaModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
