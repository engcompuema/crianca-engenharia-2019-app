import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {FileUploadModule} from 'primeng/fileupload';

import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { DropdownModule } from 'primeng/primeng';

@NgModule({
  declarations: [BreadCrumbComponent],
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    FileUploadModule,
    DropdownModule,
    FormsModule,
  ],
  exports: [BreadCrumbComponent,
    TableModule,
    FileUploadModule,
    DropdownModule,
    FormsModule
  ]
})
export class SharedModule { }
