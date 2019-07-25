import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmacoesRoutingModule } from './confirmacoes-routing.module';
import { EnviarComponent } from './enviar/enviar.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [EnviarComponent],
  imports: [
    CommonModule,
    ConfirmacoesRoutingModule,
    SharedModule
  ]
})
export class ConfirmacoesModule { }
