import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrequenciaRoutingModule } from './frequencia-routing.module';
import { FrequenciaComponent } from './frequencia/frequencia.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [FrequenciaComponent],
  imports: [
    CommonModule,
    FrequenciaRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FrequenciaModule { }
