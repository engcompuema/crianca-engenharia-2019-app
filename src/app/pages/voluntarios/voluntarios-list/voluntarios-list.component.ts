import { VoluntariosService } from './../shared/voluntarios-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-voluntarios-list',
  templateUrl: './voluntarios-list.component.html',
  styleUrls: ['./voluntarios-list.component.css']
})
export class VoluntariosListComponent implements OnInit {

  page = 0;
  count = 5;
  totalRecords: number;
  cols: any[];
  rows: number;
  pageIndex: number;
  voluntarios = new Array();
  selectedFile: File;

  constructor(private voluntarioService: VoluntariosService) { }

  ngOnInit() {

  }

  loadVoluntariosLazy(event) {
    this.pageIndex = event.first / event.rows;
    this.getAll(this.pageIndex, this.count);
  }

  getAll(pageIndex, count) {
    this.voluntarioService.findAll(pageIndex, count).subscribe(
      pages => {
        this.voluntarios = pages.content;
        this.totalRecords = pages.totalElements;
      },
      err => console.log(err));
  }

  onBasicUpload(event) {
    this.selectedFile = event.files[0];
    this.voluntarioService.importDataVoluntarios(this.selectedFile).subscribe(
      res => {
        this.getAll(0, 5);
      },
      err => console.log(err));
  }
}
