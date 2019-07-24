import { InscritosListComponent } from './inscritos-list/inscritos-list.component';
import { InscritosRoutingModule } from './inscritos-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [InscritosListComponent],
  imports: [
    CommonModule,
    InscritosRoutingModule,
    SharedModule
  ]
})
export class InscritosModule { }
