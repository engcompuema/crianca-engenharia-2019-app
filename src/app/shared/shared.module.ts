import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {FileUploadModule} from 'primeng/fileupload';

import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';

@NgModule({
  declarations: [BreadCrumbComponent],
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    FileUploadModule
  ],
  exports: [BreadCrumbComponent,
    TableModule,
    FileUploadModule
  ]
})
export class SharedModule { }
