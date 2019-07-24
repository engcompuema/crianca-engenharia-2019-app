import { InscritosService } from '../shared/inscritos-service.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/primeng';

@Component({
  selector: 'app-inscritos-list',
  templateUrl: './inscritos-list.component.html',
  styleUrls: ['./inscritos-list.component.css']
})
export class InscritosListComponent implements OnInit {

  page = 0;
  count = 10;
  totalRecords: number;
  cols: any[];
  rows: number;
  pageIndex: number;

  inscritos = new Array();
  selectedFile: File;

  constructor(private inscritosService: InscritosService,
              private messageService: MessageService) { }

  ngOnInit() {

  }

  loadVoluntariosLazy(event) {
    this.pageIndex = event.first / event.rows;
    this.getAll(this.pageIndex, this.count);
  }

  getAll(pageIndex, count) {
    this.inscritosService.findAll(pageIndex, count).subscribe(
      pages => {
        this.inscritos = pages.content;
        this.totalRecords = pages.totalElements;
      },
      err => console.log(err));
  }

  onBasicUpload(event) {
    this.selectedFile = event.files[0];
    this.inscritosService.importData(this.selectedFile).subscribe(
      res => {
        this.getAll(0,10);
        this.messageService.add(
          { severity: 'success', summary: 'Importação de Inscritos', detail: 'Importação Realizada Com Sucesso!' }
        );
      },
      err => console.log(err));
  }
}
