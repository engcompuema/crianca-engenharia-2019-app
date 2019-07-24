import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoluntariosRoutingModule } from './voluntarios-routing.module';
import { VoluntariosListComponent } from './voluntarios-list/voluntarios-list.component';


@NgModule({
  declarations: [VoluntariosListComponent],
  imports: [
    CommonModule,
    VoluntariosRoutingModule,
    SharedModule
  ]
})
export class VoluntariosModule { }
