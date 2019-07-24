import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitoresRoutingModule } from './monitores-routing.module';
import { MonitoresListComponent } from './monitores-list/monitores-list.component';


@NgModule({
  declarations: [MonitoresListComponent],
  imports: [
    CommonModule,
    MonitoresRoutingModule,
    SharedModule
  ]
})
export class MonitoresModule { }
